import React from 'react';
import ToDo from './to-do';
import Meme from './meme';
import Calendar from './calendar';
import Resources from './resources';


class Main extends React.Component {
    render(){
        return(
            <>
                <ToDo />
                <Meme />
                <Calendar />
                <Resources />
            </>
        )
    }
}

export default Main;