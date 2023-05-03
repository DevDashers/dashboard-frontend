import React from 'react';
import axios from 'axios';
import {Button, Image} from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';
import { ArrowClockwise } from 'react-bootstrap-icons';

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

    componentDidMount() {
            this.getMeme();
    }

    render() {
        return (
            <div className='d-flex flex-column justify-content-center border p-2 border-2 text-center'>
                {this.state.showMeme
                    ? <><Image className='mx-auto border border-2 p-2' src={this.state.meme[2]} alt="" width={250} fluid/>
                    <div className='p-2 mx-2'>
                    <p className='' ><b>{this.state.meme[0]}</b></p>
                    <p>created by {this.state.meme[1]}</p> 
                    <p>via Reddit.com/r/Aww</p>
                    </div></>
                    : <></>
                }
                <Button className='mx-auto p-2' variant='outline-success' onClick={() => this.getMeme()}>
                <ArrowClockwise />
                </Button>
            </div>
        )
    }
}

export default withAuth0(Meme);