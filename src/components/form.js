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
                name: "",
                description: "",
                address: "",
                link: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8888/suggestions", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            console.log(response)
        })
        .then((results) => {
            console.log(results)
            this.props.toggleViewMethod(false)
        })
        .catch((error) => {
            console.log(error)
        })

    }
    
    render() {
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Name" size="medium" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Description" name="description" value={this.state.description} onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Address" name="address" value={this.state.address} onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Link" name="link" value={this.state.link} onChange={this.handleChange} />
                    </Grid>
                </Grid>
                <Button color="primary" type="submit" value="Submit">Submit</Button>
                <Button color="primary" onClick={() => this.props.toggleViewMethod(false)}>Cancel</Button>
            </form>
        )
    }
}

export default Form