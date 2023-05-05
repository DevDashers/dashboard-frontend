import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

class UpdateTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      dueDate: this.props.dueDate,
      id: this.props.itemID,
      vId: this.props.vId,
    }
  }
  handleTaskSubmit = (event) => {
    event.preventDefault();

    let taskToUpdate = {
      task: this.state.task,
      dueDate: this.state.dueDate,
      _id: this.props.itemID,
      __v: this.props.vId
    }

    this.props.updateTodoTask(taskToUpdate)
    this.props.handleModalClose();
  }

  setTask = (event) => (
    this.setState({
      task: event.target.value,
    })
  )
  setDate = (event) => (
    this.setState({
      dueDate: event.target.value,
    })
  )


  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.showModal}
        onHide={this.props.handleModalClose}
      >
        <Form className='text-bg-secondary' onSubmit={this.handleTaskSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               <img src="https://img.icons8.com/?size=512&id=114415&format=png" width={60} alt='edit list icon'/> Updating Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="task">
              <Form.Label>Task</Form.Label>
              <Form.Control type="text" onChange={this.setTask} defaultValue={this.props.task} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="datetime-local" onChange={this.setDate} defaultValue={this.props.dueDate} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='dark' onClick={this.props.handleModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
};
export default UpdateTodoForm;