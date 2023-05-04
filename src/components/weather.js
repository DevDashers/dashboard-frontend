import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Image } from 'react-bootstrap';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: [],
            weatherlastUpdated: '',
            key: ''
        }
    }

    getWeatherData = async () => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/weather'
            }

            let weatherData = await axios(config)
            console.log('>>>',weatherData)

            this.setState({
                weatherData: weatherData.data[0],
                weatherlastUpdated: weatherData.data[1],
                key: weatherData.data[1]
            })
        }
    }

    componentDidMount() {
        this.getWeatherData();
    }


    render() {
        let weather = this.state.weatherData;
        return (
                <Card className='col px-2 py-1 border-0'>
                    <Card.Body className='p-0 mb-2'>
                        <div className='d-flex flex-column flex-md-row align-items-center justify-content-around'>
                                <Image src={weather.icons} alt='weather icon' />
                            <div className='ms-3'>
                                <span className='d-block'>{weather.city} </span>
                                <span className='d-block'>{weather.description}</span>
                                <span className='d-block'> {weather.tempF}{'\u00b0'} F</span>
                                <span className='d-block' style={{ fontSize: '.7rem' }}>Feels like {weather.feelsLikeF}{'\u00b0'} F</span>
                            </div>
                        </div>
                    </Card.Body>
                    <span className='text-center' style={{ fontSize: '.6rem' }}>Last Updated {weather.lastUpdated}</span>
                    <span className='text-center' style={{ fontSize: '.6rem' }}>Weather based on IP Address</span>
                </Card>

        )
    }
}
// .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
// .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });


export default withAuth0(Weather);