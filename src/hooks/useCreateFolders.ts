import { createFolder } from "@/app/actions/workspace"
import { useMutationData } from "./useMutationData"

export const useCreateFolders = (workspaceId: string) => {

    const { mutate } = useMutationData(['create-folder'], () => createFolder(workspaceId), "workspace-folders")


    const onCreateNewFolder = () => {
        mutate({ name: 'Untitled Folder', id: 'optimistic-id' })
    }

    return { onCreateNewFolder }
    // This hook will handle the logic for creating folders
    // It will use a mutation to create a folder and update the state accordingly
    // WIP: Implement the logic for creating folders
}