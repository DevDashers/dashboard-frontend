import React, { Component } from 'react';
import { axios } from ('axios');

const SERVER = process.env.REACT_APP_SERVER;

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }
  }

  getTodoList = async (req, res, next) => {
    try {
      let url = `${SERVER}/todo`;
      let todoListData = await axios.get(url);

      this.setState({
        todoList: todoListData.data
      })

      res.status(200).send(todoListData)

    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getTodoList();
  }
  render() {
    return (
      <>
        {this.state.todoList.map(item =>{
          return(
            <div key={item._id}>
              <p>{item.task}</p>
              <p>{item.dueDate}</p>
              <p>{item.completed}</p>
            </div>
          )
        })}
      </>
    )
  }
}

export default ToDo;