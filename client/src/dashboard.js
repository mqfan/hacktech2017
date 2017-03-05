import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    title: 'Pickup basketball',
    author: 'jill111',
  },
  {
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    title: 'Camera',
    author: 'Danson67',
  },
  {
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    title: 'Hats',
    author: 'Hans',
  },
  {
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

// Need to get the information of person and location from the database
// Would need to create dashboard from this information
// Later would like to connect to facebook api
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = props.state;
    }
    render() {
        return (
            <div className= "dashboard-container">
            <h1> Hellooooo </h1>
            <BulletinBoard />
            <RaisedButton onClick={this.props.onClick}>
            Logout
            </RaisedButton>
            </div>
        );
    }
}


function BulletinBoard(props) {
    return(
        <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>Basketball</Subheader>
      {tilesData.map((tile) => (
        <GridTile
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src='src/img/bacll.jpg' />
        </GridTile>
      ))}
    </GridList>
  </div>
    );
}


export default Dashboard;
