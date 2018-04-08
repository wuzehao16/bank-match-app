import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/contentLayout';
import fetch from '../lib/fetch'
const Wrapper = styled.div`
  padding: 15px;
  background: #fff;
`
const Title = styled.div`
  font-size: 16px;
  color: #3c3c3c;
  line-height: 30px;
  font-weight: 600;
  text-align: center;
`
const More = styled.div`
  color:#969696;
  font-size: 12px;
`
const I = styled.i`

`
class Financialnformation extends React.PureComponent {
  static async getInitialProps ({query}) {
    // eslint-disable-next-line no-undef

    const res = await fetch(`/getContentInfomationDetails?contentId=${query.contentId}`)
    //总利息
    return { content: res }
  }
  render() {
    const content = this.props.content;
    return (
      <Layout>
        <Wrapper>
          <Title>{content.contentTitle}</Title>
          <More>
            <i className="source"></i><span>{content.source?content.source:'未知来源'}</span>
            <i className="read"></i><span>{content.readNum}</span>
            <i className="time"></i><span>{content.releaseTime}</span>
          </More>
          <div
            dangerouslySetInnerHTML={{
                __html: content.content
            }}>
          </div>
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
            margin-left:30px;
            width:12px;
            background-image:url(/static/read.png);
          }
          .time{
            margin-left:30px;
            background-image:url(/static/time.png);
          }
        `}
        </style>
      </Layout>
    )
  }
}

export default Financialnformation;
