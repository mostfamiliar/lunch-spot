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
    addNewSpot: false
  }

  componentDidMount() {
    fetch("http://localhost:8888/suggestions")
    .then((response) => response.json())
    .then((results) => {
      this.state.lunchSpots = results
      this.lunchSpotRandomizer()
    })
    .catch((error) => {

    });
  }

  lunchSpotRandomizer = () => {
    let randomLunchSpot = this.state.lunchSpots[Math.floor(Math.random() * this.state.lunchSpots.length)]
    this.setState({randomLunchSpot: randomLunchSpot})
  }

  showForm = (show) => {
    if(show){
      this.setState({addNewSpot:true})
    } else {
      this.setState({addNewSpot:false})
    }
  }

  render() {
    return (
      <Grid container spacing={3} justify="center">
        <Grid container item xs={12}>
          <h1>WHERE TO LUNCH?</h1>
        </Grid>
        <Grid container item xs={12}>
          {this.state.addNewSpot ? (
            <Form toggleViewMethod={this.showForm} />
          ) : (
            <Lunchspot my={10} data={this.state.randomLunchSpot} />
          )}
        </Grid>
        <Grid container item xs={12}>
          <Button m={10} variant="contained" color="primary" onClick={this.lunchSpotRandomizer}>
            Find me a spot!
          </Button>
          <Button m={10} variant="contained" onClick={() => this.showForm(true)}>
            Add a new restaurant
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default App;
