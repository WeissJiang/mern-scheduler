import './Ticket.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllChats } from '../../../store/chats/action';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';

export default function ChatPanel() {
    const chats = useSelector(selectAllChats);

    const [open, setOpen] = useState('0');
    const toggle = (id) => {
        if (open === id) {
            setOpen('0');
        } else {
            setOpen(id);
        }
    };

    return (
        <>
            <div className='chat'>
                <h2>Chats</h2>

                {chats.length === 0 
                    ? <h3>No Chats</h3>
                    : <Accordion open={open} toggle={toggle}>
                        {
                            chats.map(chat => (
                                <AccordionItem key={chat.id}>
                                <AccordionHeader targetId={chat.id}>{chat.title}</AccordionHeader>
                                    <AccordionBody accordionId={chat.id}>
                                        <div>
                                            <strong>{chat.contact}</strong>
                                            {chat.content}<code>hello world</code>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                }
            </div>
        </>
    )
}