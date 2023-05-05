import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';


class ResourceModal extends Component {
  state = {  } 
  render() { 
    return (
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={this.props.showModal}
      onHide={this.props.handleModalClose}
    >
      <Form className='text-bg-secondary' onSubmit={this.props.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add A Resource
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="resTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="name" placeholder="Enter Resource Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="resDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control type="name" placeholder="Enter Resource Description" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="resUrl">
        <Form.Label>URL</Form.Label>
          <Form.Control type="name" placeholder="Resource URL" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={this.props.handleModalClose}>
          Submit
        </Button>
        <Button onClick={this.props.handleModalClose}>Close</Button>
      </Modal.Footer>
      </Form>
    </Modal>
    );
  }
}
 
export default ResourceModal;