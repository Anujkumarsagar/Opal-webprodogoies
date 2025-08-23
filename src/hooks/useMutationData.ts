import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { da } from "date-fns/locale";
import { toast } from "sonner";

export const useMutationData = (mutationKey: MutationKey, mutationFn: MutationFunction<any, any>,
    queryKey?: string,
    onSuccess?: () => void
) => {

    const client = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey,
        mutationFn,
        onSuccess(data) {
            if (onSuccess) onSuccess();
            return toast(data?.status === 200 ? "Success" : "Error", {
                description: data?.message
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: [queryKey]
            })
        },
    })

    return { mutate, isPending }
}





export const useMutationDataState = (mutationKey: MutationKey) => {

    // 2. Get Data for Specific Mutations using mutationKey
    // You can observe mutation state by filtering with a specific mutationKey—handy for tracking a given type of mutation (e.g., all post creations):
    
    const data = useMutationState({
        filters: {
            mutationKey
        },
        select: (mutation) => {
            return {
                variables: mutation.state.variables as any,
                status: mutation.state.status,
            }
        }
    })

    const latestVariables = data[data.length - 1]

    return {
        latestVariables
    }
}