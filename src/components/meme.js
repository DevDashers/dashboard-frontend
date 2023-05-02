import React from 'react';
import {Button, Image} from 'react-bootstrap'

class Meme extends React.Component {
    render() {
        return (
            <div className='d-flex flex-column justify-content-center'>
                {this.props.showMeme
                    ? <><p>{this.props.currentMeme[0]} created by {this.props.currentMeme[1]}</p>
                        <Image className='mx-auto' src={this.props.currentMeme[2]} alt="" width={250} fluid/></>
                    : <></>
                }
                <Button className='mx-2' onClick={() => this.props.getMeme()}>Click to smile!</Button>
            </div>
        )
    }
}

export default Meme;