import React from 'react';
import ToDo from './todo';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import DashboardCards from './dashboard-cards';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            taskCompleted: 0,
            totalTasks: 0,
            taskId: '',
            showModal: false,
            taskToBeUpdated: ''
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
                todoList: updatedListArray,
                taskToBeUpdated: taskToUpdate
            })
        }
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
        const completedCount = this.state.todoList.filter(item => item.completed).length;
        const totalCount = this.state.todoList.length;
        const progress = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
        return (
            <>
                <Container className='flex-grow-1 my-3' fluid>

                    <Row>
                        <Col md className='order-last order-lg-first d-none d-lg-block' lg="3" xl="3">
                            <DashboardCards progress={progress} completedCount={completedCount} totalCount={totalCount} />
                            <Meme />
                        </Col>

                        <Col md="6" lg="5" xl="5">
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
                                taskToBeUpdated={this.state.taskToBeUpdated}
                                progress={progress}
                                completedCount={completedCount}
                                totalCount={totalCount}
                            />
                        </Col>
                        <Col md lg="4" xl="4">
                            <Calendar
                                todoList={this.state.todoList}
                            />
                            <Resources />
                            <div className='order-last order-lg-first d-block d-lg-none' >
                                <DashboardCards progress={progress} completedCount={completedCount} totalCount={totalCount} />
                                <Meme />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default withAuth0(Main);