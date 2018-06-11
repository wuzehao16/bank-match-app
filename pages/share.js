import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Layout from '../layout/Blanklayout';
import fetch from '../lib/fetch';
import BaseUrl from '../lib/url'
import { getCookie } from '../lib/util'

const Wrapper = styled.div`

  background: url(${props => props.src});
  background-size: 100% 100%;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`
const spread = keyframes`
    from  {
      left:50px;
      top:50px;
      opcity:75;
      width:0;
      height:0;
    }
    to {
      left:0px;
      top:0px;
      opacity: 0;
      width:100px;
      height:100px;
    }
`;
const spread1 = keyframes`
    from  {
      left:30px;
      top:30px;
      opcity:75;
      width:0;
      height:0;
    }
    to {
      left:-10px;
      top:-10px;
      opacity: 0;
      width:100px;
      height:100px;
    }
`;
const Btn = styled.div`
  position:absolute;
  right: 18%;
  bottom: 10%;
  height: 100px;
  width: 100px;
  background: url('static/invite_fx.png');
  background-size: 100%;
  &::after {
    content:' ';
    position: absolute;
    left: 20px;
    top:20px;
    z-index:1;
    width:10px;
    height:10px;
    background-color: #ff4200;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.3) inset;
    animation:${spread} 1s ease 0s infinite normal;
  }
`
const Btn1 = styled.div`
  position:absolute;
  left: 20%;
  bottom: 38%;
  height: 80px;
  width: 80px;
  background: url('static/invite_ck.png');
  background-size: 100%;
  &::after {
    content:' ';
    position: absolute;
    left: 20px;
    top:20px;
    z-index:1;
    width:10px;
    height:10px;
    background-color: #ff4200;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.3) inset;
    animation:${spread1} 1s ease 0s infinite normal;
  }
`

class Share extends React.PureComponent {
  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    // const res =  await fetch(`/qrcode`,token)
    // console.log(res)
    return { token: token }
  }
  state = {
    dialogOpen:false
  }
  handleDialogClick = () => {
    this.setState({ dialogOpen: true });
  }
  handleDialogClose = (event, reason) => {
    this.setState({ dialogOpen: false });
  }
  handleClick = () => {
    if(typeof window !== 'undefined'){
      navigator.userAgent.match(/iPhone|iPad|iPod/i) ? window.webkit.messageHandlers.inviteFriends.postMessage({})
      : window.androidRef.notifyShareAction()
    }
  }
  render() {
    return (
      <Layout title="邀队友&nbsp;赢大奖">
        <Wrapper src={`${BaseUrl}/app/qrcode?token=${this.props.token}`}>

          {/* <img  src={``} alt="" height='100%' width='100%'/> */}


          {/* 弹框 */}
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText style={{textAlign:'center'}} id="alert-dialog-description">
                <ul>
                  <li>1、将二维码图片分享至微信好友、朋友圈、QQ好友、QQ空间、新浪微博，也可保存图片通过其他渠道分享，二维码在活动期间内有效；</li>
                  <li>2、好友通过扫描您分享的二维码，下载众银云测APP并成功注册众银云测后将成为您的队友；</li>
                  <li>3、此次分享活动期间，新增队友排名前十的用户，将依次获取888/688/688/288/288/288/188/188/188/188元现金红包，于活动截止日三日内发放奖励。</li>
                  <li>4、活动时间：2018-6-12 00:00至2018-7-11 24:00。</li>
                  <li>5、本次活动为众银云测发起，最终解释权将归众银云测所有。</li>
                </ul>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button style={{margin:'0 auto'}} onClick={this.handleDialogClose} color="primary" autoFocus>
                关闭
              </Button>
            </DialogActions>
          </Dialog>
          <Btn onClick={this.handleClick} name="马上赚钱">
            <div className="dot"></div>
          </Btn>
          <Btn1 onClick={this.handleDialogClick} name="查看规则"></Btn1>
        </Wrapper>
        <style jsx>{`
          ul{
            margin:0;
            padding:0;
            list-style: none;
            text-align:left;
            margin-right:20px;
            margin-left:20px;
          }
          li{
            font-size:12px;
            word-break:break-all;
          }
          .example {
            position:relative;
            margin:150px auto;
            width:50px;
            height:50px;
          }
          .dot:before{

          }

          .dot:after {

          }
        `}</style>
      </Layout>
    )
  }
}

export default Share;
