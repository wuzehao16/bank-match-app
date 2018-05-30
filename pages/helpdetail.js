import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/contentLayout';
import fetch from '../lib/fetch'
import { getCookie } from '../lib/util'

const Wrapper = styled.div`
  padding: 15px;
  background: #fff;
`
const Title = styled.div`
  color: #3c3c3c;
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
const Content = styled.div`
  p{
    color:#646464;
  }
`
class HelpDetail extends React.PureComponent {
  static async getInitialProps ({query}) {
    return { content: query }
  }
  componentDidMount(){

  }
  render() {
    console.log(this.props)
    const content = this.props.content;
    return (
      <Layout title="常见问题">
        <Wrapper>
          {/* <Title>{content.contentTitle}</Title> */}
          <Content
            dangerouslySetInnerHTML={{
                __html: content.content
            }}>
          </Content>
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

export default HelpDetail;
