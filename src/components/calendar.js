import React from 'react';
// import axios from 'axios'; 
import { ListGroup } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

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
        let timeFormat = this.props.todoList.map(item => {
            const dueDate = new Date(item.dueDate);
            const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const formattedTime = dueDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
            return `${formattedDate} at ${formattedTime}`
        });
        return(
            <>
            <h3>Calendar Here</h3>
            <ListGroup>
            {
                this.props.todoList.filter(task => task.completed !== true && (task.dueDate !== '' || null)).map((taskInfo, i) => {
                    if(taskInfo.dueDate){
                       return <ListGroup.Item>
                            {taskInfo.task} due on {timeFormat[i]}
                        </ListGroup.Item>
                   }
                    return <></>    
                }) 
            }
            </ListGroup>
            </>
        )
    }
}
// .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
// .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });


export default withAuth0(Calendar);