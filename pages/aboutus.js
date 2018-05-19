import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../layout/layout'
import Icon from '@material-ui/core/Icon'

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

  display:'flex',
  justifyContent:'space-between',
  alignItems: 'center'

}
const Ul = styled.ul`
  margin: 0;
  padding: 0;
  background-color: '#fff';
  width:'100%';
  height: 200px;
  list-style-type: none;
`
// 设置高度大于某值后link无效
const Li = styled.li`
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  ${'' /* line-height: 50px; */}
  ${'' /* height: 50px; */}
  padding:8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const footerStyles = {
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  bottom: '49px',
  padding:'150px 0 0 0'
}

class AboutUs extends React.PureComponent {
  render() {
    return (
      <Layout title="关于我们">
        <div className = "content" style={{height:'100%',width:'100%'}}>
          <div className = 'main'>
            <img src="/static/logo.png" style={{width:70,height:70,display:'block',margin:'60px auto 15px'}}/>
            <h1 style={{color:'#646464',fontSize:'13px',textAlign:'center'}}>众银云测</h1>
            <h2 style={{color:'#646464',fontSize:'9px',textAlign:'center',marginTop:5}}>V1.0.0</h2>
          </div>
          <div className = "description" style={{width: '100%',padding:'50px 20px'}}>
            <p style={{fontSize:'14px',color: '#969696',textIndent:'2em'}}>致力于让用户更快捷了解产品资讯,并能通过智能工具更高效的开展工作，解决行业痛点!</p>
          </div>
          <Ul>
            <Link href='/wechat'>
              <Li >
                <span>官方微信</span>
                <Icon>chevron_right</Icon>
              </Li>
            </Link>
            <Link href={{ pathname: '/servicecontract' }} >
              <Li>
              <span>服务协议</span>
              <Icon>chevron_right</Icon>
            </Li>
            </Link>
          </Ul>
          <footer style={footerStyles}>
              <p style={{fontSize:'12px',color: '#969696'}}>众银云测，用户的智能顾问</p>
              <p style={{fontSize:'12px',color: '#969696'}}>Copyright2018深圳市众银云测信息技术有限公司 版权所有</p>
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
          background: #f2f2f2;
        }
        html {
          height:100%;

        }
        div,img,ul {
          margin: 0;
          padding: 0;
        }
        body {
          background: url('/static/aboutus-background.jpg') bottom center no-repeat #f2f2f2;
          background-size: 400px 300px;
        }
      `}
      </style>
      </Layout>
    )
  }
}

export default AboutUs;
