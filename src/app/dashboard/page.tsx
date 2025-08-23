import { redirect } from "next/navigation";
import { onAuthenticateUser } from "../actions/user";

export default async function DashboardPage() {
    const auth = await onAuthenticateUser();
    
    if (auth.status === 200 || auth.status === 201) {
        if (auth.user?.workspace && auth.user.workspace.length > 0) {
            // Always redirect to the first workspace
            return redirect(`/dashboard/${auth.user.workspace[0].id}`);
        } else {
            return redirect("/no-workspace");
        }
    }

    // If not authenticated, redirect to sign-in without any redirect_url
    return redirect('/auth/sign-in');
}