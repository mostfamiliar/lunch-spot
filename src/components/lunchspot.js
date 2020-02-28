import React from 'react';

class Lunchspot extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
            name: null,
            description: null,
            votes: null
        }
    }

    render() {
        return(
          <div>Hi</div>  
        )
    }
}

export default Lunchspot;