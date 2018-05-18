import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout'
import Icon from '@material-ui/core/Icon'

const ulStyles = {
  listStyle: 'none',
  width:'100%',
  marginTop:'15px',
}
const Li = styled.li`
  font-size:13px;
  height: 45px;
  color: #646464;
  line-height: 45px;
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

class Help extends React.PureComponent {
  render() {
    return (
      <Layout title = '帮助中心' >
      <div className="helplist">
        <ul style={ulStyles}>
          <Link href='/helpquestions'>
            <Li>
              <span>常见问题</span>

              <Icon>chevron_right</Icon>
            </Li>
          </Link>
          <Link href='/contactus'>
            <Li>
            <span>联系客服</span>
            <Icon>chevron_right</Icon>
            </Li>
          </Link>
        </ul>
      </div>
        <style jsx global>{`
          html, body, div, span,
          h1, h2, h3, h4, h5, h6, p,
          a,footer, header, nav{
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }
          /* HTML5 display-role reset for older browsers */
          ul {
            list-style: none;
            padding:0 16px;
          }
          body,html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow:hidden;
          }
          html {
            height:100%;
            background-color: #f2f2f2;
          }
          div,ul,li {
            margin: 0;
            padding: 0;
          }
          .helplist {
            width: 100%;
            background: #fff;

          }
          ul li:last-child {
            border-bottom: none;
          }
        `}
        </style>
      </Layout>
    )
  }
}

export default Help;
