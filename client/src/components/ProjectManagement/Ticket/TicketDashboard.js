import { useEffect, useMemo, useState } from 'react';
import './Ticket.scss';
import Story from './Story';
import ChatPanel from './ChatPanel';
import NormalSpinner from '../../Common/NormalSpinner';
import RadioButtons from '../../Common/RadioButtons';
import CustomTooltip from '../../Common/Tooltip';
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


  /**
   * Ticket Dashboard Legend section
   */
  const displayOptions = [
    {
      id: "ticket-dashboard",
      name: "dashboard"
    },
    {
      id: "ticket-list",
      name: "List"
    }
  ]

  const [selectedFormat, setDisplayFormat] = useState(displayOptions[0].id);

  // const legendOptions = [selectedFormat];

  const [questionTooltipOpen, setQuestionTooltipOpen] = useState(false);
  const content = {
    title: "Guide of Ticket Service",
    dotPoints: [
      "Change Story: drag and drop ticket to different story list",
      "Edit Ticket: click on ticket area to open modal"
    ]
  }

  const [expandChat, setToggleChat] = useState(true);

  return (
    <>
      <div className='dashboard'>
        <div className='banner text'>CSS - WATER DROP EFFECT</div>
        <div className='content-section'>
          <div 
            className='left-section'
            style={{ width: expandChat ? '70%' : '90%' }}
          >
            <div className='story-constainer'>
              <div className='legend row'>
                <RadioButtons
                  items={displayOptions}
                  rSelected={selectedFormat}
                  setRSelected={setDisplayFormat}
                />
                <div 
                  className='question-mark'
                >
                  <i className="fa-solid fa-circle-question" id="question-tooltip"></i>
                </div>
                <div className='add-story'>Story +</div>
                <div className='legend-options'>
                  Selected Features:
                  {selectedFormat}
                </div>
              </div>

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


              <div style={{
                height: '600px'
              }}>Under Development</div>
            </div>
          </div>
          <div 
            className='right-section'
            style={{ width: expandChat ? '30%' : '10%' }}
          >
            <ChatPanel 
              expandChat={expandChat}
              setToggleChat={setToggleChat}
            />
          </div>
        </div>
        <CustomTooltip
          tooltipOpen={questionTooltipOpen}
          setTooltipOpen={setQuestionTooltipOpen}
          target="question-tooltip"
          placement="bottom"
          content={content}
        />
      </div>
    </>
  )
}