import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

let date = new Date();
date.setDate(date.getDate() + 1);
// let defaultDue = date.toISOString().slice(0,16);

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    }
  }

  handleChange = (e) => {
    const field = e.target.taskItem;
    const value = e.target.value;
    const formData = this.state.formData;
    console.log(field, value, formData);
    formData[field] = value;
    this.setState({ formData });
    console.log(formData[field], value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = this.state.formData;
    const taskItem = e.target.taskItem.value;
    const taskDueDate = e.target.taskDueDate.value;
   console.log(taskDueDate)
  
    formData["task"] = taskItem;

    if (taskDueDate !== ''){
      formData["dueDate"] = taskDueDate;
    }

    formData["completed"] =false;
  
    console.log(formData);
    this.props.handleAddTask(formData);
    e.target.reset();
    this.setState({ formData:{} });
  }


  render() {
    return (
      <Form className='border border-2 p-2 rounded-1' onSubmit={this.handleSubmit}>
        <Form.Control placeholder="Create New Tasks" aria-label="Task Item" name="taskItem"></Form.Control>
        <InputGroup>
          <InputGroup.Text onChange={this.handleChange}>Due <span className="small fst-italic"> (optional)</span></InputGroup.Text>
          <input id="addTask" type="datetime-local" className="form-control" placeholder="Task Due Date" aria-label="Task Due Date" name="taskDueDate" onChange={this.handleChange}/>
          <button className="btn btn-outline-success" type="submit"><PlusLg /> Add</button>
        </InputGroup>
      </Form>
    );
  }
}

export default AddTask;