import { redirect } from "next/navigation";
import { onAuthenticateUser } from "../actions/user";

export default async function DashboardPage() {
    const auth = await onAuthenticateUser();
    console.log("auth", auth);

    if (auth.status === 200 || auth.status === 201) {
        // Check if user has a workspace before redirecting
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