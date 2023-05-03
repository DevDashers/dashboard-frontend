import React from 'react';
import ToDo from './todo';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

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
    

    getTodoList = async () => {
        if(this.props.auth0.isAuthenticated){
            const res = await this.props.auth0.getIdTokenClaims();
    
            const jwt = res.__raw;
    
            const config = {
                headers: { "Authorization": `Bearer ${jwt}`},
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/todo'
            }      
          
            let todoTasks = await axios(config);

            this.setState({
                todoList: todoTasks.data,
                totalTasks: todoTasks.data.length   
            })
        }
    }


    addTodoTask = async (task) => {
        if(this.props.auth0.isAuthenticated){
            const res = await this.props.auth0.getIdTokenClaims();
        
            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}`},
                method: 'post',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/todo',
                data: task
            }
            
            let createdTodo = await axios(config);

            this.setState({
                todoList: [...this.state.todoList, createdTodo.data]
            })
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

export default withAuth0(Main);