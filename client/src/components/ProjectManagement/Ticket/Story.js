import './Ticket.scss';
import NormalSpinner from '../../Common/NormalSpinner';
import Ticket from './Ticket';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateTicket } from '../../../store/tickets/action';
import { setToast } from '../../../store/toast/action';

export default function Story(props) {
  const dispatch = useDispatch();
  const { story } = props;

  const [, dropRef] = useDrop(() => ({
    accept: 'TICKET',
    drop: (item, monitor) => {
      console.log(`Ticket ${item.id} dropped into story ${story._id}`);
      
      if(item.story !== story._id && window.confirm(`Are you sure you want to move ${item.title} to ${story.name}`)){
        
        const data = {
          story: story._id
        }

        dispatch(updateTicket({id: item.id, data}))
          .then(() => {
            dispatch(setToast({ message: "Ticket updated successfully!", type: "success" }));
          })
          .catch((e) => {
            dispatch(setToast({ message: e.toString(), type: "error" }));
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
        <div className='hover-story-title'> 
          {story.name} 
          <div className='story-count'>
            {story.tickets.length}
          </div>
          <div className='story-add'>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
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