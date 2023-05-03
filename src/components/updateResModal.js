import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';


class UpdateResModal extends Component {
  
  handleUpdateSubmit = (event) => {
    event.preventDefault();

  let resToUpdate = {
    title: event.target.title.value,
    description: event.target.description.value,
    url: event.target.url.value,
    _id: this.props.resToBeUpdated?._id,
    __v: this.props.resToBeUpdated?.__v
  }
  this.props.updateResource(resToUpdate);
  this.props.closeModal();
}


render() {
  const { resToBeUpdated } = this.props;
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={this.props.show}
      onHide={this.props.closeModal}
    >
      <Form onSubmit={this.handleUpdateSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Resource
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="name" placeholder="Enter Resource Title" defaultValue={resToBeUpdated?.title} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="name" placeholder="Enter Resource Description" defaultValue={resToBeUpdated?.description} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="url">
          <Form.Label>URL</Form.Label>
            <Form.Control type="name" placeholder="Resource URL" defaultValue={resToBeUpdated?.url} />
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
 
export default UpdateResModal;