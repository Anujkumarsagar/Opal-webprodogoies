import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useVideoComment } from '@/hooks/useVideo'
import { Send, X } from 'lucide-react'
import React from 'react'

type Props = {
    videoId: string
    commentId?: string | null
    author: string
    close?: () => void
}

const CommentForm = ({ videoId, commentId, author, close }: Props) => {
    const { errors, isPending, onFormSubmit, register } = useVideoComment(videoId, commentId)
    return (
        <form className='relative w-full' onSubmit={onFormSubmit}>
            {/* {close && (
            <X
                onClick={close}
                size={18}
                className='absolute right-3 top-3 text-white/50 cursor-pointer hover:text-white/80'
            />
            )} */}
            <FormGenerator
                register={register}
                errors={errors}
                placeholder={`Respond to ${author}...}`}
                name='comment'
                lines={8}
                inputType="textarea"
                type="text"
            />
            <Button
                className='p-0 bg-transparent absolute  top-[1px] right-3 hover:bg-transparent'
                type='submit'
            >
                <Loader state={isPending}>
                    <Send
                        className='text-white/50 hover:text-white/80 cursor-pointer'
                        size={18}
                    />
                </Loader>
            </Button>
        </form>
    )
}

export default CommentForm