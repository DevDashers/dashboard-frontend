import React from 'react';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import Profile from './components/Profile';
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
    render(){
        return(
            <>
                <Header />
                    {
                        this.props.auth0.isAuthenticated ?
                            <>
                                <Profile />
                                <LogoutButton />
                                <Main />
                            </>
                        :                     
                    <LoginButton />
                }
                    <Footer />  
            </>
        )
    }
}

export default withAuth0(App);
