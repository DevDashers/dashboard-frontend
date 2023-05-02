import React from 'react';
import Button from 'react-bootstrap/Button'

class Meme extends React.Component {
    render(){
        return(
            <>
            { this.props.showMeme 
            ?  <><p>{this.props.currentMeme[0]} created by {this.props.currentMeme[1]}</p>
                <img src={this.props.currentMeme[2]} alt="" width={250}></img></>
            :   <></>
            }
                <Button className='mx-2' onClick={() => this.props.getMeme()}>Click to smile!</Button>
            </>
        )
    }
}

export default Meme;