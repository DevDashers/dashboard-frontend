import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

class UpdateTodoForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            task: this.props.task,
            dueDate: this.props.dueDate,
            completed: this.props.completed,
            id: this.props.itemID,
            vId: this.props.vId,
        }
    }
    handleTaskSubmit = (event) => {
        event.preventDefault();
        console.log('>>> task', this.props.task)
        console.log('>>> e.target', event.target)
        console.log('>>> e.target', event.target.task)
        console.log('>>> e.target', event.target.dueDate)
        console.log('>>> e.target', event.target.completed.checked)

        let taskToUpdate = {
            task: this.state.task,
            dueDate: this.state.dueDate,
            completed: this.state.completed,
            _id: this.props.itemID,
            __v: this.props.vId
          }
          
          this.setState({
            task: '',
            dueDate: '',
            completed: false,
          });
        console.log('>>>', taskToUpdate)

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
    setCompleted = (event) => (
        this.setState({
            completed: event.target.value,
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
                <Form onSubmit={this.handleTaskSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="task">
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" onChange={this.setTask} defaultValue={this.props.task} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" onChange={this.setDate} defaultValue={this.props.dueDate} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="completed">
                            <Form.Label>Completed</Form.Label>
                            <Form.Check type="checkbox" checked={this.state.completed} onChange={this.setCompleted} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button onClick={()=>console.log(this.props.itemID)}>Close</Button>
                        {/* <Button onClick={this.props.handleModalClose}>Close</Button> */}
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
};
export default UpdateTodoForm;