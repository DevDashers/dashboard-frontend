import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';



class UpdateCityModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.city,
            id: this.props.id,
        }
    }

    handleUpdateSubmit = async (event) => {
        event.preventDefault();
        let apiKey = process.env.REACT_APP_LOCATIONIQ_API_KEY

        let api = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${this.state.city}&format=json`;
        let cityData = await axios.get(api);

        let cityToBeUpdate = {
            city: this.state.city.toUpperCase(),
            lat: cityData.data[0].lat,
            lon: cityData.data[0].lon,
            _id: this.props.id,
        }

        // let cityToBeUpdate = {
        //     city: this.state.city,
        // }
        this.props.updateCity(cityToBeUpdate);
        this.props.closeModal();

        console.log(cityToBeUpdate)
    }

    setCity = (e) => (
        this.setState({
            city: e.target.value
        })
    )


    render() {
        return (
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                show={this.props.showModal}
                onHide={this.props.closeModal}
                variant="dark"
                closeButton
            >
                <Form className="text-bg-secondary" onSubmit={this.handleUpdateSubmit}>
                    <Modal.Header closeButton>
                        Updating City {this.props.city}
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="name" placeholder="Enter A New City" onChange={this.setCity} defaultValue={this.state.city} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button onClick={this.props.closeModal}>Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default UpdateCityModal;