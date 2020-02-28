import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { FormLabel } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            lunchSpot: {
                name: null,
                description: null,
                address: null,
                link: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({lunchSpot: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        fetch("http://localhost:8888/suggestions", {
            method: 'post',
            body: JSON.stringify(this.state.lunchSpot)
        })
        .then((response) => response.json())
        .then((results) => {
          console.log(results)
        })
    }
    
    render() {
        return (

            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                <Grid item>
                <TextField id="standard-basic" label="Name" size="medium" value={this.state.lunchSpot.name} onChange={this.handleChange} />
                </Grid>
                <Grid item xs={12}>
                <TextField id="standard-basic" label="Description" value={this.state.lunchSpot.description} onChange={this.handleChange} />
                </Grid>
                <Grid item xs={12}>
                <TextField id="standard-basic" label="Address" value={this.state.lunchSpot.address} onChange={this.handleChange} />
                </Grid>
                <Grid item xs={12}>
                <TextField id="standard-basic" label="Link" value={this.state.lunchSpot.link} onChange={this.handleChange} />
                </Grid>
                </Grid>
                <Button color="primary" type="submit" value="Submit">Submit</Button>
            </form>


        )
    }
}

export default Form