import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'

type Props = {
    triggers: string[]
    children: React.ReactNode
    defaultValue: string
}

const TabMenu = ({children, triggers, defaultValue}: Props) => {
  return (
    <Tabs
    defaultValue={defaultValue}
    className='w-full'>
        <TabsList className='flex justify-start bg-transparent' >

            {triggers.map((trigger)=> (
                <TabsTrigger value={trigger} className='capitalize text-base data-[state=active]:bg-[#1D1D1D]' key={trigger} >
                </TabsTrigger>
            ))}
        </TabsList>
    </Tabs>
  )
}

export default TabMenu