"use client"

import CommentForm from '@/components/form/comment-form'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CommentRepliesProps } from '@/types/index.type'
import React from 'react'

type Props = {
    comment: string
    author: {
        image: string,
        firstname: string
        lastname: string
    }
    videoId: string
    commentId?: string | null
    reply: CommentRepliesProps[]
    isReply?: boolean
}

const CommentCard = ({
    comment,
    author,
    videoId,
    commentId,
    reply,
    isReply
}: Props) => {
    const [onReply, setOnReply] = React.useState(false)

    return (
        <Card className={cn(isReply ? 'bg-[#1d1d1d]' : 'border-[1px] bg-[#1d1d1d] p-5 rounded-xl')}>

            <div>
                <Avatar>
                    <AvatarImage
                        src={author.image}
                        alt={author.firstname}
                    />
                </Avatar>
                <p
                    className='capitalize text-sm text-[#bdbdbd]'
                >{author.firstname} {author.lastname}</p>
            </div>

            <div>
                <p className='text-[#bdbdbd] text-sm'>{comment}</p>
            </div>

            {!isReply && <div className='flex justify-end mt-3 gap-x-5'>
                !onReply ? (
                <div>
                    <Button className='text-sm rounded-full text-white hover:text-black bg-[#252525] '>

                        Reply
                    </Button>
                </div>
                ) : (
                <CommentForm
                    close={() => setOnReply(false)}
                    videoId={videoId}
                    commentId={commentId}
                    author={author.firstname + ' ' + author.lastname}
                />
                )
            </div>}

            {
                reply.length > 0 && (
                    <div>
                        {reply.map((r)=>(
                            <CommentCard
                            comment={r.comment}
                            commentId={r.commentId}
                            key={r.id}
                            author={{
                                image: r.User?.image!,
                                firstname: r.User?.firstname!,
                                lastname: r.User?.lastname!
                            }}
                            videoId={videoId}
                            reply={[]}
                            isReply
                            />
                        ))}
                    </div>
                )
            }
        </Card>
    )
}

export default CommentCard