import React from 'react';
import axios from 'axios';
import {Button, Image} from 'react-bootstrap'

class Meme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meme: false,
            showMeme: false,
        }
    }

    getMeme = async (request, response, next) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/meme`
            let memeData = await axios.get(url)
            // console.log(memeData.data)
            this.setState({
                meme: memeData.data,
                showMeme: true,
            })

            // response.status(200).send(memeData.data)
        } catch (error) {
            next(error)

            this.setState({
                meme: [],
                showMeme: false,
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

export default Meme;