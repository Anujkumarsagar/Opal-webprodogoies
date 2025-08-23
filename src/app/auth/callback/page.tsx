import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
    const auth = await onAuthenticateUser();
    console.log("auth", auth);

    if (auth.status === 200 || auth.status === 201) {
        if (auth.user?.workspace && auth.user.workspace.length > 0) {
            // Force redirect to dashboard, ignore any redirect_url
            return redirect(`/dashboard/${auth.user.workspace[0].id}`);
        } else {
            return redirect("/no-workspace");
        }
    }

    // If authentication fails, redirect to sign-in
    return redirect('/auth/sign-in');
}