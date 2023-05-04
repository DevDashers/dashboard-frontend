import React, { Component } from 'react';
import { Container, Col, ProgressBar, Row, Image } from 'react-bootstrap';

class TaskProgress extends Component {
  render() {
    return (
      <>
        {/* <div className='my-3 px-2 py-3 border border-2 rounded-1'>
          <p className='mb-2'>Task Progress <span className="small">({this.props.completedCount}/{this.props.totalCount})</span></p>
          <ProgressBar striped now={this.props.progress} label={`${this.props.progress}%`} />
        </div> */}
        <Container className='my-3 border-bottom border-2 pb-3'>
          <Row xs={1} className='g-2'>
            <Col md className='border border-3 border-success p-4 pb-2 rounded-3 text-center me-2'>
              <div className='mb-2'>
                <span className='bg-white p-3 rounded-circle'>
                <Image fluid src="../../clipboard-icon.png" roundedCircle width={45}/>
                </span>
              </div>
              <span className='d-block fs-6 fw-bold'>Completed</span>
              <span className='d-block fs-6 fw-bolder'>{this.props.completedCount}</span>
            </Col>
            <Col md className='border border-3 border-info p-4 pb-2 rounded-3 text-center ms-0'>
              <div className=''>
                <span className='bg-white p-3 rounded-circle'>
                  <Image fluid src="../../clipboard-icon.png" roundedCircle width={45}/>
                </span>
              </div>
              <span className='d-block fs-6 fw-bold'>Total Tasks</span>
              <span className='d-block fs-6 fw-bolder'>{this.props.totalCount}</span>
            </Col>

            <Col md={12} className='border border-3 border-secondary fs-6 fw-bold p-4 pb-2 rounded-3 text-center'>
                <p className='mb-2'>{this.props.progress}% of Tasks Completed</p>
                <ProgressBar animated striped now={this.props.progress} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TaskProgress;