"use client"

import { getWorkSpaces } from '@/app/actions/workspace'
import { useQueryData } from '@/hooks/userQueryData'

import React from 'react'
import Modal from '../modal'
import { Button } from '@/components/ui/button'
import { FolderPlusIcon } from 'lucide-react'
import WorkspaceForm from '@/components/form/workspace-form'

const CreateWorkspace = () => {
    const { data } = useQueryData(["user-workspaces"], getWorkSpaces)

    const plan = (data as { status: number; data: Array<{ subscription: { plan: 'PRO' | 'FREE' } | null }> } | undefined)?.data?.[0]?.subscription?.plan ?? null

    if (plan !== 'PRO') {
        return <></>
    }
  return (
    <Modal
    title="Create a Workspace"
    description='Workspaces helps you collaborae with team members. You are assigned a default personal workspace where you can share videos in private with yourself'
    trigger={
        <Button className='bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl '>
            <FolderPlusIcon />
            Create a workspace
        </Button>
    }
    >

        <WorkspaceForm />
    </Modal>
  )
}

export default CreateWorkspace