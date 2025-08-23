import { useAppSelector } from "@/redux/store"
import { useEffect, useState, useCallback } from "react"
import { useMutationData } from "./useMutationData"
import { getWorkspaceFolders, moveVideoLocation } from "@/app/actions/workspace"
import { useZodForm } from "./useZodForm"
import { moveVideoSchema } from "@/components/form/workspace-form/change-video-location/schema"


type FolderWithVideoCount = {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string;
    _count: {
        videos: number;
    };
};

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
    // get state from redux
    // Typo fix: '=>' was missing in the arrow function.
    const { folders } = useAppSelector((state) => state.FolderReducer) // This seems unused within the hook, but may be used by the component.
    const { workspaces } = useAppSelector((state) => state.WorkspaceReducer)

    // State for fetching status of folders. Initialized to false.
    const [isFetchingFolders, setIsFetchingFolders] = useState<boolean>(false)

    // State to hold folders for the currently selected workspace in the form.
    // Renamed from isFolders for clarity and initialized to an empty array.
    const [workspaceFolders, setWorkspaceFolders] = useState<FolderWithVideoCount[]>([])

    // use mutation for optimistic updates when moving a video
    const { mutate, isPending } = useMutationData(
        ['change-video-location', videoId], // More specific query key is better for cache invalidation.
        (data: {
            folder_id: string;
            workspace_id: string;
        }) =>
            // The form provides `workspace_id`, which needs to be passed to the action.
            moveVideoLocation(videoId, data.workspace_id, data.folder_id)
    )

    // Zod form setup
    const { errors, onFormSubmit, watch, register } = useZodForm(
        moveVideoSchema,
        mutate,
        // It's good practice to ensure the schema handles `null` for folder_id if that's a possible state.
        { folder_id: null, workspace_id: currentWorkspace }
    )

    // Memoized function to fetch folders for a given workspace.
    const fetchFolders = useCallback(async (workspaceId: string) => {
        setIsFetchingFolders(true)
        try {
            const response = await getWorkspaceFolders(workspaceId)
            setWorkspaceFolders(response.data || [])
        } catch (error) {
            console.error("Failed to fetch workspace folders:", error)
            setWorkspaceFolders([]) // Reset folders on error
        } finally {
            setIsFetchingFolders(false)
        }
    }, []) // Dependencies: set... functions from useState are stable.
    
    // Watch for changes in the workspace_id field of the form.
    const watchedWorkspaceId = watch("workspace_id");
    
    // This one useEffect replaces the previous two. It fetches folders whenever the
    // selected workspace in the form changes, including the initial load.
    useEffect(() => {
        if (watchedWorkspaceId) {
            fetchFolders(watchedWorkspaceId)
        } else {
            // Clear folders if workspace is deselected.
            setWorkspaceFolders([]);
        }
    }, [watchedWorkspaceId, fetchFolders])

    return {
        onFormSubmit,
        errors,
        register,
        isPending,
        folders,
        workspaces,
        isFetching: isFetchingFolders, // Keep original name for API compatibility
        isFolders: workspaceFolders, // Keep original name for API compatibility
    }
}