import React from 'react';
// import axios from 'axios'; 
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import reminder from '../reminder.png'

class Calendar extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         calendar: this.props.todoList,
    //         showCalendar: true,
    //     }
    // }

    // getCalendar = async () => {
    //     if(this.props.auth0.isAuthenticated){
    //         const res = await this.props.auth0.getIdTokenClaims();

    //         const jwt = res.__raw;

    //         const config = {
    //             headers: { "Authorization": `Bearer ${jwt}`},
    //             method: 'get',
    //             baseURL: process.env.REACT_APP_SERVER,
    //             url: '/calendar'
    //         }

    //         let calendarData = await axios(config)
    //         // let calendarData = await this.props.todoList;
    //         // console.log(calendarData);

    //         this.setState({
    //             calendar: calendarData.data,
    //             showCalendar: true,
    //         })
    //     }
    // }

    // componentDidMount() {
    //         this.getCalendar();
    // }


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
                            
                            if (taskInfo.dueDate) {
                                return <ListGroupItem>
                                    {taskInfo.task} due on <span className='fw-semibold'>{formattedDate} at {formattedTime}</span>
                                </ListGroupItem>
                            }
                            return <></>
                        })
                    }
                </ListGroup>
            </div>
        )
    }
}
// .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
// .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });


export default withAuth0(Calendar);