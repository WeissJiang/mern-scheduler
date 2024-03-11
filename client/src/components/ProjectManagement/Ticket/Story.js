// import Task from './task'
// import Tooltips from './tooltip'
import './Ticket.scss';
import NormalSpinner from '../../Common/NormalSpinner'

export default function Story(props) {
  const mappedStories = props.stories.map(story => {
    const storyTickets = props.tickets.filter(ticket => ticket.story === story._id);
    story.tickets = storyTickets
    return story;
  })

  console.log(mappedStories);
  return(
    <div className='container'>
      <div className='legend'>Under Development</div>

      
      { 
        props.loadingStory
        ? <NormalSpinner color="#1c83a5" />
        : <div className='story-list'>
            {
              mappedStories.length === 0
              ? <div> There is no stories</div>
              : mappedStories.map(story => (
                    <div key={story._id} className='story'>
                      <div> {story.name}</div>
                      { 
                        props.loadingTicket 
                        ? <NormalSpinner color="#1c83a5" />
                        : (story.tickets?.length === 0
                            ? <div> There is no tickets under current story</div>
                            : story.tickets.map(ticket =>(
                                <div key={ticket._id} className='ticket'>
                                  {ticket.title}
                                </div>
                              ))
                          )
                      }
                    </div>
                ))
            }
          </div>
      }


      <div>Under Development</div>
    </div>
  )
}