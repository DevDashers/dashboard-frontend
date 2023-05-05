import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Button, Card, Form, Image, InputGroup, Spinner } from 'react-bootstrap';
import { PencilFill, PlusLg } from 'react-bootstrap-icons';
import UpdateCityModal from './updateCityModal';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cityData: [],
            city: '',
            weatherInfo: [],
            cityDataFromDB: [],
            hasWeather: false,
            weatherlastUpdated: '',
            showModal: false,
            storedCityData: [],
            newCityData: {},
            loading: false

        }
    }

    handleInput = (e) => {
        e.preventDefault();
        this.setState({
            city: e.target.value,
        })
    }

    handleModalShow = (id) => {
        this.setState({
            showModal: true,
            cityToBeUpdated: id,

        })
    }

    handleModalClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleUserCityInput = async (e) => {
        e.preventDefault();
        try {
            let apiKey = process.env.REACT_APP_LOCATIONIQ_API_KEY

            let api = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${this.state.city}&format=json`;
            let cityData = await axios.get(api);


            let cityObj = {
                city: this.state.city.toUpperCase(),
                lat: cityData.data[0].lat,
                lon: cityData.data[0].lon,
            }


            this.setState({
                cityData: cityData.data[0],
                cityName: cityData.data[0].display_name,
                storedCityData: cityObj,
            });

            // this.getWeatherData(cityData.data[0].lat, cityData.data[0].lon);
            this.addCityData(cityObj);

        } catch (error) {
            this.setState({
                cityData: [],
                city: '',
                cityName: '',
                weatherInfo: [],
                hasWeather: false,
                weatherlastUpdated: '',
                key: '',
                storedCityData: [],
            });
        };
    }

    addCityData = async (cityObj) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'post',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/city',
                data: cityObj
            }

            let createdCity = await axios(config);

            this.setState({
                storedCityData: [...this.state.storedCityData, createdCity.data]
            })
        }
    }

    updateCity = async (cityToUpdate) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'put',
                baseURL: process.env.REACT_APP_SERVER,
                url: `/city/${cityToUpdate._id}`,
                data: cityToUpdate,
            }

            let updatedCityData = await axios(config);

            let updatedCityArr = this.state.storedCityData.map(existingRes => {
                return existingRes._id === cityToUpdate._id
                    ? updatedCityData.data
                    : existingRes
            });

            this.setState({
                storedCityData: updatedCityArr
            })

            this.getWeatherData();
        }
    }

    handleAddSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true }); 

        let apiKey = process.env.REACT_APP_LOCATIONIQ_API_KEY


        let api = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${this.state.city}&format=json`;
        let cityData = await axios.get(api);

        let cityToBeUpdate = {
            city: this.state.city.toUpperCase(),
            lat: cityData.data[0].lat,
            lon: cityData.data[0].lon,
        }

        this.addCityData(cityToBeUpdate);
        this.getWeatherData();

    }

    setCity = (e) => (
        this.setState({
            city: e.target.value
        })
    )


    getWeatherData = async () => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const cityConfig = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: `/city`
            }

            this.setState({ loading: true });
            let cityDataFromDB = await axios(cityConfig);
            this.setState({ loading: false });

            let lat = cityDataFromDB.data[0].lat;
            let lon = cityDataFromDB.data[0].lon;

            this.setState({
                cityDataFromDB: cityDataFromDB.data[0],
                weatherlastUpdated: cityDataFromDB.data[1],
                key: cityDataFromDB.data[1]
            })

            const weatherConfig = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: `/weather?lat=${lat}&lon=${lon}`
            }

            let weatherDataFromApi = await axios(weatherConfig);

            let cityWeather = weatherDataFromApi.data[0].map(a => {
                return [a.iconPath, a.city, a.description, a.temp, a.feelsLike, a.date, a.icon]
            });

            this.setState({
                weatherInfo: cityWeather[0],
                dbCity: weatherDataFromApi.data[0],
                weatherlastUpdated: weatherDataFromApi.data[1],
                key: weatherDataFromApi.data[1],
                hasWeather: true,
                loading: false
            })
        }
    }


    componentDidMount() {
        this.getWeatherData();
    }



    render() {
        let weather = this.state.weatherInfo
        const lastUpdated = new Date(this.state.weatherlastUpdated);
        const formattedDate = lastUpdated.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        return (<>
            <Card className='col px-2 py-1 border-0 bg-dark'>
                <Card.Body className='p-0 mb-2'>
                    {this.state.loading ? <Spinner animation="border" /> :
                        this.state.hasWeather ?
                            <div className='d-flex flex-column flex-md-row align-items-center justify-content-around'>
                                <Image src={weather[0]} alt='weather icon' width={70} />
                                <div className='ms-3'>
                                    <span className='d-flex flex-row align-items-center' style={{ color: '#84d9ec' }}>
                                        {weather[1]}
                                        <Button size='sm' variant='link' style={{ color: "darkcyan" }} onClick={() => this.handleModalShow(weather)}>
                                            <PencilFill />
                                        </Button>
                                    </span>
                                    <span className='d-block'>{weather[2]}</span>
                                    <span className='d-block'> {weather[3]}{'\u00b0'} F</span>
                                    <span className='d-block' style={{ fontSize: '.7rem' }}>Feels like {weather[4]}{'\u00b0'} F</span>
                                </div>
                            </div> :
                                <Form onSubmit={this.handleAddSubmit}>
                                    <InputGroup>
                                    <Form.Control 
                                    name='cityInput' 
                                    onChange={this.setCity} 
                                    placeholder='Add A Location' 
                                    />
                                    <Button variant='info' type="submit"><PlusLg /></Button>
                            </InputGroup>
                                </Form>
                    }

                </Card.Body>
                {this.state.hasWeather ? <span className='text-center' style={{ fontSize: '.6rem' }}>Last Updated {formattedDate} {formattedTime}</span> : <></>}
            </Card>
            <UpdateCityModal
                city={this.state.cityDataFromDB.city}
                id={this.state.cityDataFromDB._id}
                updateCity={this.updateCity}
                showModal={this.state.showModal}
                closeModal={this.handleModalClose}
            /></>

        )
    }
}
// .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
// .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });


export default withAuth0(Weather);