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
  right: '30px',
  lineHeight: '45px'
}
const ulStyles = {
  listStyle: 'none',
  backgroundColor: '#fff',
  width:'100%'
}
const liStyles = {
  width:'100%',
  fontSize:'13px',
  height: '45px',
  color: '#646464',
  lineHeight: '45px',
  position: 'relative',
  paddingLeft: '16px'
}
const footerStyles = {
  width: '100%',
  fontSize: '12px',
  color: '#969696',
  textAlign: 'center',
  position: 'absolute',
  padding:'150px 0 49px 0'
}

export default ({ children, title = '关于我们' }) => (
  <div className='aboutus'>
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
      <div className = "content" style={{height:'100%',width:'100%'}}>
        <div className = 'main'>
          <img src="/static/logo.png" style={{width:70,height:70,display:'block',margin:'60px auto 15px'}}/>
          <h1 style={{color:'#646464',fontSize:'13px',textAlign:'center'}}>众银云测</h1>
          <h2 style={{color:'#646464',fontSize:'9px',textAlign:'center'}}>V1.0.0</h2>
        </div>
        <div className = "description" style={{fontSize: '12px',color: '#969696',width: '100%',padding:'50px 20px'}}>
          <p style={{paddingRight:'30px'}}>致力于让用户更快捷了解产品资讯,并能通过只能工具更高效的开展工作，解决行业痛点!</p>
        </div>
        <ul style={ulStyles}>
          <Link href='/wechat'>
            <li style={liStyles}>
              官方微信
              <i class="material-icons" style={iconStyles}>chevron right</i>
            </li>
          </Link>
          <Link href='/servicecontract'>
            <li style={liStyles}>
            服务协议
            <i class="material-icons" style={iconStyles}>chevron right</i>
            </li>
          </Link>
        </ul>
        <footer style={footerStyles}>
            <p>众银云测，用户的智能顾问</p>
            <p>Copyright2018深圳市众银云测技术有限公司 版权所有</p>
        </footer>
      </div>  
    <style jsx global>{`
      html, body, div, span, object,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strong, sub, sup, tt, var,
      b, u, i, dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed, 
      figure, figcaption, footer, header, hgroup, 
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
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
      div,img,ul {
        margin: 0;
        padding: 0;
      }
      .aboutus{
        width: 100%;
        height: 100%;
        background-image: url('/static/aboutus-background.jpg') bottom left no-repeat;
      }
    `}
    </style>
  </div>
)