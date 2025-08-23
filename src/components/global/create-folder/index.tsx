
"use client"

import { Button } from '@/components/ui/button'
import { useCreateFolders } from '@/hooks/useCreateFolders'
import { FolderPlus } from 'lucide-react'
import React from 'react'

type Props = {
    workspaceId: string
}

const CreateFolder = ({workspaceId}: Props) => {
    //WIP: add create folders
    const {onCreateNewFolder} = useCreateFolders(workspaceId)
  return (
    <Button  onClick={onCreateNewFolder} className='bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
      <FolderPlus />
      Create A folder
    </Button>
  )
}

export default CreateFolder