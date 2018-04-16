import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/contentLayout';
// import fetch from '../lib/fetch'
import { queryDetail } from '../services/match'

const Wrapper = styled.div`
  padding: 15px;
  background: #fff;
`
const Title = styled.div`
  color: #000;
  font-size: 22px;
  line-height: 1.45;
  font-weight: 600;
  font-family: 'PingFangSC-Medium';
  @media (min-width:320px) {
    font-size: 21px;
    line-height: 30px;
  }
  @media(min-width: 375px) {
    font-size: 24px;
    line-height: 34px;
  }
  @media (min-width:360px) {
    font-size: 23px;
    line-height: 31px;
  }
`
const More = styled.div`
  color:#969696;
  font-size: 12px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`
const I = styled.i`

`
class MatchDetail extends React.PureComponent {
  static async getInitialProps ({query}) {
    // eslint-disable-next-line no-undef
    // const token = getCookie('token', req)
    console.log(query)
    const res = await queryDetail(query.matchNo)
    console.log(res)
    //总利息
    return { content: res }
  }
  componentDidMount(){

  }
  render() {
    const content = this.props.content;
    return (
      <Layout>
        <Wrapper>
          123
          {/* <Title>{content.contentTitle}</Title>
          <More>
            <span><i className="source"></i><span>{content.source?content.source:'未知来源'}</span></span>
            <span><i className="read"></i><span>{content.readNum}</span></span>
            <span><i className="time"></i><span>{content.releaseTime}</span></span>
          </More>
          <div
            dangerouslySetInnerHTML={{
                __html: content.content
            }}>
          </div> */}
        </Wrapper>
        <style jsx>{`
          span{
            margin-left:4px;
          }
          i{
            height:10px;
            width:10px;
            display:inline-block;
            background-size:100% 100%;
          }
          .source{
            width:12px;
            background-image:url(/static/source.png);
          }
          .read{
            width:12px;
            background-image:url(/static/read.png);
          }
          .time{
            background-image:url(/static/time.png);
          }
        `}
        </style>
      </Layout>
    )
  }
}

export default MatchDetail;
