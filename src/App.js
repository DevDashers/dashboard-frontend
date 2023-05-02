import React from 'react';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import Profile from './components/Profile';
import Splash from './components/splash';
import About from './components/about'
import { withAuth0 } from "@auth0/auth0-react";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


class App extends React.Component {
    render(){
        return(
            <>
            <Container fluid className='d-flex flex-column vh-100'>
                <Router>
                    <Header />
                    <Routes>
                    
                        <Route
                        exact path="/"
                        element={
                            this.props.auth0.isAuthenticated ?
                                <>
                                    {/* <Profile /> */}
                                    {/* <LogoutButton /> */}
                                    <Main />
                                </>
                            :                     
                                <>
                                    <Splash />
                                    <LoginButton />
                                </>
                        }
                        >
                        </Route>
                        <Route
                        exact path="/about"
                        element={<About />}
                        >

                        </Route>
                    </Routes>
                    <Footer />
                </Router>
            </Container>
            </>
        )
    }
}

export default withAuth0(App);