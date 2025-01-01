import CardInnerWrapper from '@/components/CardInnerWrapper'
import React from 'react'
import ChatForm from './ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'
import { getAuthUserId } from '@/app/actions/authActions';
import MessageList from './MessageList';
import { createChatId } from '@/lib/util';

export default async function ChatPage({ params }: { params: { userId: string }}) {


    const userIdLogiIn = await getAuthUserId();
    const {userId} = await params;

    const messageThread = await getMessageThread(userId);
    const messages = { message: messageThread.messageToReturn, readCount: messageThread.readCount };
    const chatId = createChatId(userIdLogiIn, userId);

    return (
        <CardInnerWrapper
            header="Chat"
            body={
                <MessageList initialMessages={messages} currentUserId={userIdLogiIn} chatId={chatId} />
            }
            footer={<ChatForm/>}
        />
    )
}
