import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import useMessagesStore from "./useMessageStore";
import { useShallow } from "zustand/react/shallow";
import {NewMessageToast2} from "@/components/NewMessageToast";

export const useNotificationChannel = (userId: string | null) => {
    const channelRef = useRef<Channel | null>(null);
    
    const pathname = usePathname();
    const searchParams =  useSearchParams();
    const {add, updateUnreadCount} = useMessagesStore(useShallow(state => ({
        add: state.add,
        updateUnreadCount: state.updateUnreadCount
    })));

    const handleNewMessage = useCallback((message: MessageDto) => {
        if(pathname === '/messages' && searchParams.get('container') !== 'outbox') {
            add(message);
            updateUnreadCount(1);
        } else if (pathname !== `/members/${message.senderId}/chat`) {
            NewMessageToast2(message);
            updateUnreadCount(1);
        }
    }, [add, pathname, searchParams,updateUnreadCount])


    useEffect(() => {
        if (!userId) return;
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(`private-${userId}`);

            channelRef.current.bind('message:new', handleNewMessage);

        }
        return () => {
            if(channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind('message:new', handleNewMessage);
                channelRef.current = null;
            }
        }

    }, [userId, handleNewMessage])


}