import { CreateWorkspace } from "@/app/actions/workspace"
import { useMutationData } from "./useMutationData"
import { useZodForm } from "./useZodForm"
import { workspaceSchema } from "@/components/form/workspace-form/schema"

export const useCreateWorkspace = () => {
    const {mutate, isPending } = useMutationData(["create-workspace"], async (data: { name: string }) => CreateWorkspace(data.name),
        "user-workspaces")

const {errors, onFormSubmit, register} = useZodForm(workspaceSchema, mutate)

return {errors, onFormSubmit, register, isPending}
}