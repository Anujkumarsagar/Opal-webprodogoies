"use client"

import { cn } from '@/lib/utils'
import { ArrowRight, FolderIcon } from 'lucide-react'
import React from 'react'
import Folder from './folder'
import { useQueryData } from '@/hooks/userQueryData'
import { getWorkspaceFolders } from '@/app/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationData'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/redux/slices/folders'

type Props = {
    workspaceId: string
}

export type FolderProps = {
    status: number
    data: ({
        _count: {
            videos: number
        }
    } & {
        id: string
        name: string
        createdAt: Date
        workSpaceId: string | null
    }[]

    )
}

const Folders = ({ workspaceId }: Props) => {

    const dispatch = useDispatch()
    //get folders

    const { data, isFetched } = useQueryData(['workspace-folders'], () => getWorkspaceFolders(workspaceId))

    const { latestVariables } = useMutationDataState(['create-folder'])
 
    const { status, data: folders } = data as FolderProps


    if (isFetched && folders) {
        dispatch(FOLDERS({folders: folders}))
    }


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
        <section className={cn(status !== 200 && 'justify-center', 'flex items-center gap-4 overflow-x-auto w-full  scrollbar-none')}>

            {status !== 200 ? <p className='text-neutral-300'>No folder in workspace</p> : (
                <>{latestVariables && latestVariables.status === 'pending' && (
                    <Folder
                        name={latestVariables.variables.name}
                        id={latestVariables.variables.id}
                        optimstic
                    />
                )}


                    {folders.map((folder) => (
                        <Folder
                            name={
                                
                                folder.name}
                            count={folder._count.videos}
                            id={folder.id}
                            key={folder.id}
                        />
                    ))}
                </>
            )}

        </section>
    </div>
}

export default Folders