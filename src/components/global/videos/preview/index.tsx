"use client"

import { getPreviewVideo, sendEmailForFirstView } from '@/app/actions/workspace'
import { useQueryData } from '@/hooks/userQueryData'
import { VideoProps, VideosProps } from '@/types/index.type'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import CopyLink from '../CopyLink'
import { Playwrite_CA } from 'next/font/google'
import RichLink from '../rich-link'
import { truncateString } from '@/lib/utils'
import { Download } from 'lucide-react'
import TabMenu from '../../tabs'
import VideoTranscript from '../../video-transcript'
import { TabsContent } from '@radix-ui/react-tabs'
import AiTools from '../../ai-tool'
import Activities from '../../activities'

type Props = {
    videoId: string
}

const VideoPreview =  ({ videoId }: Props) => {
    //WIP setup notify first view
    const router = useRouter()

    const { data } = useQueryData(['preview-video'], () => getPreviewVideo(videoId))

    console.log(data, ['preview-video'])

    const notifyFirstView = async () => await sendEmailForFirstView(videoId)

    const { data: video, status, author } = data as VideosProps
    if (status != 200) router.push('/')

    const daysAgo = Math.floor(
        (new Date().getTime() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    )

    useEffect(()=>{
        if(video.views == 0){
            notifyFirstView()
        }

        return() => {
            notifyFirstView()
        }
    },[])
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:py-10 overflow-y-auto gap-5">
            <div className="flex flex-col lg:col-span-2 gap-y-10">
                <div>
                    <div className="flex gap-x-5 items-start justify-between">
                        <h2 className="text-white text-4xl font-bold">{video.title}</h2>
                        {
                            // author ? (
                            //     <EditVideo

                            //         videoId={videoId}
                            //         title={video.title as string}
                            //         description={video.description as string}
                            //     />
                            // ) : (
                            //     <>
                            //     </>
                            // )

                        }

                    </div>
                    <span className='flex gap-x-3 mt-2'>
                        <p className='text-[#9D9D9D] capitalize'>{video.User?.firstname} {video.User?.lastname}</p>
                        <p className='text-[#707070]'>{daysAgo === 0 ? 'Today' : daysAgo + 'd ago'}</p>
                    </span>
                </div>
                <video

                    preload='metadata'
                    className='w-full aspect-video opacity-50 rounded-xl'
                    controls
                >
                    <source src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREM_URL}/${video.source}#1`} />
                </video>
                <div className='flex flex-col gap-y-5 text-2xl'>
                    <div className='flex flex-col gap-x-5 items-center justify-between'>
                        <p className='text-[#BDBDBD] text-semibold'>Description</p>
                        {
                            // author ? (
                            //     <EditVideo

                            //         videoId={videoId}
                            //         title={video.title as string}
                            //         description={video.description as string}
                            //     />
                            // ) : (
                            //     <>
                            <p className='text-[#9D9D9D] text-lg text-medium'>{video.description}</p>
                            //     </>
                            // )
                        }
                    </div>
                </div>
                <div className='lg:col-span-1 flex flex-col gap-y-16'>
                    <div className='flex justify-end gap-x-3 items-center'>
                        <CopyLink
                            variant="outline"
                            className='rounded-full bg-transparent px-10'
                            videoId={videoId}

                        />
                        <RichLink
                            description={truncateString(video.description as string, 150)}
                            id={videoId}
                            source={video.source as string}
                            title={video.title as string}
                        />

                        <Download className='text-[#4d4c4c]' />
                    </div>
                    <div>
                        <TabMenu
                            defaultValue='all'
                            triggers={['Ai Tool', 'Transcript', 'Activity']}
                        >

                            <AiTools
                                videoId={videoId}
                                trial={video.User?.trial}
                                plan={video.User?.subscription?.plan}
                            />

                            <VideoTranscript transcript={video.description as string} />

                            <Activities
                            author={video.User?.firstname as string}
                            videoId={videoId}
                            />

                            <TabsContent value='Activity' className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10'>
                                Make Changes to your account here
                            </TabsContent>
                        </TabMenu>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default VideoPreview