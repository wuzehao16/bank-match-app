import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SendIcon from '@material-ui/icons/Send';
import SchoolIcon from '@material-ui/icons/School';
import LocationIcon from '@material-ui/icons/LocationCity';
import withRoot from '../src/withRoot';


class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };
  componentDidMount () {
    const url = window.location.pathname
    this.setState({ value:url });
  }
  handleChange = (event, value) => {
    Router.push(value)
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        style={{
          width:'100%',
          position:'fixed',
          bottom:0,
          left:0,
        }}
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="职位" value="/publishedJobList"icon={<SendIcon />}/>
        <BottomNavigationAction label="人才"  value="/applicantList" icon={<SchoolIcon/>}/>
        <BottomNavigationAction label="公司" value="/companyDetail" icon={<LocationIcon/>}/>
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(SimpleBottomNavigation);
