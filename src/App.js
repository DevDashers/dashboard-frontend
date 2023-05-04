import React from 'react';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import Splash from './components/splash';
import About from './components/about'
import { withAuth0 } from "@auth0/auth0-react";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

class App extends React.Component {
    render() {
        const { isAuthenticated, isLoading } = this.props.auth0;

        if (isLoading) {
            return <h1 className="text-center">Loading...</h1>;
        }

        return (
            <>
                <Container fluid className='d-flex flex-column vh-100'>
                    <Router>
                        <Header />
                        <Routes>
                            <Route
                                exact path="/"
                                element={
                                    isAuthenticated ?
                                        <>
                                            <Main />
                                        </>
                                        :
                                        <>
                                            <Splash />
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