import { useDrag } from 'react-dnd';

export default function Ticket(props) {
    const { ticket } = props;
    // console.log(ticket);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'TICKET',
        item: {
            id: ticket._id,
            title: ticket.title
        },
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging(),
            }
        },
    }));
    return (
        <>
            <div 
                className="ticket-container"
                ref={dragRef} 
                style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                {ticket._id} - { ticket.story}
            </div>
        </>
    )
}