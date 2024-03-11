import { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Ticket.scss';
// import Loader from '../../Common/loader'
import Story from './Story';

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

  const params = useParams();

  const getTickets = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ticket`)
          .then((res) => {
            setState(prevState => ({
              ...prevState,
              tickets: res.data.data,
              err: '',
              loadingTicket: false
            }));
          })
          .catch((err) => {
            setState(prevState => ({
              ...prevState,
              loadingTicket: !err.response,
              err: err
            }));
          });
  }, []);

  const getStoryDetails = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/story`)
          .then((r) => {
              setState(prevState => ({
                  ...prevState,
                  stories: r.data.data,
                  err2: '',
                  loadingStory: false
              }));
          })
          .catch((e) => {
              setState(prevState => ({
                  ...prevState,
                  loadingStory: false,
                  err2: e
              }));
          });
  }, []);

  useEffect(() => {
    getStoryDetails();
    getTickets();
  }, [getTickets, getStoryDetails, params.id]);

  // let { stories, loadingStory } = state;
  // let storyTable;

  // if(!loadingStory){
  //   storyTable = stories.map((story, index) => (
  //       <li key={index}>
  //         <Link to={`/story/${story.storyId}`} activeClassName="active">
  //           <i className="fas fa-list-alt"></i>
  //           <span className="menu-text">{story.title}</span>
  //         </Link>
  //       </li>
  //   ));
  // } else {
  //   storyTable = (
  //     <li>
  //       <div className="loader">
  //         <Loader />
  //       </div>
  //     </li>
  //   );
  // }

  return (
    <>
      <div>
        <div>
          <aside>
            <Story 
              stories={state.stories}
              tickets={state.tickets} 
              loadingStory={state.loadingStory}
              loadingTicket={state.loadingTicket}
            />
          </aside>
        </div>
      </div>
    </>
  )
}