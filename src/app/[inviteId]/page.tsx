import { acceptInvite } from '@/app/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        inviteId: string
    }
}

const Invite = async ({ params: { inviteId } }: Props) => {
    const invite = await acceptInvite(inviteId)
    console.log(invite);

    if (invite.status === 404) return redirect('/auth/sign-in')

    if (invite?.status === 401) {
        return (
            <div className='h-screen flex flex-col items-center justify-center gap-y-5'>
                <h2 className='text-6xl font-bold text-center'>Invalid Invite</h2>
                <p className='text-center text-sm text-[#a4a4a4]'>You are not invited to this workspace</p>
            </div>
        )
    }

    if (invite?.status === 200) return redirect('/auth/callback ')
}

export default Invite