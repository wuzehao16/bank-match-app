import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {  Toast } from 'antd-mobile';
import Layout from '../layout/Blanklayout';

const Wrapper =styled.div`
  padding: 5px 15px;
  background-color: #fff;
`
const ICard = styled.div`
  padding: 15px;
  border: solid 1px #f1f1f1;
  position: relative;
`
const Divider = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  margin: 20px 0;
`
const Title = styled.div`
  font-size: 18px;
  color: #242424;
  font-weight: 500;
  margin: 25px 0;
  display: flex;
  align-items: center;
`
const Line = styled.div`
  height: 1px;
  margin: 0 10px;
  width: 80%;
  background-color: #f2f2f2;
`
const Card = styled.div`
  background-color: #fafafa;
  border: solid 1px #f2f2f2;
  height: 82px;
`
class WorkDetail extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Wrapper>
          <ICard>
            <div className="name">客户经理</div>
            <div className="info">深圳南山区|3-5年|本科</div>
            <div className="salary">8k-16k</div>
            <div className="logo"></div>
            <Divider></Divider>
            <div className="address">广东省-地址</div>
            <div className="address-detail">深圳软件元4动</div>
          </ICard>
           <Title>
             <span className="title">职位描述</span>
             <Line></Line>
           </Title>
          <div dangerouslySetInnerHTML={{
                   __html: '<h3>hahhah</h3>'
               }}
           >
           </div>
           <Title>
             <span className="title">公司信息</span>
             <Line></Line>
           </Title>
           <Card>
             <div></div>
           </Card>
        </Wrapper>
        <style jsx>{`
          .name{
            font-size:18px;
            font-weight:bold;
            line-height:15px;
          }
          .logo{
            position:absolute;
            top:15px;
            right:15px;
            height:45px;
            width:45px;
            background:url(https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png);
            border: solid 1px #f2f2f2;
            margin-bottom:20px;
          }
          .info{
            font-size:11px;
            line-height:15px;
            margin:17px 0 10px;
          }
          .salary {
            color: #ee5648;
            font-size: 13px;
          }
          .address{
            font-size:14px;
            margin-bottom:10px;
          }
          .address-detail{
            font-sise:10px;
            color:#989898;
          }
          .title{
            flex: 0 0 75px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default WorkDetail;
