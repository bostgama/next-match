'use client';

import useMessagesStore from '@/hooks/useMessageStore';
import { NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useShallow } from 'zustand/react/shallow';

type Props = {
    href: string;
    label: string;
}

export default function NavLink({ href, label }: Props) {

    const pathname = usePathname();
    const {unreadCount} = useMessagesStore(useShallow(state => ({
        unreadCount: state.unreadCount
    })));

    return (
        <NavbarItem isActive={pathname === href} as={Link} href={href}>{label}
            <span>{label}</span>
            {href === '/messages' &&  ( <span className='ml-1'>({unreadCount})</span>)}
        </NavbarItem>
    )
}
