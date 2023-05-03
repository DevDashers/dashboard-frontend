import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class TaskProgress extends Component {
    render() {
        return (
            <div className='my-3 px-2 py-3 border border-2 rounded-1'>
                <p className='mb-2'>Task Progress <span className="small">({this.props.completedCount}/{this.props.totalCount})</span></p>
                <ProgressBar striped now={this.props.progress} label={`${this.props.progress}%`} />
            </div>
        );
    }
}

export default TaskProgress;