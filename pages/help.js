import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../layout/layout'
import Icon from 'material-ui/Icon'

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

export default ({ children, title = '帮助中心' }) => (
  <div className='help'>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
      {/* <script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script> */}
      {/* <script src="https://cdn.bootcss.com/echarts/4.0.4/echarts.min.js"></script> */}
    </Head>
    {/* <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/a'><a>About</a></Link> |
        <Link href='/b'><a>Contact</a></Link>
      </nav>
    </header> */}
      {/* <div className = "content" style={{height:'100%',width:'100%'}}> */}
        <ul style={ulStyles}>
          <Link href='/helpquestions'>
            <li>
              常见问题
              <i class="material-icons" style={iconStyles}>chevron right</i>
            </li>
          </Link>
          <Link href='/contactus'>
            <li>
            联系客服
            <i class="material-icons" style={iconStyles}>chevron right</i>
            </li>
          </Link>
        </ul>
      {/* </div>   */}
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
      ol, ul {
        list-style: none;
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
      ul li {
        width:100%;
        font-size:13px;
        height: 45px;
        color: #646464;
        line-height: 45px;
        position: relative;
        padding-left: 16px;
        border-bottom: 1px solid #f2f2f2;

      }
      ul li:last-child {
        border-bottom: none;
      }
    `}
    </style>
  </div>
)