import React, { Component } from 'react';
import TaskProgress from './todo-progressbar';
import { ListGroup,Button, ButtonGroup } from 'react-bootstrap';
import AddTask from './addTask';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';

class ToDo extends Component {
  
  render() {
    return (
      <>
      <AddTask handleAddTask={this.props.addTodoTask} />
        <TaskProgress totalTasks={this.props.totalTasks} />
        <ListGroup>
          {this.props.todoList.map(item => {
            return (
              <ListGroup.Item key={item._id}>
                  <div className='d-flex align-item-center justify-content-between'>
                    <div>
                      <input className="form-check-input me-1" type="checkbox" value={item.completed} />
                      <label className='form-check-label'>{item.task}</label>
                    </div>
                    <ButtonGroup>
                      <Button variant="outline-secondary" size="sm"><PencilSquare/></Button>
                      <Button variant="outline-danger" size="sm" onClick={()=> this.props.deleteTodoTask(item._id)}><Trash3/></Button>
                    </ButtonGroup>
                  </div>
                  <p className='text-start text-secondary fs'>Due {item.dueDate}</p>
              </ListGroup.Item>

            )
          })}
        </ListGroup>
      </>
    )
  }
}

export default ToDo;