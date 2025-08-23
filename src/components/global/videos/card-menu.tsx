import React from 'react'
import Modal from '../modal'
import { Move } from 'lucide-react'
import ChangeVideoLocation from '@/components/form/workspace-form/change-video-location'

type Props = {
  videoId: string
  currentWorkspace?: string | undefined
  currentFolder?: string
  currentFolderName?: string
}

const CardMenu = ({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: Props) => {
  return <Modal
    className='flex items-center cursor-pointer gap-x-2'
    title='Move to new Workspce/Folder'
    description='this action cannot be undone. this will permanently delete your accoount and remove your daa om the server '

    trigger={
      <Move
        size={20}
        fill='#4f4f4f'
        className='text-[#4f4f4f]' />
    }
  >

    <ChangeVideoLocation
    
      videoId={videoId}
       currentWorkSpace={currentWorkspace}
      currentFolder={currentFolder}
      currentFolderName={currentFolderName}
    />
  </Modal>
}

export default CardMenu