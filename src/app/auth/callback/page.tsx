import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

type Props = {}


export default async function AuthCallbackPage(props: Props) {
    const auth = await onAuthenticateUser();
    console.log("auth", auth);

    if (auth.status === 200 || auth.status === 201) {
        // Redirect to the dashboard with the workspace ID
        if (auth.user?.workspace && auth.user.workspace.length > 0) {
            return redirect(`/dashboard/${auth.user.workspace[0].id}`);
        } else {
            // Handle the case where the user doesn't have a workspace
            console.warn("User is authenticated but has no workspace.");
            return redirect("/no-workspace"); // Redirect to a "no workspace" page
        }
    }

    if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
        return redirect('/auth/sign-in');
    }
}