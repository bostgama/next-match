"use client";
import { MessageDto } from '@/types';
import { Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';
import MessageTableCell from './MessageTableCell';
import { useMessages } from '@/hooks/useMessages';

type Props = {
    intialMessages: MessageDto[]
}

export default function MessageTable({ intialMessages }: Props) {

    const {columns, isOutbox, isDeleting, deleteMessage, selectRow, messages} = useMessages(intialMessages);

    // call back only create it when the dependecies are changed in this example isOutbox will be re 
    // const renderCell = useCallback((item: MessageDto, columnKey: keyof MessageDto) => {

    //     const cellValue = item[columnKey];

    //     switch (columnKey) {
    //         case 'recipientName':
    //         case 'senderName':
    //             return (
    //                 <div className='flex items-center gap-2 cursor-pointer'>
    //                     <PresenceAvatar
    //                         userId={isOutbox ? item.recipientId: item.senderId}
    //                         src={isOutbox ? item.recipientImage : item.senderImage}
    //                     />
    //                     <span>{cellValue}</span>
    //                 </div>

    //             )
    //         case 'text':
    //             return (
    //                 <div className='truncate'>
    //                     {truncateString(cellValue, 80)}
    //                 </div>
    //             )

    //         case 'created':
    //             return cellValue

    //         default:
    //             return (
    //                 <Button
    //                     isIconOnly variant='light'
    //                     onClick={() => handleDeleteMessage(item)}
    //                     isLoading={isDeleting.id === item.id && isDeleting.loading}
    //                 >
    //                     <AiFillDelete size={24} className='text-danger' />
    //                 </Button>
    //             )

    //     }

    // }, [isOutbox, isDeleting.id, isDeleting.loading, handleDeleteMessage])

    return (
        <Card className='flex flex-col gap-3 h-[80vh] overflow-auto'>
            <Table
                aria-label='Table with messages'
                selectionMode='single'
                onRowAction={(key) => selectRow(key)}
                shadow='none'

            >
                <TableHeader columns={columns}>
                    {(column) => 
                        <TableColumn key={column.key} width={column.key === 'text' ? '50%' : undefined}>
                            {column.label}
                        </TableColumn>}
                </TableHeader>
                <TableBody items={messages} emptyContent='No messages for this container'>
                    {(item) => (
                        <TableRow key={item.id} className='cursor-pointer'>
                            {(columnKey) => (
                                <TableCell className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                    <MessageTableCell
                                        item={item}
                                        columnKey={columnKey as string}
                                        isOutbox={isOutbox}
                                        deleteMessage={deleteMessage}
                                        isDeleting={isDeleting.loading && isDeleting.id === item.id}
                                    />
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>

    )
}
