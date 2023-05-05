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
            <div className='d-flex flex-column justify-content-center p-2 text-center bg-dark' style={{border: '4px solid #fdb92b'}}>
                {this.state.showMeme
                    ? <>
                    <div className='px-2 mx-2' >
                    <p className='fw-bold small'>{this.state.meme[0]}</p>
                    <Image className='mx-auto p-2' style={{border: '2px solid #fdb92b'}} src={this.state.meme[2]} alt="" width={250} fluid/>
                    <span className='d-block small'>created by {this.state.meme[1]} <br/> via Reddit.com/r/Aww</span> 
                    <p></p>
                    </div></>
                    : <></>
                }
                <Button className='mx-auto p-2' variant='warning' onClick={() => this.getMeme()}>
                <ArrowClockwise />
                </Button>
            </div>
        )
    }
}

export default withAuth0(Meme);