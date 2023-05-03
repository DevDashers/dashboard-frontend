import React from 'react';
import ToDo from './todo';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

class Main extends React.Component {

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
                <Container className='flex-grow-1'>
                    <Row>
                        <Col>
                            <ToDo 
                                addTodoTask={this.addTodoTask}
                                getTodoList={this.getTodoList}
                                deleteTodoTask={this.deleteTodoTask}
                                totalTasks={this.state.totalTasks}
                                todoList={this.state.todoList}
                                handleEdit={this.handleEdit}
                            />
                        </Col>
                        <Col>
                            <Meme />
                            <Calendar 
                                todoList={this.state.todoList}
                            />
                            <Resources />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Main;