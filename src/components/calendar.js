import React from 'react';
import axios from 'axios'; 
import { ListGroup } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendar: this.props.todoList,
            showCalendar: true,
        }
    }

    getCalendar = async () => {
        if(this.props.auth0.isAuthenticated){
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}`},
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/calendar'
            }
            
            let calendarData = await axios(config)
            // let calendarData = await this.props.todoList;

            console.log(calendarData);
            
            this.setState({
                calendar: calendarData.data,
                showCalendar: true,
                })
            }
        }
    
        componentDidMount() {
            this.getCalendar();
        }


      render() {
        return(
            <>
            <h3>Calendar Here</h3>
            <ListGroup>
            {
                this.state.calendar.map(taskInfo => 
                   <ListGroup.Item>{taskInfo.task} due on {Date(taskInfo.dueDate)}</ListGroup.Item>)
            }
            </ListGroup>
            </>
        )
    }

}

export default withAuth0(Calendar);