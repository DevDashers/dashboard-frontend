import React, { Component } from 'react';
import { Col, Image, ProgressBar } from 'react-bootstrap';
import Weather from './weather';

class DashboardCards extends Component {
  render() {
    return (
      <>
        <div className='bg-dark mb-2' style={{ border: '4px solid #84d9ec' }}>
          <Col className='px-4 py-2 rounded-3 text-center ms-0 align-self-stretch'>
            <Weather />
          </Col>
        </div>
        <div className='bg-dark mb-2 d-none d-lg-block' style={{ border: '4px solid #91f963' }}>

          <div className='fs-6 fw-bold text-center p-4 '>
            <p className='mb-2'>{this.props.progress}% of Tasks Completed</p>
            <ProgressBar variant='success' animated striped now={this.props.progress} />
          </div>
          <hr className='mx-auto' style={{width: '90%'}}/>
          <div className='d-flex flex-row justify-content-evenly text-center'>
            <div className='col-6 p-4 rounded-3 me-2'>
              <Image fluid src="../../clipboard-icon.png" roundedCircle width={45} />
              <span className='d-block fs-6 fw-bold'>Completed</span>
              <span className='d-block fs-6 fw-bolder'>{this.props.completedCount}</span>
            </div>
            <div className='col-6 p-4 rounded-3 me-2'>
              <Image fluid src="../../clipboard-icon.png" roundedCircle width={45} />
              <span className='d-block fs-6 fw-bold'>Total</span>
              <span className='d-block fs-6 fw-bolder'>{this.props.totalCount}</span>
            </div>
          </div>

        </div>

      </>
    );
  }
}

export default DashboardCards;