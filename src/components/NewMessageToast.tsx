import { transformImageUrl } from '@/lib/util'
import { MessageDto } from '@/types'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'

type Props = {
    message: MessageDto
}

export function NewMessageToast({ message }: Props) {
    return (
        <Link href={`/members/${message.senderId}/chat`} className='flex items-center'>
            <Image src={transformImageUrl(message.senderImage) || '/images/avatar.png'}
                width={40}
                height={40}
                alt='Sender image'
            />
            <div className='flex flex-grow flex-col justify-center'>
                <div className='font-semibold'>{message.senderName} sent you a message</div>
                <div className='text-sm'>Click to view</div>
            </div>

        </Link>
    )
}
export const NewMessageToast2 = (message: MessageDto) => {
    toast(<NewMessageToast message={message} />)
}