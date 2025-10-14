"use client"

import { enableFirstView, getFirstView } from '@/app/actions/user'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {}

const SettingsPage = (props: Props) => {

    const [firstView, setFirstView] = useState<undefined | boolean>(undefined)


    useEffect(() => {
        // setFirstView(true)
        if (firstView != undefined) return
        const fetchData = async () => {
            const response = await getFirstView()
            if (response.status === 200) setFirstView(response?.data)

        }

        fetchData();
    }, [firstView])

    const switchState = async (checked: boolean) => {
        const view = await enableFirstView(checked)
        if(view){
            toast(view.status === 200 ? "Success" : "Failed", {
                description: view.data
            })
        }
     }

    return <div>
        <h2 className='text-2xl font-bold text-[#a22fe0]'>Video Sharing Settings</h2>
        <p className='text-muted-foreground text-sm'>Enabling this feature will send you notifications when someone watched you rvideo for the first timem . this feature can help during client outreach</p>
        <Label className='flex items-center gap-2 mt-4 text-md'>
            Enable First View
            <Switch
                onCheckedChange={switchState}
                checked={firstView}
                disabled={firstView === undefined}
                onClick={() => setFirstView(!firstView)}
            />
        </Label>
    </div>
}

export default SettingsPage