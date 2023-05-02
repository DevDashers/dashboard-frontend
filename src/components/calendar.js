import React from 'react';
import axios from 'axios';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendar: [],
            showCalendar: false,
        }
    }

    getCalendar = async (request, response, next) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/calendar`
            let calendarData = await axios.get(url)
            console.log(calendarData.data)
            this.setState({
                calendar: calendarData.data,
                showCalendar: true,
            })

            // response.status(200).send(memeData.data)
        } catch (error) {
            next(error)

            this.setState({
                showCalendar: false,
                calendar: [],
            })
        }
    }

    componentDidMount() {
        this.getCalendar();
      }

      render(){
        return(
            <>
            <ul>
            {
                this.state.calendar.map(taskInfo => 
                   <li>{taskInfo.task} due on {Date(taskInfo.dueDate)}</li>)
            }
            </ul>
            </>
        )
    }
}

export default Calendar;