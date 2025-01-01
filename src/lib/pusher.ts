/* eslint-disable no-var */
import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

declare global {
    var PusherServerInstance: PusherServer | undefined;
    var pusherClientInstance: PusherClient | undefined;
}

if(!global.PusherServerInstance) {
    global.PusherServerInstance = new PusherServer({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: 'mt1',
        useTLS: true
    })
}

if(!global.pusherClientInstance) {
    global.pusherClientInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        channelAuthorization: {
            endpoint: '/api/pusher-auth',
            transport: 'ajax'
        },
        cluster: 'mt1'
    })
}

export const pusherServer = global.PusherServerInstance;
export const pusherClient = global.pusherClientInstance;