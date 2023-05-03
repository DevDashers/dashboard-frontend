import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';



class UpdateResModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.resToBeUpdated?.title,
      description: this.props.resToBeUpdated?.description,
      url: this.props.resToBeUpdated?.url,
      _id: this.props.resToBeUpdated?._id,
      __v: this.props.resToBeUpdated?.__v
    }
  }

  handleUpdateSubmit = (event) => {
    event.preventDefault();

    let resToUpdate = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      _id: this.props.resToBeUpdated?._id,
      __v: this.props.resToBeUpdated?.__v
    }
    this.props.updateResource(resToUpdate);
    this.props.closeModal();
  }

  setTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  setDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  setUrl = (event) => {
    this.setState({
      url: event.target.value
    })
  }


  render() { 
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
          <Form.Control type="name" placeholder="Enter Resource Title" onChange={this.setTitle}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="name" placeholder="Enter Resource Description" onChange={this.setDescription}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="url">
        <Form.Label>URL</Form.Label>
          <Form.Control type="name" placeholder="Resource URL" onChange={this.setUrl}/>
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