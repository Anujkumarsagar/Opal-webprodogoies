"use client"

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Loader from '../loader'
import { useMutationData } from '@/hooks/useMutationData'
import { renameFolders } from '@/app/actions/workspace'
import { Input } from '@/components/ui/input'

type Props = {
    name: string
    id: string
    optimstic?: boolean
    count?: number
}

const Folder = ({ id, name, count, optimstic }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const folderCardRef = useRef<HTMLDivElement | null>(null)
    const pathName = usePathname()
    const router = useRouter();
    const [onRename, setOnRename] = useState(false)
    const Rename = () => setOnRename(true)
    const Renamed = () => setOnRename(false)

    //WIP: add loading states


    const { mutate, isPending } = useMutationData(['rename-folders'], (data: { name: string }) => renameFolders(id, name), "workspace-folders", Renamed)

    const handleFolderClick = () => {
        router.push(`${pathName}/folder/${id}`)
    }

    const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation()
        Rename()
        //rename
    }

    const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
        if (inputRef.current && folderCardRef.current) {

            if (!inputRef.current.contains(e.target as Node | null) && !folderCardRef.current.contains(e.target as Node | null)) {

                if (inputRef.current.value) {
                    mutate({ name: inputRef.current.value })
                } else Renamed()
            }
        }
    }


    return (
        <div
            onClick={() => handleFolderClick}
            className={cn('flex hover:bg-neutral-800 transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]')}>

            <Loader state={false}>
                <div className='flex flex-col gap-[1px]'>
                    {onRename ? <Input
                        placeholder={name} className='border-none underline text-base  w-full outline-none text-neutral-300 bg-transparent p-0'
                        ref={inputRef}
                        autoFocus
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => updateFolderName(e)}
                    /> : ''}
                    <p
                        onClick={(e) => e.stopPropagation(

                        )}
                        onDoubleClick={handleNameDoubleClick}
                        className='text-neutral-300'>{name}</p>
                    <span className=' text-sm text-neutral-500 '>{count || 0} videos</span>
                </div>

            </Loader>
        </div>
    )
}

export default Folder