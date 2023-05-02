import React from 'react';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import Profile from './components/Profile';
import Splash from './components/splash';
import { withAuth0 } from "@auth0/auth0-react";
import { Container } from 'react-bootstrap';


class App extends React.Component {
    render(){
        return(
            <>
            <Container fluid className='d-flex flex-column vh-100'>
                <Header />
                    {
                        this.props.auth0.isAuthenticated ?
                            <>
                                <Profile />
                                <LogoutButton />
                                <Main />
                            </>
                        :                     
                            <>
                                <Splash />
                                <LoginButton />
                            </>
                }
                    <Footer />  
                </Container>
            </>
        )
    }
}

export default withAuth0(App);
