import { useState, useEffect  } from 'react';
import './Ticket.scss';
// import Loader from '../../Common/loader'
import Story from './Story';
import Chat from './Chat';
import NormalSpinner from '../../Common/NormalSpinner';
import { getStories, getTickets } from '../../../actions/ticket/action';
import { useDispatch, useSelector } from 'react-redux';
import { storeTickets, getTicketById } from '../../../store/tickets/action';

export default function TicketDashboard() {
  const [state, setState] = useState({
    open: false,
    show: true,
    tickets: [],
    stories: [],
    err: '',
    err2: '',
    loadingStory: true,
    loadingTicket: true
  });

  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets.tickets);

  useEffect(() => {
    getStories()
      .then(data => {
        setState(prevState => ({
          ...prevState,
          stories: data.data,
          error: '',
          loadingStory: false,
        }));
      })
      .catch(error => {
        setState(prevState => ({
          ...prevState,
          loadingStory: false,
          error: error.toString(),
        }));
      });

      getTickets()
      .then(data => {
        dispatch(storeTickets(data.data));
        setState(prevState => ({
          ...prevState,
          tickets: data.data,
          error: '',
          loadingTicket: false,
        }));
      })
      .catch(error => {
        setState(prevState => ({
          ...prevState,
          loadingTicket: false,
          error: error.toString(),
        }));
      });
  }, []);

  const mappedStories = state.stories.map(story => {
    const storyTickets = state.tickets.filter(ticket => ticket.story === story._id);
    story.tickets = storyTickets
    return story;
  })

  return (
    <>
      <div className='dashboard'>
        <div className='left-section'>
          <div className='story-constainer'>
            <div className='legend'>Under Development</div>

            
            { 
              state.loadingStory
              ? <NormalSpinner color="#1c83a5" />
              : <div className='story-scroller'>
                  {
                    mappedStories.length === 0
                    ? <div> There is no stories</div>
                    : mappedStories.map(story => (
                          <Story
                            key={story._id}
                            story={story}
                          ></Story>
                      ))
                  }
                </div>
            }


            <div>Under Development</div>
          </div>
        </div>


        <div className='right-section'>
          <Chat />
        </div>
      </div>
    </>
  )
}