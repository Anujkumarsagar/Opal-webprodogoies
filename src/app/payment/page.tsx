import React from 'react'
import { completeSubscription } from '../actions/user'
import { redirect } from 'next/navigation'

type Props = {
    searchParams: {
        cancel?: string
        session_id?: string
    }
}

const page = async ({ searchParams: { cancel, session_id } }: Props) => {

    if (session_id) {
        const customer = await completeSubscription(session_id)
        console.log(customer)
        if(customer.status === 200){
            return redirect('/auth/callback')
        }
    }

    if( cancel ){
        return (
            <div className='text-sm '>
                 OOPS!! Something went wrong
            </div>
        )
    }

    return (
        <div>page</div>
    )
}

export default page