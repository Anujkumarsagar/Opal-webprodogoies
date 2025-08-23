"use client"


import { getAllUserVideos } from '@/app/actions/workspace'
import { useQueryData } from '@/hooks/userQueryData'
import { cn } from '@/lib/utils'
import { VideoProps } from '@/types/index.type'
import { Video } from 'lucide-react'
import React from 'react'
import VideoCard from './video-card'
import { P } from 'node_modules/framer-motion/dist/types.d-Cjd591yU'

type Props = {
    folderId: string
    videosKey: string
    workspaceId: string
}


const Videos = ({ folderId, videosKey, workspaceId }: Props) => {

    const { data: videoData } = useQueryData([videosKey], () => getAllUserVideos(folderId))


    const { status: videoStatus, data: videos } = videoData as VideoProps


    return (
        <div className='flex flex-col gap-4 mt-4'>

            <div className='flex '>
                <div className='flex items-center text-lg gap-4'>
                    <Video />
                    <h2 className='text-[#BdBdBd] text-base' >Videos</h2>
                </div>
            </div>
            <section className={cn(videoStatus !== 200 ? 'p-5' : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5')}>



                {videoStatus === 200 ? (
                    videos.map((video, videosKey) => (
                        <VideoCard
                        key={videosKey}
                            workspaceId={workspaceId}
                            {...video}
                        />
                    ))
                ): (
                    <p className='text-[#BDBDBD]'>No videos in workspace</p>
                )}


            </section>
        </div>
    )
}

export default Videos