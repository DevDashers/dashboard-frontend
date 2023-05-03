import React from 'react';
import ToDo from './todo';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            taskCompleted: 0,
            totalTasks: 0,
            taskId: '',
            showModal: false
            
        }
    }


    getTodoList = async () => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
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
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
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

    updateTodoTask = async (taskToUpdate) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;
    
            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'put',
                baseURL: process.env.REACT_APP_SERVER,
                url: `/todo/${taskToUpdate._id}`,
                data: taskToUpdate,
            }
            console.log(taskToUpdate);
    
            let updatedTaskList = await axios(config);
    
            let updatedListArray = this.state.todoList.map(existingTask => {
                return existingTask._id === taskToUpdate._id
                    ? updatedTaskList.data
                    : existingTask
            });
    
            this.setState({
                todoList: updatedListArray
            })
        }
    }
    


    handleModalShow = (taskToUpdate) => {
        this.setState({
            showModal: true,
            taskID: taskToUpdate._id
        })
    }

    handleModalClose = () => {
        this.setState({
            showModal: false
        })
    }

    deleteTodoTask = async (taskToDelete) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'delete',
                baseURL: process.env.REACT_APP_SERVER,
                url: `/todo/${taskToDelete}`,
            }

            await axios(config);

            let updatedList = this.state.todoList.filter(item => item._id !== taskToDelete._id);

            console.log(updatedList);
            this.setState({
                todoList: updatedList
            });

            this.getTodoList();
        }
    }

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
                                showModal={this.state.showModal}
                                handleModalClose={this.handleModalClose}
                                handleModalShow={this.handleModalShow}
                                updateTodoTask={this.updateTodoTask}
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