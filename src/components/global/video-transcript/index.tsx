import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

type Props = {
    transcript: string
}

const VideoTranscript = ({ transcript }: Props) => {
    return (
        <TabsContent className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10' value='Transcript'>
            dfasf
            <p className='text-white'>{transcript}</p>
        </TabsContent>
    )
}

export default VideoTranscript