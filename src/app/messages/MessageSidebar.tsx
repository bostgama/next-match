"use client";
import React, { useState } from 'react'
import {MdOutlineOutbox} from "react-icons/md";
import {GoInbox} from "react-icons/go"
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Chip } from '@nextui-org/react';
import useMessagesStore from '@/hooks/useMessageStore';
import { useShallow } from 'zustand/react/shallow';

export default function MessageSidebar() {

    const {unreadCount} = useMessagesStore(useShallow(state => ({
        unreadCount: state.unreadCount})));

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [selected, setSelected] = useState<string>(searchParams.get('container') || 'inbox')

    const items = [
        {key: "inbox", label: "Indox", icon: GoInbox, chip: true},
        {key: "outbox", label: "Outbox", icon: MdOutlineOutbox, chip: false},
    ]

    const handleSelect = (key: string)=> {
        setSelected(key);
        const params = new URLSearchParams();
        params.set('container', key);
        router.replace(`${pathname}?${params}`);
    }

    return (
        <div className='flex flex-col shadow-md rounded-lg cursor-pointer'>
            {items.map(({key, icon:Icon, label, chip})=> (
                <div key={key}
                    className={clsx('flex flex-row items-center rounded-t-lg gap-2 p-3', {
                        'text-secondary font-semibold': selected === key,
                        'text-back hover:text-secondary/70': selected !== key
                    })}
                    onClick={() => handleSelect(key)}
                >
                    <Icon size={25}/>
                    <div className='flex justify-between flex-grow'>
                        <span>{label}</span>
                        {chip && <Chip>{unreadCount}</Chip>}
                    </div>
                    
                </div>
            ))}
        </div>
    )
}
