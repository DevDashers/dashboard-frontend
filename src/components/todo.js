import React, { Component } from 'react';
import axios from 'axios';
import TaskProgress from './todo-progressbar';
import { withAuth0 } from "@auth0/auth0-react";


// const SERVER = process.env.REACT_APP_SERVER;

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      taskCompleted: 0,
      totalTasks: 0
    }
  }

  // getTodoList = async (req, res, next) => {
  //   try {
  //     let url = `${SERVER}/todo`;
  //     let todoListData = await axios.get(url);

  //     this.setState({
  //       todoList: todoListData.data,
  //       totalTasks: todoListData.data.length
  //     })

  //     res.status(200).send(todoListData)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // componentDidMount() {
  //   this.getTodoList();
  // }


 getTodoList = async () => {
    if(this.props.auth0.isAuthenticated){
      const res = await this.props.auth0.getIdTokenClaims();

      const jwt = res.__raw;
      
      // console.log('token:', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}`},
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/todo'
      }      
      
      let todoListData = await axios(config);
      this.setState({
        todoList: todoListData.data,
        totalTasks: todoListData.data.length   
      })
    }
  }

  componentDidMount() {
    this.getTodoList();
  }

  render() {
    return (
      <>
        <TaskProgress totalTasks={this.state.totalTasks} />
        {this.state.todoList.map(item => {
          return (
            <>
              <details key={item._id}>
                <summary>
                  {item.task}
                </summary>
                <p>{item.dueDate}</p>
                <p>{item.completed}</p>
              </details>
            </>
          )
        })}
      </>
    )
  }
}

export default withAuth0(ToDo);