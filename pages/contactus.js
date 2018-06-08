import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';

class ContactUs extends React.PureComponent {
  render() {
    return (
      <Layout title="联系客服">
        <section>
          <p>1.长按保存二维码</p>
          <img src='/static/wechat.png' style={{width:125,height:125}}/>
          {/* <div className="button">保存二维码</div> */}
        </section>
        <section style={{height:204}}>
          <p>2、用微信“扫一扫”添加客服</p>
          <img src='/static/followwechat.png' style={{width:228,height:125,'-webkit-touch-callout':'default'}}/>
        </section>
        <style jsx global>{`
          body,html {
            margin:0;
            padding:0;
            width: 100%;
            height: 100%;
            background:#f2f2f2;
          }
          div {
            margin:0;
            padding:0;
          }
          section {
            background:#fff;
            margin:16px 0;
            padding: 0 0 18px 15px;
          }
          img {
            display:block;
            margin:0 auto;
          }
          p {
            font-size:12px;
            height:24px;
            color:#646464;
            padding-top:19px;
            margin-bottom:36px;
          }
          .button {
            display: block;
            width: 125px;
            height: 30px;
            background-color: #ee5648;
            border-radius: 15px;
            text-align:center;
            color: #fff;
            font-size: 12px;
            line-height:30px;
            margin: 18px auto 16px;
            // box-shadow: 0;
          }
        `}
        </style>
      </Layout>
    )
  }
}

export default ContactUs;
