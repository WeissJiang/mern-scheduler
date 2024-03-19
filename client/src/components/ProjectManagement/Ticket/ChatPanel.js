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

export default function ChatPanel({expandChat, setToggleChat}) {
    const chats = useSelector(selectAllChats);

    const toggleChatPanel = () => setToggleChat(!expandChat);

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
                <div 
                    className='chat-header'
                    onClick={toggleChatPanel}
                >
                    {
                        expandChat
                        ? <i className="fa-solid fa-square-minus"></i>
                        : <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                    }
                    {' '} Chats
                </div>

                {chats.length === 0 
                    ? <h3>No Chats</h3>
                    : <Accordion open={open} toggle={toggle}>
                        {
                            chats.map(chat => (
                                <AccordionItem key={chat.id}>
                                <AccordionHeader targetId={chat.id}>{chat.title}</AccordionHeader>
                                    <AccordionBody accordionId={chat.id}>
                                        <div className='chat-card'>
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