import React from 'react';
import axios from 'axios';
import {Button, Image} from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';

class Meme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meme: false,
            showMeme: false,
        }
    }

    getMeme = async () => {
        if(this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();

            const jwt = res.__raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}`},
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/meme'
            }

            let memeData = await axios(config);

            this.setState({
                meme: memeData.data,
                showMeme: true,
            })
        } 
    }

    render() {
        return (
            <div className='d-flex flex-column justify-content-center'>
                {this.state.showMeme
                    ? <><Image className='mx-auto' src={this.state.meme[2]} alt="" width={250} fluid/>
                    <p>{this.state.meme[0]} created by {this.state.meme[1]}</p></>
                    : <></>
                }
                <Button className='mx-2' onClick={() => this.getMeme()}>Click to smile!</Button>
            </div>
        )
    }
}

export default withAuth0(Meme);