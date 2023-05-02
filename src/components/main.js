import React from 'react';
import ToDo from './todo';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';
import { Container, Row, Col } from 'react-bootstrap';


class Main extends React.Component {

    render() {
        return (
            <>
                <Container className='flex-grow-1'>
                    <Row>
                        <Col>
                            <ToDo />
                        </Col>
                        <Col>
                            <Meme />
                            <Calendar />
                            <Resources />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Main;