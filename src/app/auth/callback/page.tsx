import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { redirect_url?: string };
};

export default async function CallbackPage({ searchParams }: Props) {
  const auth = await onAuthenticateUser();

  if ([400, 403, 404, 500].includes(auth.status)) {
    return redirect("/auth/sign-in");
  }

  if ([200, 201].includes(auth.status)) {
    const urlParam = await searchParams?.redirect_url;

    // Redirect to requested dashboard if safe
    if (urlParam?.startsWith("/dashboard/")) {
      return redirect(urlParam);
    }

    // Otherwise, fallback to first workspace
    if (auth.user?.workspace?.length > 0) {
      return redirect(`/dashboard/${auth.user.workspace[0].id}`);
    }

    return redirect("/no-workspace");
  }
}
