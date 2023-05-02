import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class TaskProgress extends Component {
    render() { 
        return (  
        <div className='my-3 p-3 border border-2'>
            <p className='mb-2'>Task Progress</p>
            <ProgressBar striped now={this.props.totalTasks} label={`${this.props.totalTasks}%`} />
        </div>
        );
    }
}
 
export default TaskProgress;