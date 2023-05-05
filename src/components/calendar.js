import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import reminder from '../reminder.png'

class Calendar extends React.Component {

    render() {
        let todoList = this.props.todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return (
            <div  className='p-2 bg-dark' style={{border: '4px solid #617fd2'}}>
                <h3 className='text-center'><img src={reminder} alt='' height={65}></img>Upcoming To-Dos!</h3>
                <ListGroup className='list-group-flush text-start list-group-numbered' style={{border: '1px solid'}}>
                    {
                        todoList.filter(task => task.completed !== true && (task.dueDate !== '' || null)).map((taskInfo, i) => {
                            const dueDate = new Date(taskInfo.dueDate);
                            const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            const formattedTime = dueDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
                            let timeFormat = `${formattedDate} at ${formattedTime}`
                            if (taskInfo.dueDate) {
                                return <ListGroup.Item key={taskInfo._id} style={{border: '1px solid'}} >
                                    <span className='fw-semibold' style={{ color: 'lightblue' }} >{taskInfo.task}</span> due on <span className='fw-semibold' style={{ color: 'yellow' }}>{timeFormat}</span>
                                </ListGroup.Item>
                            }
                            return <></>
                        })
                    }
                    
                </ListGroup>
            </div>
        )
    }
}

export default withAuth0(Calendar);