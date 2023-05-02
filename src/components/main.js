import React from 'react';
import axios from 'axios';
import ToDo from './todo';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';
import { Container, Row, Col } from 'react-bootstrap';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meme: false,
            showMeme: false,
        }
    }

    getMeme = async (request, response, next) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/meme`
            let memeData = await axios.get(url)
            // console.log(memeData.data)
            this.setState({
                meme: memeData.data,
                showMeme: true,
            })

            // response.status(200).send(memeData.data)
        } catch(error) {
            next(error)

            this.setState({
                meme: [],
                showMeme: false,
            })
        }
    }

    render(){
        return(
            <Container className='flex-grow-1'>

                <Row>
                    <Col>
                        <ToDo />
                    </Col>
                    <Col>
                        <Meme getMeme={this.getMeme} currentMeme={this.state.meme} showMeme={this.state.showMeme} />
                        <Calendar />
                        <Resources />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Main;