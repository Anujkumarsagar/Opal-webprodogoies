import { redirect } from "next/navigation";
import { onAuthenticateUser } from "../actions/user";

type Props = {
  searchParams: {
    redirect_url?: string;
  };
};

export default async function DashboardPage(props: Props) {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    if (auth.user?.workspace && auth.user.workspace.length > 0) {
      // Always redirect to the first workspace
      return redirect(`/dashboard/${auth.user.workspace[0].id}`);
    }
  }
  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect("/auth/sign-in");
  }
}
