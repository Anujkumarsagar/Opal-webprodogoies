import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, UploadIcon, Video } from 'lucide-react'
import React from 'react'

type Props = {}

const InfoBar = (props: Props) => {
    return (
        <header className=' pl-20 fixed p-4 w-full flex items-center justify-between gap-4 md:pl-[265px] '>

            <div className='flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg '>
                <Search

                    size={25}
                    className=' text-[#707070] '
                />
                <Input

                    className=' bg-transparent border-none placeholder-neutral-500 '

                    placeholder='Search for people , project, tags & folders'
                />
            </div>

            <div className=' flex items-center gap-4 '>

                <Button className='bg-[#9D9D9D] flex items-center gap-2 ' >
                    <UploadIcon size={20} />{' '}
                    <span className='flex items-center gap-2'>Upload</span>
                </Button>
                <Button className='bg-[#9D9D9D] flex items-center gap-2 ' >
                    <Video />{' '}
                    <span className='flex items-center gap-2'>Record</span>
                </Button>
                <UserButton />

            </div>
        </header>
    )
}

export default InfoBar