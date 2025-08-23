import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useMoveVideos } from '@/hooks/useFolders'
import React from 'react'

type Props = {
    videoId: string 
    currentFolder: string | undefined
    currentWorkSpace: string | undefined
    currentFolderName: string | undefined
}

const ChangeVideoLocation = ({
    videoId,
    currentFolder,
    currentWorkSpace,
    currentFolderName,
}: Props) => {

    const {
        register,
        isFetching,
        isPending,
        onFormSubmit,
        folders,
        workspaces,
        isFolders
    } = useMoveVideos(videoId, currentFolder)
    // WIP : wire up the user move folder

    const folder = folders.find((folder) => folder.id === currentFolder)
    const workspace = workspaces.find((workspace) => workspace.id === currentWorkSpace)


    return (
        <form className='flex flex-col gap-y-5' action="">


            <div className='border-[1px] rounded-xl p-5'>
                <h2 className='text-xs mb-5 text-[#a4a4a4]'>Current</h2>
                {workspace && (
                    <p className='text-[#a4a4a4]'>{workspace.name}</p>
                )}
                {folder && (
                    <p className='text-[#a4a4a4]'>{folder.name}</p>

                )}
                <p className='text-[#a4a4a4] text-sm'>This video has no folder</p>

            </div>
            <Separator orientation='horizontal' />
            <div className='border-[1px] flex flex-col gap-y-5 rounded-xl p-5'>
                <h2 className='text-xs text-[#a4a4a4]'>To</h2>
                <Label className='flex-col gap-y-2 flex text-sm'>
                    <p className='text-xs'>Workspace</p>
                    <select name="" className='rounded-xl text-base bg-transparent' id="">
                        <option className='text-[#a4a4a4]' value="something">workspace</option>
                    </select>
                </Label>

            </div>

        </form>
    )
}

export default ChangeVideoLocation