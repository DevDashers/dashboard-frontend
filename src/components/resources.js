import '../Accordion.css'
import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import Button from 'react-bootstrap/Button';
import ResourceModal from './resourceModal';
import { ListGroup, ButtonGroup } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import UpdateResModal from './updateResModal';
import { withAuth0 } from '@auth0/auth0-react';
import resImg from '../resources.png';
// import { ListGroup } from 'react-bootstrap';

class Resources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            title: '',
            description: '',
            url: '',
            resToBeUpdated: null,
            showModal: false,
            showUpdateModal: false
        }
    }

    getResources = async () => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/resources'
            }

            let resourcesData = await axios(config);

            this.setState({
                resources: resourcesData.data
            });
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let resourceObj = {
            title: e.target.resTitle.value,
            description: e.target.resDesc.value,
            url: e.target.resUrl.value,
        }
        this.postResource(resourceObj);
    }

    handleModalShow = () => {
        this.setState({
            showModal: true
        })
    }

    handleModalClose = () => {
        this.setState({
            showModal: false
        })
    }

    postResource = async (resourceObj) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'post',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/resources',
                data: resourceObj
            }

            let postResource = await axios(config);

            this.setState({
                resources: [...this.state.resources, postResource.data]
            })
        }
    }

    deleteResource = async (resourceId) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'delete',
                baseURL: process.env.REACT_APP_SERVER,
                url: `/resources/${resourceId}`,
            }

            await axios(config);

            let updatedResources = this.state.resources.filter(item => item._id !== resourceId._id);

            console.log(resourceId);
            this.setState({
                resources: updatedResources
            });

            this.getResources();
        }
    }

    updateResource = async (resource) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'put',
                baseURL: process.env.REACT_APP_SERVER,
                url: `/resources/${resource._id}`,
                data: resource,
            }

            let updatedResources = await axios(config);

            let updatedResArray = this.state.resources.map(existingRes => {
                return existingRes._id === resource._id
                    ? updatedResources.data
                    : existingRes
            });

            this.setState({
                resources: updatedResArray
            })
        }
    }


    updateResOpenModal = (resource) => {
        this.setState({
            showUpdateModal: true,
            resToBeUpdated: resource
        })
    }

    updateResCloseModal = () => {
        this.setState({
            showUpdateModal: false
        })
    }

    componentDidMount() {
        this.getResources();
    }



    render() {
        return (
            <>
                <Accordion className="mt-5 p-1" defaultActiveKey="0" >
                    <AccordionHeader >
                        <img src={resImg} alt="resource book" height={65} />
                        <h2>Resources</h2>
                    </AccordionHeader>
                    <AccordionItem eventKey="">
                        <AccordionBody >
                            <ListGroup id="AccBox">
                                {this.state.resources.map((resource, index) => (
                                    <div key={index}>
                                        <ListGroup.Item>

                                            <div className="d-flex justify-content-between align-items-center fw-bold"> {resource.title}
                                                <ButtonGroup >
                                                    <Button title="Delete" variant="outline-danger" size="sm" onClick={() => this.deleteResource(resource._id)} >
                                                        <Trash3 />
                                                    </Button>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => this.updateResOpenModal(resource)} title="Edit">
                                                        <PencilSquare />
                                                    </Button>

                                                </ButtonGroup>
                                            </div>
                                            <hr></hr>
                                            {resource.description && <div className="accDesc">{resource.description}</div>}
                                            {resource.description && <hr />}
                                            <div>
                                                <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.url}</a>
                                            </div>
                                        </ListGroup.Item>

                                    </div>
                                ))}
                                <ListGroup.Item>
                                    <Button variant="secondary" onClick={() => this.handleModalShow()}>Add Resource </Button>

                                </ListGroup.Item>


                            </ListGroup>
                        </AccordionBody>
                    </AccordionItem>


                </Accordion>
                <ResourceModal
                    showModal={this.state.showModal}
                    handleModalClose={() => this.handleModalClose()}
                    handleSubmit={this.handleSubmit}
                />
                <UpdateResModal
                    updateResource={this.updateResource}
                    show={this.state.showUpdateModal}
                    closeModal={this.updateResCloseModal}
                    resToBeUpdated={this.state.resToBeUpdated}
                // resources={this.state.resources}
                // id={this.state.resources._id}
                // vid={this.state.resources.__v}

                />
            </>
        )
    }
}

export default withAuth0(Resources);