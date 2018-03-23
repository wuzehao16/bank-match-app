import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Layout from '../components/layout'
import fetch from '../lib/fetch'
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

const Income = styled.div`
  height: 80px;
  font-size: 13px;
  color: #969696;
  text-align: center;
  display: flex;
  background-color: #ffffff;
`

export default class extends React.Component {
  static async getInitialProps({query}) {
		return {
			item: await fetch(`/item/${query.id}`)
		}
	}
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    console.log(value)
    this.setState({ value });
  };
  componentDidMount () {

  }
  render () {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Layout>
        <Income>
          <div className="price left">
            <div>待结算金额(元)</div>
            <div>0</div>
          </div>
          <div className="price">
            <div>待结算金额(元)</div>
            <div>0</div>
          </div>
        </Income>
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels
          >
            <BottomNavigationAction label="最近7日" value="7"/>
            <BottomNavigationAction label="最近一个月"  value="30"/>
            <BottomNavigationAction label="最近三个月" value="90"/>
          </BottomNavigation>
        <style jsx >{`
          .price{
            width:50%;
          }
          .price div:first-child{
            margin-top:20px;
          }
          .price div:nth-child(2){
            padding-top:15px;
            border-left: 1px solid #f2f2f2;
          }
        `}
        </style>
      </Layout>
    )
  }
}
