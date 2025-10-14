import { MutationFunction, MutationKey, UseMutateFunction, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMutationData<TVariables, TResponse extends { status?: number; message?: string } = { status?: number; message?: string }>(
    mutationKey: MutationKey,
    mutationFn: MutationFunction<TResponse, TVariables>,
    queryKey?: string,
    onSuccess?: () => void
) {

    const client = useQueryClient();
    const { mutate, isPending } = useMutation<TResponse, unknown, TVariables>({
        mutationKey,
        mutationFn,
        onSuccess(data) {
            if (onSuccess) onSuccess();
            return toast(data?.status === 200 || data?.status === 201 ? "Success" : "Error", {
                description: data?.message
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: [queryKey]
            })
        },
    })

    return { mutate: mutate as UseMutateFunction<TResponse, unknown, TVariables, unknown>, isPending }
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
                variables: mutation.state.variables as unknown,
                status: mutation.state.status,
            }
        }
    })

    const latestVariables = data[data.length - 1]

    return {
        latestVariables
    }
}