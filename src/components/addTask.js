import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

let date = new Date();
date.setDate(date.getDate() + 1);
let defaultDue = date.toISOString().slice(0, 10);

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
  
    formData["task"] = taskItem;
    formData["dueDate"] = taskDueDate;
    formData["completed"] =false;
  
    console.log(formData);
    this.props.handleAddTask(formData);
    e.target.reset();
  }


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Control placeholder="Create New Tasks" aria-label="Task Item" name="taskItem"></Form.Control>
        <InputGroup>
          <InputGroup.Text onChange={this.handleChange}>Task Due (optional)</InputGroup.Text>
          <input id="addTask" type="date" value={defaultDue} className="form-control" placeholder="Task Due Date" aria-label="Task Due Date" name="taskDueDate" onChange={this.handleChange}/>
          <button className="btn btn-outline-success" type="submit"><PlusLg /> Add</button>
        </InputGroup>
      </Form>
    );
  }
}

export default AddTask;