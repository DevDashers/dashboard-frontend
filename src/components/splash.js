import React from 'react';
import LoginButton from './Login';
import '../splash.css';
import VideoBackground from  '../assets/retroSplashVideo1.mp4';
import '../index.css';
import { Container } from 'react-bootstrap';


class Splash extends React.Component {


    render(){
        return(
            <Container className="d-flex align-items-center justify-content-center text-center h-100">
                <div id="splashDiv" >
                    <div className="overlay"></div>
                        <video src={VideoBackground} autoPlay loop muted />
                        <div className="content">
                            <h1 id="h1splash">Dev Dashers</h1>                
                            <LoginButton />
                        </div>
                </div> 
            </Container>


        );
    }
}

export default Splash;