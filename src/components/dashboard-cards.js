import React, { Component } from 'react';
import { Col, Image, ProgressBar } from 'react-bootstrap';
import Weather from './weather';

class DashboardCards extends Component {
  render() {
    return (
      <>
        <div className='bg-white mb-2 border border-2'>
          <Col md className='px-4 py-2 rounded-3 text-center ms-0 align-self-stretch'>
            <Weather />
          </Col>
        </div>
        <div className='bg-white mb-2 border border-2'>

          <div className='fs-6 fw-bold text-center p-4'>
            <p className='mb-2'>{this.props.progress}% of Tasks Completed</p>
            <ProgressBar animated striped now={this.props.progress} />
          </div>

        </div>
        <div className='bg-white mb-2 border border-2'>

          <div className='d-flex flex-row justify-content-evenly'>
            <div md className='p-4 rounded-3 text-center me-2 align-self-stretch'>
              <Image fluid src="../../clipboard-icon.png" roundedCircle width={45} />
              <span className='d-block fs-6 fw-bold'>Completed</span>
              <span className='d-block fs-6 fw-bolder'>{this.props.completedCount}</span>
            </div>
            <div md className='p-4 rounded-3 text-center me-2 align-self-stretch'>
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