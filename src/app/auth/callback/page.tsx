import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";


type Props = {
  searchParams: {
    redirect_url?: string;
  };
};

export default async function CallbackPage(props: Props) {
  const auth = await onAuthenticateUser();

  // If auth failed, go back to sign-in
  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect("/auth/sign-in");
  }

  if (auth.status === 200 || auth.status === 201) {
    const urlParam = props.searchParams?.redirect_url;

    // Allow only dashboard internal redirects to avoid open redirect
    if (urlParam) {
      try {
        const dest = new URL(urlParam, "http://localhost");
        const isDashboard = dest.pathname.startsWith("/dashboard/");
        if (isDashboard) {
          return redirect(dest.pathname + dest.search + dest.hash);
        }
      } catch {}
    }

    // Fallback: route by first workspace
    if (auth.user?.workspace && auth.user.workspace.length > 0) {
      return redirect(`/dashboard/${auth.user.workspace[0].id}`);
    }

    // No workspace case
    return redirect("/no-workspace");
  }
}
