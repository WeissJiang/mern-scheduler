import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import './Ticket.scss';

export default function Ticket(props) {
    const { ticket } = props;
    // console.log(ticket);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'TICKET',
        item: {
            id: ticket._id,
            title: ticket.title,
            story: ticket.story
        },
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging(),
            }
        },
    }));

    const openTicketDetail = () => {
        console.log('click to open modal');
    }

    const getDateString = (date) => {
        if(!date) { 
            return <div></div>;
        }

        let dueDiv = <div className='ticket-duedate'>{date.slice(0, 10)}</div>;
        let futureDate = new Date(Date.now());
        futureDate.setDate(futureDate.getDate() + 10);
        futureDate = futureDate.setHours(0, 0, 0, 0);

        const dateTime = new Date(date).setHours(0, 0, 0, 0);

        if(Date.now() > dateTime) {
            dueDiv = <div className='ticket-duedate expired'>{date.slice(0, 10)}</div>
        }else if (dateTime > Date.now() && dateTime < futureDate){
            dueDiv = <div className='ticket-duedate expired-in-10-days'>{date.slice(0, 10)}</div>
        }

        return dueDiv;
    }

    return (
        <>
            <div 
                className="ticket-container"
                ref={dragRef} 
                style={{ opacity: isDragging ? 0.5 : 1 }}
                id="tooltip"
                onClick={openTicketDetail}
            >
                <div className='ticket-header'>
                    { getDateString(ticket.dueDate) }
                    <div className='ticket-edit'>
                        <i className="fa-solid fa-pen"></i>
                    </div>
                </div>

                <div className='ticket-body'>
                    <div className='ticket-title'>{ ticket.title }</div>
                    <div className='ticket-description'>{ ticket.description }</div>
                    <div className='ticket-checklist'>
                        <i className="fa-regular fa-square"></i>
                        <span className='checklist'>1/2</span>
                    </div>
                </div>

                <div className='ticket-footer'>
                    <div className='tciekt-attachments'>
                        <i className="fa-solid fa-paperclip"></i>
                        <span>1</span>
                    </div>
                    <div  className='tciekt-comments'>
                        <i className="fa-regular fa-message"></i>
                        <span>2</span>
                    </div>
                    <div  className='tciekt-assignees'>
                        <div className='assignee'>A</div>
                    </div>
                </div>

                
            </div>
            {/* <Tooltip
                placement="right"
                isOpen={tooltipOpen}
                target="tooltip"
                toggle={tooltipToggle}
            >
                <div className='custom-tooltip'>
                    - Drag to change story <br/>
                    - Click to open detail`
                </div>
            </Tooltip> */}
        </>
    )
}