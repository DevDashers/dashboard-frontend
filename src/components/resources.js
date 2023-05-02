import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

class Resources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
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

    componentDidMount() {
        this.getResources();
    }

    render() {
        return (
            <>
                <Accordion>
                    <AccordionHeader> <h2>Resources</h2> </AccordionHeader>
                    <AccordionItem eventKey=''>
                        <AccordionBody>
                            {this.state.resources.map((resource, index) => (
                                <li key={index}>{resource.title}: {resource.description}
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.url}</a>
                                </li>
                            ))}
                        </AccordionBody>
                    </AccordionItem>


                </Accordion>
            </>
        )
    }
}

export default Resources;