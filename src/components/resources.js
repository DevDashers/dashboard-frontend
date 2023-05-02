import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import Button from 'react-bootstrap/Button';
import ResourceModal from './resourceModal';
// import { ListGroup } from 'react-bootstrap';

class Resources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            title: '',
            description: '',
            url: '',
            showModal: false
        }
    }

    getResources = async (request, response, next) => {
        try {
            const resourcesData = await axios.get(`${process.env.REACT_APP_SERVER}/resources`);
            console.log(resourcesData);

            this.setState({ resources: resourcesData.data });

            response.status(200).send(resourcesData)
        } catch (error) {
            console.error(error);
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
        try {
            let url = `${process.env.REACT_APP_SERVER}/resources`;

            let postResource = await axios.post(url, resourceObj);

            this.setState({
                resources: [...this.state.resources, postResource.data]
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    deleteResource = async (resourceId) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/resources/${resourceId}`;

            await axios.delete(url);

            let updatedResources = this.state.resources.filter(resource => resource._id !== resourceId);
            console.log(resourceId);

            this.setState({
                resources: updatedResources
            })

        } catch (error) {
            console.log(error);
        }
    }

    updateResource = async (resourceToUpdate) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/resources/${resourceToUpdate._id}`

            let updatedResources = await axios.put(url, resourceToUpdate);

            let updatedResArray = this.state.resources.map(existingRes => {
                return existingRes._id === resourceToUpdate._id
                ? updatedResources.data
                : existingRes
            });

            this.setState({
                resources: updatedResArray
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        this.getResources();
    }



    render() {
        return (
            <>
                <Accordion defaultActiveKey="0" flush>
                    <AccordionHeader> <h2>Resources</h2> </AccordionHeader>
                    <AccordionItem eventKey=''>
                        <AccordionBody>
                            {this.state.resources.map((resource, index) => (
                                <ul className="list-group" key={index}>
                                    <li className="list-group-item d-flex justify-content-between align-items-center"> {resource.title}:
                                        <button onClick={() => this.deleteResource(resource._id)}className="badge bg-dark rounded-pill">Delete</button>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        {resource.description}
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.url}</a>

                                    </li>

                                </ul>
                            ))}
                            <Button onClick={() => this.handleModalShow()}>Add Resource </Button>
                        </AccordionBody>
                    </AccordionItem>


                </Accordion>
                <ResourceModal
                    showModal={this.state.showModal}
                    handleModalClose={() => this.handleModalClose()}
                    handleSubmit={this.handleSubmit}
                />
            </>
        )
    }
}

export default Resources;