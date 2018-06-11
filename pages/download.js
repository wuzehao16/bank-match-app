import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Layout from '../layout/Blanklayout';
import withRoot from '../src/withRoot'

const styles = theme => ({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 25,
    border: 0,
    width: 200,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
});

const Wrapper = styled.div`
 background:url(static/download.png) no-repeat;
  background-color:#fff;
  background-size:100% 100%;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`
class Download extends React.PureComponent {
  handleClick = () => {
    if (typeof window !== "undefined") {
    navigator.userAgent.match(/iPhone|iPad|iPod/i)
     ? window.location.href = 'itms-services://?action=download-manifest&amp;url=https://back.ibankmatch.com/manifest.plist'
      :  window.location.href = 'https://back.ibankmatch.com/ZYYC.apk'
    }
  }
  render() {
    const {classes} = this.props;
    var href;


    console.log(href)
    return (
      <Layout>
        <Wrapper>
          <img src="/static/logo.png" style={{width:120,height:120,display:'block',margin:'40% auto 15px'}}/>
          <h1 style={{color:'#646464',fontSize:'24px',textAlign:'center',marginTop:'50px'}}>众银云测</h1>
          {/* <Divider style={{marginTop:'30px',width:'200px',margin: '30px auto'}}/> */}
          <h3>V1.0.0</h3>
          <h2 style={{color:'#a93220',fontSize:'16px',textAlign:'center',marginTop:'15%'}}>
            <div>
              首次下载完成后请前往【设置】
            </div>
            <div>>点击【通用】</div>
            <div>>点击【描述文件与设备管理】</div>
            <div>>点击企业级应用的【TOP LTD TOV】</div>
            <div>>点击【信任TOP LTD TOV】</div>
          </h2>

          {/* <a style={{  textDecoration: 'none',display:'block',width:'200px',margin:'30px auto'}} href={`${href}`}> */}
          <Button onClick={this.handleClick} className={classes.button}>下载</Button>
          {/* </a> */}
        </Wrapper>
        <style jsx>{`
          h2{
            font-weight:400;
            width:300px;
            margin:0 auto;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(Download));
