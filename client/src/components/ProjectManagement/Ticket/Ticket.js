import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Tooltip } from 'reactstrap';

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

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    const openTicketDetail = () => {
        console.log('click to open modal')
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
                {ticket._id} - { ticket.story}
            </div>
            <Tooltip
                placement="right"
                isOpen={tooltipOpen}
                target="tooltip"
                toggle={tooltipToggle}
            >
                <div className='custom-tooltip'>
                    {`${ticket.title}`} <br/> {`- Drag to change story`} <br/> {`- Click to open detail`}
                </div>
            </Tooltip>
        </>
    )
}