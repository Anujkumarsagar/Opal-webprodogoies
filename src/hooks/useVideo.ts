import { useQueryData } from "./userQueryData"
import { useMutationData } from "./useMutationData"
import { useZodForm } from "./useZodForm"
import { createCommentSchema } from "@/components/form/comment-form/schema"
import { createCommentAndReply, getUserProfile } from "@/app/actions/user"

export const useVideoComment = (videoId: string, commentId?: string ) => {
    const { data } = useQueryData(["user-profile"], () => getUserProfile())

    console.log("DATA", data)

    const { status, data: user } = data as {
        status: number
        data: {
            id: string
            image: string
        }
    }


    const { isPending, mutate } = useMutationData(
        ["new-comment"],
        (data: { comment: string }) =>
            createCommentAndReply(user?.id, data.comment, videoId, commentId),
        "video-comments",
        () => reset()
    )

    const { register, onFormSubmit, errors, reset } = useZodForm(
        createCommentSchema,
        mutate
    )

    return {
        register,
        onFormSubmit,
        errors,
        isPending,
    }
}
