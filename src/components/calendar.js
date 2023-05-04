import React from 'react';
// import axios from 'axios'; 
import { ListGroup } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import reminder from '../reminder.png'

class Calendar extends React.Component {

    render() {
        let todoList = this.props.todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return (
            <div className='border border-2 p-2 bg-white'>
                <h3 className='text-center'><img src={reminder} alt='' height={100}></img>Upcoming To-Dos!</h3>
                <ListGroup className='list-group-flush text-start list-group-numbered border border-2'>
                    {
                        todoList.filter(task => task.completed !== true && (task.dueDate !== '' || null)).map((taskInfo, i) => {
                            const dueDate = new Date(taskInfo.dueDate);
                            const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            const formattedTime = dueDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
                            let timeFormat = `${formattedDate} at ${formattedTime}`
                            if (taskInfo.dueDate) {
                                return <ListGroup.Item>
                                    {taskInfo.task} due on <span className='fw-semibold'>{timeFormat}</span>
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