import React from 'react';
import Router from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SendIcon from '@material-ui/icons/Send';
import SchoolIcon from '@material-ui/icons/School';
import LocationIcon from '@material-ui/icons/LocationCity';


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
        <BottomNavigationAction label="职位" value="/workList"icon={<i className="iconfont icon-zhifeiji" style={{fontSize:'20px'}}></i>}/>
        <BottomNavigationAction label="简历"  value="/resume" icon={<i className="iconfont icon-school1" style={{fontSize:'20px'}}></i>}/>
        {/* <BottomNavigationAction label="公司" value="/companyDetail" icon={<i className="iconfont icon-company" style={{fontSize:'20px'}}></i>}/> */}
      </BottomNavigation>
    );
  }
}


export default SimpleBottomNavigation;
