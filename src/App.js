import React, { Component } from 'react';
import Lunchspot from './components/Lunchspot'
import Form from './components/Form'
import { Container, Button, Grid, Paper, Box } from '@material-ui/core';
import './App.css';

class App extends Component {
  state = {
    lunchSpots: [],
    newLunchSpot: {},
    randomLunchSpot: {},
    addNewSpot: false,
    error: ""
  }

  componentDidMount() {
    fetch("http://localhost:8888/suggestions")
    .then((response) => response.json())
    .then((results) => {
      this.setState({lunchSpots: results})
      this.lunchSpotRandomizer()
    })
    .catch((error) => {
      this.setState({error: error})
    });
  }

  // Grab random lunch spot and set state
  lunchSpotRandomizer = () => {
    let randomLunchSpot = this.state.lunchSpots[Math.floor(Math.random() * this.state.lunchSpots.length)]
    this.setState({randomLunchSpot: randomLunchSpot})
  }

  // Update state after form submitted
  updateLunchSpots = (newSpot) => {
    this.setState(state => {
      const spots = state.lunchSpots.push(newSpot);
      return {
        spots
      };
    });
  }

  // Toggle add new spot form
  showForm = (show) => {
    if(show){
      this.setState({addNewSpot:true})
    } else {
      this.setState({addNewSpot:false})
    }
  }

  render() {    
    // API error handling
    if (this.state.error) {
      return <h1>Sorry an issue has been encountered.</h1>
    }
    return (
      <Container component="main" maxWidth="sm">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <h1>WHERE TO LUNCH?</h1>
          </Grid>
          <Grid item xs={12}>
            {this.state.addNewSpot ? (
              <Form toggleViewMethod={this.showForm} newSpot={this.updateLunchSpots} />
            ) : (
            <Paper><Lunchspot my={10} data={this.state.randomLunchSpot} /></Paper> 
            )}
          </Grid>
          <Grid item xs={12} paddingTop={12}>
              <Button style={{ marginRight: 10 }} variant="contained" color="primary" onClick={this.lunchSpotRandomizer}>
                Find me a spot!
              </Button>
              <Button margin={22} variant="contained" onClick={() => this.showForm(true)}>
                Add a new restaurant
              </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
