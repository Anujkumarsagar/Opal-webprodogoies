
import { redirect } from "next/navigation";


const Props = {}

export default async function DashboardPage(props: {}) {

    const auth = await onAuthenticateUser();
    console.log("auth", auth)

    if(auth.status === 200 || auth.status === 201){
        return redirect(`/dashboard/${auth.user?.firstname} ${auth.user?.lastname} `)
    }

    if(auth.status === 400 || auth.status === 500 || auth.status === 404){
        return redirect('/auth/sign-in')
    }

}