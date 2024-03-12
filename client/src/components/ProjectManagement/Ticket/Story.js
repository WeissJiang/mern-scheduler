import './Ticket.scss';
import NormalSpinner from '../../Common/NormalSpinner';
import Ticket from './Ticket';
import { useDrop } from 'react-dnd';
import { updateTicket } from '../../../actions/ticket/action';

export default function Story(props) {
  const { story } = props;

  const [, dropRef] = useDrop(() => ({
    accept: 'TICKET',
    drop: (item, monitor) => {
      console.log(`Ticket ${item.id} dropped into story ${story._id}`);
      if(window.confirm(`Are you sure you want to move ${item.title} to ${story.name}`)){
        
        const updated = {
          story: story._id
        }

        updateTicket(item.id, updated)
        .then(() => {
          alert("updated!")
        })
        .catch((e) => {
          alert(e)
        });
      }
    },
  }));

  return(
      <div 
        key={story._id} 
        className='story'
        ref={dropRef}
      >
        <div className='hover-story-title'> {story.name}</div>
        { 
          props.loadingTicket 
          ? <NormalSpinner color="#1c83a5" />
          : (story.tickets?.length === 0
              ? <div> There is no tickets under current story</div>
              : story.tickets.map(ticket =>(
                  <Ticket 
                    key={ticket._id}
                    ticket={ticket}
                  ></Ticket>
                ))
            )
        }
      </div>
  )
}