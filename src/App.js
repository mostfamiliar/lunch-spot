import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './App.css';

class App extends Component {
  state = {
    lunchSpots: [],
    newLunchSpot: {}
  }


  render() {
    return (
      <Container maxWidth="sm">
        <h1>Where to lunch?</h1>
        <Button variant="contained" color="primary">
          Find me a spot!
        </Button>
      </Container>
    );
  }
}

export default App;
