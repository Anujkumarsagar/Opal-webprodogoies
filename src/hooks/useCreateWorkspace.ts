import { CreateWorkspace } from "@/app/actions/workspace"
import { useMutationData } from "./useMutationData"
import { useZodForm } from "./useZodForm"
import { workspaceSchema } from "@/components/form/workspace-form/schema"
import { z } from "zod"

export const useCreateWorkspace = () => {
    const { mutate, isPending } = useMutationData<z.infer<typeof workspaceSchema>, { status?: number; message?: string }>(
        ["create-workspace"],
        async (data) => {
            return CreateWorkspace(data.name)
        },
        "user-workspaces"
    )

    const { errors, onFormSubmit, register } = useZodForm(workspaceSchema, mutate)

    return { errors, onFormSubmit, register, isPending }
}