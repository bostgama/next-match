'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import { MessageDto } from '@/types'
import { pusherClient } from '@/lib/pusher';
import { formatShortDateTime } from '@/lib/util';
import { Channel } from 'pusher-js';
import useMessagesStore from '@/hooks/useMessageStore';
import { useShallow } from 'zustand/react/shallow';

type Props = {
    initialMessages: { message: MessageDto[], readCount: number };
    currentUserId: string;
    chatId: string;
}

export default function MessageList({ initialMessages, currentUserId, chatId }: Props) {


    const setReadCount = useRef(false);

    const [messages, setMessages] = useState(initialMessages.message);

    const {updateUnreadCount} = useMessagesStore(useShallow( state => ({
        updateUnreadCount: state.updateUnreadCount
    })));

    useEffect(() => {
        if(!setReadCount.current) {
            updateUnreadCount(-initialMessages.readCount);
            setReadCount.current = true;
        }
    }, [initialMessages.readCount, updateUnreadCount])
    


    const channelRef = useRef<Channel | null>(null);

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages(prevState => {
            return [...prevState, message]
        })
    }, [])

    const handleReadMessages = useCallback((messageId: string[]) => {
        setMessages(prevState => prevState.map(message => messageId.includes(message.id)
            ? { ...message, dateRead: formatShortDateTime(new Date()) }
            : message
        ))
    }, [])

    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(chatId);

            channelRef.current.bind('message:new', handleNewMessage);
            channelRef.current.bind('messages:read', handleReadMessages)
        }
        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind('message:new');
                channelRef.current.unbind('messages:read');
            }

        }


    }, [chatId, handleNewMessage, handleReadMessages]);


    return (
        <div>
            {messages.length === 0 ? "No messages to display" : (
                <div>
                    {
                        messages.map(message => (
                            <MessageBox
                                key={message.id}
                                message={message}
                                currentUserId={currentUserId} />
                        ))
                    }
                </div>
            )}
        </div>
    )
}