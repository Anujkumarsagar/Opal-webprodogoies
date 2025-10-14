import { Button } from '@/components/ui/button'
import { Tilt_Neon } from 'next/font/google'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  description: string
  id: string
  title: string
  source: string
}

const RichLink = ({ description, id, title, source }: Props) => {

  const CopyRichText = () => {

    const originalTitle = title
    const thumbnail = `<a style="display: flex; flex-direction: column; gap: 10px" href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}">
    <h3 style="text-direction: none; color: black; margin: 0;">${originalTitle}</h3>
    <p style="text-direction: none; color: black; margin: 0;">${description}</p>
    <video
      style="display: block"
      width="320"
      >
      <source type="video/webm" src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREM_URL}/${source}  />
    </video>

    </a>`

    const thumbnailBlob = new Blob([thumbnail], { type: 'text/html' })
    const blobTitle = new Blob([originalTitle], { type: 'text/html' })

    const data = [
      new ClipboardItem({
        'text/html': thumbnailBlob,
        'text/plain': blobTitle,
      }),
    ]

    navigator.clipboard.write(data).then(() => {
      return toast('Embedded Link Copied', {
        description: 'Successfully copied to clipboard'
      })
    })


  }
  return <Button
    onClick={CopyRichText}
    className='rounded-full'
  >Get Embedded Code </Button>
}

export default RichLink