import React, { Component } from 'react';
import Lunchspot from './components/lunchspot'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './App.css';

class App extends Component {
  state = {
    lunchSpots: [],
    newLunchSpot: {},
    randomLunchSpot: {}
  }

  componentDidMount() {
    fetch("http://localhost:8888/suggestions")
    .then((response) => response.json())
    .then((results) => {
      this.state.lunchSpots = results
      this.lunchSpotRandomizer()
    })
  }

  lunchSpotRandomizer = () => {
    let randomLunchSpot = this.state.lunchSpots[Math.floor(Math.random() * this.state.lunchSpots.length)]
    this.setState({randomLunchSpot: randomLunchSpot})
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h1>Where to lunch?</h1>
        <p>A simple randomizer to find a restaurant.</p>
        <Lunchspot data={this.state.randomLunchSpot} />
        <Button variant="contained" color="primary" onClick={this.lunchSpotRandomizer}>
          Find me a spot!
        </Button>
      </Container>
    );
  }
}

export default App;
