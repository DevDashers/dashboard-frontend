import React, { Component } from 'react';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import AddTask from './addTask';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import UpdateTodoForm from './updateTodoForm';


class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateModal: false,
      completed: this.props.todoList.completed,
      taskToBeUpdated: ''
    }
  }

  handleUpdateModalShow = (id) => {
    this.setState({
      showUpdateModal: true,
      taskToBeUpdated: id,
    })
  }

  handleUpdateModalClose = () => {
    this.setState({
      showUpdateModal: false
    })
  }

  handleCheckBoxClick = (e, id, vId) => {
    let taskToUpdate = {
      completed: e.target.checked,
      _id: id,
      __v: vId
    }

    this.props.updateTodoTask(taskToUpdate)
  }

  setCompleted = (event) => (
    this.setState({
      completed: event.target.checked,
    })
  )

  render() {
    return (
      <div className="p-2 bg-dark" style={{border: '4px solid #fd01ba'}}>
        <h3 className='mb-0'><img src='https://img.icons8.com/?size=512&id=121624&format=png' alt='todo list icon' width={65}/> ToDo List</h3>
        <hr />

        <AddTask handleAddTask={this.props.addTodoTask} />
        <ListGroup className='border border-2 border-bottom-0 rounded-1'>
          {this.props.todoList.map(item => {
            const dueDate = new Date(item.dueDate);
            const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const formattedTime = dueDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
            return (
              <div key={item._id}>
                <ListGroup.Item className='p-2 border-0 border-bottom'>
                  {item.dueDate ? <p className='text-start small mb-2 '>Due {formattedDate} at {formattedTime}</p> : <></>}

                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex flex-row align-items-start'>
                      <input className="flex-shrink-0 form-check-input me-1" type="checkbox" checked={item.completed} onChange={(e) => this.handleCheckBoxClick(e, item._id, item.__v)} />
                      <label className='form-check-label text-wrap'>{item.task}</label>
                    </div>
                    <ButtonGroup className='flex-shrink-0 align-items-start'>
                      <Button variant="secondary" size="sm" title="Edit" onClick={() => this.handleUpdateModalShow(item._id)}>
                        <PencilSquare />
                      </Button>
                      <Button variant="danger" size="sm" title="Delete" onClick={() => this.props.deleteTodoTask(item._id)}>
                        <Trash3 />
                      </Button>
                    </ButtonGroup>
                  </div>
                </ListGroup.Item>
                <UpdateTodoForm
                  todoList={item}
                  vId={item.__v}
                  itemID={item._id}
                  task={item.task}
                  completed={item.completed}
                  dueDate={item.dueDate}
                  showModal={this.state.taskToBeUpdated === item._id && this.state.showUpdateModal}
                  updateTodoTask={this.props.updateTodoTask}
                  taskToBeUpdated={this.props.taskToBeUpdated}
                  handleModalClose={this.handleUpdateModalClose}
                />
              </div>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default ToDo;