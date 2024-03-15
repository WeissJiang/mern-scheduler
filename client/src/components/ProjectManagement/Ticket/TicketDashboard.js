import { useEffect, useMemo } from 'react';
import './Ticket.scss';
import Story from './Story';
import ChatPanel from './ChatPanel';
import NormalSpinner from '../../Common/NormalSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTickets, fetchTickets } from '../../../store/tickets/action'
import { selectAllStories, fetchStories } from '../../../store/stories/action'


export default function TicketDashboard() {

  const dispatch = useDispatch();
  const stories = useSelector(selectAllStories);
  const storyStatus = useSelector(state => state.stories.status);
  const tickets = useSelector(selectAllTickets);
  const ticketStatus = useSelector(state => state.tickets.status);

  const loadingStory = storyStatus === 'loading';
  const loadingTicket = ticketStatus === 'loading';

  useEffect(() => {

      if (storyStatus === 'idle') {
        dispatch(fetchStories())
      }
      if (ticketStatus === 'idle') {
        dispatch(fetchTickets());
      }
  }, [storyStatus, ticketStatus, dispatch]);

  const mappedStories = useMemo(() => {
    return stories.map(story => {
      const storyTickets = tickets.filter(ticket => ticket.story === story._id);
      return { ...story, tickets: storyTickets };
    });
  }, [stories, tickets]); 

  return (
    <>
      <div className='dashboard'>
        <div className='left-section'>
          <div className='story-constainer'>
            <div className='legend'>Under Development</div>

            
            { 
              loadingStory
              ? <NormalSpinner color="#1c83a5" />
              : <div className='story-scroller'>
                  {
                    mappedStories.length === 0
                    ? <div> There is no stories</div>
                    : mappedStories.map(story => (
                          <Story
                            key={story._id}
                            story={story}
                            loadingTicket={loadingTicket}
                          ></Story>
                      ))
                  }
                </div>
            }


            <div>Under Development</div>
          </div>
        </div>


        <div className='right-section'>
          <ChatPanel />
        </div>
      </div>
    </>
  )
}