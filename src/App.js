import React, { Component } from 'react';
import Lunchspot from './components/lunchspot'
import Form from './components/form'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { spacing } from '@material-ui/system';
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
      this.state.lunchSpots = results
      this.lunchSpotRandomizer()
    })
    .catch((error) => {
      this.setState({error: error})
    });
  }

  lunchSpotRandomizer = () => {
    let randomLunchSpot = this.state.lunchSpots[Math.floor(Math.random() * this.state.lunchSpots.length)]
    this.setState({randomLunchSpot: randomLunchSpot})
  }

  updateLunchSpots = (newSpot) => {
    this.setState(state => {
      const spots = state.lunchSpots.push(newSpot);
      return {
        spots
      };
    });
  }

  showForm = (show) => {
    if(show){
      this.setState({addNewSpot:true})
    } else {
      this.setState({addNewSpot:false})
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Sorry an issue has been encountered.</h1>
    }
    return (
      <Container maxWidth="sm">
      <Grid container padding="auto" spacing={3} justify="center">
        <Grid container item xs={12}>
          <h1>WHERE TO LUNCH?</h1>
        </Grid>
        <Grid container item xs={12}>
          {this.state.addNewSpot ? (
            <Form toggleViewMethod={this.showForm} newSpot={this.updateLunchSpots} />
          ) : (
            <Lunchspot my={10} data={this.state.randomLunchSpot} />
          )}
        </Grid>
        <Grid container item xs={12}>
          <Button variant="contained" color="primary" onClick={this.lunchSpotRandomizer}>
            Find me a spot!
          </Button>
          <Button variant="contained" onClick={() => this.showForm(true)}>
            Add a new restaurant
          </Button>
        </Grid>
      </Grid>
      </Container>
    );
  }
}

export default App;
