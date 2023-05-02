import React from 'react';
import axios from 'axios';
import ToDo from './to-do';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';


class Main extends React.Component {

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
        } catch(error) {
            next(error)

            this.setState({
                meme: [],
                showMeme: false,
            })
        }
    }

    render(){
        return(
            <>
                <ToDo />
                <Meme getMeme={this.getMeme} currentMeme={this.state.meme} showMeme={this.state.showMeme} />
                <Calendar />
                <Resources />
            </>
        )
    }
}

export default Main;