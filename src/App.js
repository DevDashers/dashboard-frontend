import React from 'react';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import { Container } from 'react-bootstrap';


class App extends React.Component {
    render(){
        return(
            <Container fluid className='d-flex flex-column vh-100'>
            <Header />
            <Main />
            <Footer />
            </Container>

            
        )
    }
}

export default App;
