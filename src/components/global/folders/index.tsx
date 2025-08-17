import { cn } from '@/lib/utils'
import { ArrowRight, FolderIcon } from 'lucide-react'
import React from 'react'
import Folder from './folder'

type Props = {
    workspaceId: string
}

const Folders = (props: Props) => {

    //get folders
    //optimistic variable = 
    return <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <FolderIcon />
                <h2 className='text-[#BDBDBD] text-xl'>Folders</h2>
            </div>
            <div className='flex items-center gap-2'>
                <h2 className='text-[#BDBDBD]'>See All</h2>
                <ArrowRight color='#707070' />
            </div>

        </div>
        <section className={cn('flex items-center gap-4 overflow-x-auto w-full  scrollbar-none')}>

            <Folder id='fa' name='folder Title' />
        </section>
    </div>
}

export default Folders