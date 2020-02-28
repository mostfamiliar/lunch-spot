import React from 'react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
                name: "",
                description: "",
                address: "",
                link: ""
        }

        this.error = null;
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
        .then((response) => response.json())
        .then((result) => {
            this.props.newSpot(result)
            this.props.toggleViewMethod(false)
        })
        .catch((error) => {
           this.error = error;
        })

    }
    
    render() {
        //API error handling
        if (this.state.error) {
            return <h1>Sorry an issue has been encountered.</h1>
        }
        return (

            <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                <Grid container spacing={2} width="75%">
                    <Grid container item xs={12} >
                        <TextValidator id="standard-basic" label="Name" width="75%" size="medium" name="name" value={this.state.name} onChange={this.handleChange} validators={['required']} errorMessages={['this field is required', 'email is not valid']} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator id="standard-basic" label="Description" name="description" value={this.state.description} onChange={this.handleChange} validators={['required']} errorMessages={['this field is required', 'email is not valid']} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator id="standard-basic" label="Address" name="address" value={this.state.address} onChange={this.handleChange} validators={['required']} errorMessages={['this field is required', 'email is not valid']} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator id="standard-basic" label="Link" name="link" value={this.state.link} onChange={this.handleChange} validators={['required']} errorMessages={['this field is required', 'email is not valid']} />
                    </Grid>
                </Grid>
                <Button color="primary" type="submit" value="Submit">Submit</Button>
                <Button color="primary" onClick={() => this.props.toggleViewMethod(false)}>Cancel</Button>
            </ValidatorForm>
        )
    }
}

export default Form