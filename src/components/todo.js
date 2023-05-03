import React, { Component } from 'react';
import axios from 'axios';
import TaskProgress from './todo-progressbar';
import { ListGroup,Button, ButtonGroup } from 'react-bootstrap';
import AddTask from './addTask';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';

const SERVER = process.env.REACT_APP_SERVER;



class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      taskCompleted: 0,
      totalTasks: 0,
      isEditing: false,
      taskId: '',
      readOnly: true
    }
  }
  
  getTodoList = async (req, res, next) => {
      let url = `${SERVER}/todo`;
      let dataFromAPI = await axios.get(url);
      let todoTasks = dataFromAPI.data;


      this.setState({
        todoList: todoTasks,
        totalTasks: todoTasks.length
      })
  }

  addTodoTask = async (task, next) => {
    try {
      let url = `${SERVER}/todo`;
      await axios.post(url, task);
      this.getTodoList();
    } catch (error) {
      console.log(error)
    }
  }
  
  deleteTodoTask = async (taskToDelete)=>{
    let url = `${SERVER}/todo/${taskToDelete}`;
    try {
      await axios.delete(url);
      

     // console.log('token:', jwt);

    // const config = {
    //   headers: { "Authorization": `Bearer ${jwt}`},
    //   method: 'get',
    //   baseURL: process.env.REACT_APP_SERVER,
    //    url: '/todo'
    //  }      

      let updatedList = this.state.todoList.filter(item => item._id !== taskToDelete._id);
      console.log('Task Deleted Succesfully')

      
      this.setState({ 
        todoList: updatedList 
      });

      this.getTodoList();
    } catch (error) {
      console.log(error.message)
    }
  }

  handleEdit = (itemId) => {
    this.setState({
      isEditing: true,
      taskId: itemId,
      readOnly: false
    });
  };

  componentDidMount() {
    this.getTodoList();
  }


  render() {
    return (
      <>
      <AddTask handleAddTask={this.addTodoTask}/>
        <TaskProgress totalTasks={this.state.totalTasks} />
        <ListGroup>
          {this.state.todoList.map(item => {
            return (
              <ListGroup.Item key={item._id}>
                  <div className='d-flex align-item-center justify-content-between'>
                    <div>
                      <input className="form-check-input me-1" type="checkbox" value={item.completed} />
                      <label className='form-check-label'>{item.task}</label>
                    </div>
                    <ButtonGroup>
                      <Button variant="outline-secondary" size="sm"><PencilSquare/></Button>
                      <Button variant="outline-danger" size="sm" onClick={()=> this.deleteTodoTask(item._id)}><Trash3/></Button>
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