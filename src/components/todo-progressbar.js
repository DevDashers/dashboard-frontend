import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class TaskProgress extends Component {
    render() { 
        return (  
        <div className='my-3 p-3 border border-2'>
            <p className='mb-2'>Task Progress ({this.props.completedCount}/{this.props.totalCount})</p>
            <ProgressBar striped now={this.props.progress} label={`${this.props.progress}%`} />
        </div>
        );
    }
}
 
export default TaskProgress;