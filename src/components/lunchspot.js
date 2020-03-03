import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Badge, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';


class Lunchspot extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            letter: ""
        }
    }

    render() {
        const classes = makeStyles(theme => ({
            root: {
              maxWidth: 345,
            },
            media: {
              height: 0,
              paddingTop: '56.25%', // 16:9
            },
            expand: {
              transform: 'rotate(0deg)',
              marginLeft: 'auto',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
            },
            expandOpen: {
              transform: 'rotate(180deg)',
            },
            avatar: {
              backgroundColor: red[500],
            },
        }));

        return(
            <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                 <RestaurantIcon />
                </Avatar>
              }
              title={this.props.data.name}
              subheader={this.props.data.address}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.data.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Badge badgeContent={this.props.data.votes} color="primary">
                <FavoriteIcon />
              </Badge>
              <IconButton aria-label="share" href={this.props.data.link} target="_blank">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        )
    }
}

Lunchspot.propTypes = {
  data: PropTypes.object
};

export default Lunchspot;