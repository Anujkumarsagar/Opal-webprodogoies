import { MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
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
        onSettled: async() => {
            return await client.invalidateQueries({
                queryKey:[ queryKey]
            })
        },
    })

    return { mutate, isPending}
}