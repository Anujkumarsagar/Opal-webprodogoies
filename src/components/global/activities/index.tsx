import CommentForm from '@/components/form/comment-form'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import CommentCard from '../comment-card'
import { getVideoComments } from '@/app/actions/user'
import { useQueryData } from '@/hooks/userQueryData'
import { VideoCommentProps } from '@/types/index.type'

type Props = {
  author: string
  videoId: string
  title?: string
  description?: string
}

const Activities = ({ author, videoId, title, description }: Props) => {

  const { data } = useQueryData(['video-comments'], () => getVideoComments(videoId))



  const { data: comments } = data as VideoCommentProps
  return (
    <TabsContent
      value='Activity'
      className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10'
    >
      <CommentForm author={author} videoId={videoId} />

      {
        comments.map(comment => (
          <CommentCard
            comment={comment.comment}
            key={comment.id}
            author={{
              image: comment.User?.image!,
              firstname: comment.User?.firstname!,
              lastname: comment.User?.lastname!
            }}
            videoId={videoId}
            reply={comment.reply}
            commentId={comment.id}
            
          />
        )
        )
      }

    </TabsContent>
  )
}

export default Activities