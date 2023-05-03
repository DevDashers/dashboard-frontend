import React, { Component } from 'react';
import TaskProgress from './todo-progressbar';
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
    const completedCount = this.props.todoList.filter(item => item.completed).length;
    const totalCount = this.props.todoList.length;
    const progress = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
    return (
      <>
        <AddTask handleAddTask={this.props.addTodoTask} />
        <TaskProgress progress={progress} completedCount={completedCount} totalCount={totalCount} />
        <ListGroup>
          {this.props.todoList.map(item => {
            const dueDate = new Date(item.dueDate);
            const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const formattedTime = dueDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
            return (
              <div key={item._id}>
                <ListGroup.Item>
                { item.dueDate ? <p className='text-start text-secondary small mb-2 '>Due {formattedDate} at {formattedTime}</p> : <></>  }

                  <div className='d-flex align-item-center justify-content-between'>
                    <div>
                      <input className="form-check-input me-1" type="checkbox" checked={item.completed} onChange={(e) => this.handleCheckBoxClick(e, item._id, item.__v)} />
                      <label className='form-check-label'>{item.task}</label>
                    </div>
                    <ButtonGroup>
                      <Button variant="outline-secondary" size="sm" onClick={() => this.handleUpdateModalShow(item._id)}>
                        <PencilSquare />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => this.props.deleteTodoTask(item._id)}>
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
      </>
    )
  }
}

export default ToDo;