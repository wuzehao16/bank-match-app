import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';
import fetch from '../lib/fetch';
import getCookie from '../lib/getCookie'

const Wrapper = styled.div`
  background: url(static/share.jpg);
  background-size: cover;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`
const Btn = styled.div`
  background: url(static/share_btn.png);
  background-size: cover;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  width: 170px;
  margin: 20px auto;
`
class Share extends React.PureComponent {
  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    // const res =  await fetch(`/qrcode`,token)
    // console.log(res)
    return { token: token }
  }
  handleClick = () => {
    if(typeof window !== 'undefined'){
      navigator.userAgent.match(/iPhone|iPad|iPod/i) ? window.webkit.messageHandlers.inviteFriends.postMessage({})
      : window.androidRef.notifyShareAction()
    }
  }
  render() {
    return (
      <Layout title="邀请好友拿奖励">
        <Wrapper>
          <img  src={`http://47.106.70.82:8611/app/qrcode?token=${this.props.token}`} alt="" height='45%' width='60%'/>
          <ul>
            <li>1、  将二维码图片分享至微信好友、朋友圈、QQ好友、QQ空间、新浪微博，也可保存图片通过其他渠道分享，二维码在活动期间内有效；</li>
            <li>2、  好友通过扫描您分享的二维码，下载众银云测APP并成功注册众银云测后将成为您的队友；</li>
            <li>3、  此次分享活动期间，新增队友排名前十的用户，将获得活动大礼包，具体奖励请查看奖品清单；</li>
            <li>4、活动时间：2018-6-01 00:00至2018-6-30 24:00；</li>
            <li>5、本次活动为众银云测发起，最终解释权将归众银云测所有。</li>
          </ul>
          <Btn onClick={this.handleClick}>马上赚钱</Btn>
        </Wrapper>
        <style jsx>{`
          ul{
            margin:0;
            padding:0;
            margin-top:30%;
            list-style: none;
            color:#fff;
            text-align:left;
            margin-right:20px;
            margin-left:20px;
          }
          li{
            font-size:12px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Share;
