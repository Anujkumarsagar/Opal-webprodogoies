import { getNotification } from '@/app/actions/user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useQueryData } from '@/hooks/userQueryData'
import { User } from '@clerk/nextjs/server'
import React from 'react'

type Props = {}

const Notifications = async (props: Props) => {
    const { data: notifications } = useQueryData(
        ['notifications'],
        getNotification
    )

    const { data: notification, status } = notifications as {
        status: number
        data: {
            notifications: {
                id: string
                userId: string | null
                content: string
            }[]
        }
    }

    if(status != 200){
        return <div className='text-red-500 text-center flex justify-self-center items-center h-full w-full'>Something went wrong</div>
    }
    return <div>
        {
            notification.notifications.map((notification) => (
                <div key={notification.id} className='flex items-center gap-4 rounded-lg p-3 border-2 '>
                    <Avatar>
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                    <p>{notification.content}</p>
                </div>
            ))
        }
    </div>
}

export default Notifications