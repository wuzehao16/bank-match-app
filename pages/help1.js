import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';
import Icon from 'material-ui/Icon';

const iconStyles = {
  color: '#c4c4c4',
  fontSize:'13px',
  position: 'absolute',
  right: '45px',
  lineHeight: '45px'
}
const ulStyles = {
  listStyle: 'none',
  backgroundColor: '#fff',
  width:'100%',
  marginTop:'15px',
  padding:'0 15px'
}
class Help extends React.PureComponent {
  render() {
    return (
      <Layout title='帮助中心'>
        <ul style={ulStyles}>
          <Link href='/helpquestions'>
            <li>
              常见问题
              <Icon >chevron right</Icon>
            </li>
          </Link>
          <Link href='/contactus'>
            <li>
            联系客服
            <Icon>chevron right</Icon>
            </li>
          </Link>
        </ul>
        <style jsx>{`
          div,ul,li {
            margin: 0;
            padding: 0;
          }
          ul li {
            width:100%;
            font-size:13px;
            height: 45px;
            color: #646464;
            line-height: 45px;
            position: relative;
            padding-left: 16px;
            border-bottom: 1px solid #f2f2f2;
            display:flex;
            justify-content: space-between;
          }
          ul li:last-child {
            border-bottom: none;
          }
        `}</style>

      </Layout>
    )
  }
}

export default Help;
