import { Button } from '@/components/ui/button'
import { TabsContent } from '@radix-ui/react-tabs'
import { BooleanSchema } from 'node_modules/zod/v4/core/json-schema.cjs'
import React from 'react'
import Loader from '../loader'
import { Bot, DownloadIcon, File, Pencil, Star, Videotape } from 'lucide-react'

type Props = {
  plan: 'PRO' | 'FREE'
  trial: boolean
  videoId: string
}

const AiTools = ({ plan, trial, videoId }: Props) => {
  return <TabsContent
    value='Ai Tools'
    className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10'
  >

    {' '}
    <div className='flex items-center'>
      <div className='w-8/12'>
        <h2 className='text-3xl font-bold'>Ai Tools</h2>
        <p className='text-[#BDBDBD]'>Taking your video to the next <br /> step with the power of AI!</p>
      </div>

      <div className='flex items-center justify-between gap-4'>
        <Button className=' mt-2 text-sm'>
          <Loader state={false} color='#000'>
            Try Now
          </Loader>

        </Button>

        <Button variant={"secondary"} className=' mt-2 text-sm'>
          <Loader state={false} color='#000'>
            Pay Now
          </Loader>

        </Button>
        <Button variant={"secondary"} className=' mt-2 text-sm'>
          <Loader state={false} color='#000'>
            Generate  Now
          </Loader>

        </Button>

      </div>
      <div className='rounded-xl p-4 gap-4 flex flex-col border-[1px] border-[#1b0f1b7f]'>
        <div className='flex items-center gap-2' >
          <h2 className='text-2xl font-bold text-[#a22fe0]'>Dost AI</h2>
          <Star color='#a22fe0' fill='#a22fe0' width={24} height={24} />
        </div>
        <div className='flex gap-2 items-start' >
          <div className='p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2d2d2d]'>
            <File color='#a22fe0' fill='#a22fe0' />

          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold text-[#a22fe0]'>Summary</h3>
            <p className='text-muted-foreground text-sm'>Generate a description for your video using AI</p>
          </div>
        </div>
        <div className='flex gap-2 items-start' >
          <div className='p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2d2d2d]'>
            <Bot color='#a22fe0' fill='#a22fe0' />

          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold text-[#a22fe0]'>AI Agent</h3>
            <p className='text-muted-foreground text-sm'>Viewers can ask questions on your video and our ai agent will respond</p>
          </div>
        </div>
        
      </div>

    </div>
  </TabsContent>
}

export default AiTools