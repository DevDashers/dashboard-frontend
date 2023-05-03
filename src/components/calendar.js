import React from 'react';
// import axios from 'axios';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendar: this.props.todoList,
            showCalendar: true,
        }
    }

    getCalendar = async (request, response, next) => {
        try {
            // let url = `${process.env.REACT_APP_SERVER}/calendar`
            // let calendarData = await axios.get(url)
            let calendarData = await this.props.todoList;
            console.log(calendarData);
            this.setState({
                calendar: calendarData,
                showCalendar: true,
            })

            // response.status(200).send(memeData.data)
        } catch (error) {
            next(error)

            this.setState({
                showCalendar: true,
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