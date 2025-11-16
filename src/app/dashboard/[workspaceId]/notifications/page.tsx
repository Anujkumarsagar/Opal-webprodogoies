"use client"

import { getNotification } from '@/app/actions/user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useQueryData } from '@/hooks/userQueryData'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Loader from '../../../../components/global/loader'

const Notifications = () => {
    const { data: notifications, isPending } = useQueryData(
        ['notifications'],
        getNotification,
    )

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader  state={isPending} />
            </div>
        )
    }

    if (notifications?.status !== 200) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className='text-red-500 text-center'>Something went wrong</div>
            </div>
        )
    }

    const notificationList = notifications.data?.notifications;

    if (!notificationList || notificationList.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">You have no notifications.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-4">
            {notificationList.map((notification) => (
                <div key={notification.id} className='flex items-center gap-4 rounded-lg p-3 border-2'>
                    <Avatar><AvatarFallback><UserButton /></AvatarFallback></Avatar>
                    <p>{notification.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Notifications