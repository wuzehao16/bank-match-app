import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {  WhiteSpace, Modal } from 'antd-mobile';
import Layout from '../layout/Blanklayout';

const alert = Modal.alert;

const Container = styled.div`
  background-color: #fff;
  padding: 15px;
`
const Name =styled.div`
  font-size: 14px;
  color: #333333;
`
const More =styled.div`
  font-size: 11px;
  color:#666666;
`
const Title =styled.div`
  font-size: 14px;
  color: #333333;
`
const Divider = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  margin: 20px 0;
`
const Describe = styled.div`
  font-size: 12px;
  color: #666666;
`
const Address = styled.div`
  display: flex;
  justify-content: space-between;
`
const Button =styled.button`

  height: 40px;
  width: 40%;
  border:none;
  color:#f2f2f2;
  font-size: 15px;
  border-radius: 5px;
  background: ${props => props.delete ? '#ee5648' : '#fdc041'};
`
class publishedJobDetail extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    // const token = getCookie('token', req);
    const jobDetail = await fetch(`/getJobDetail?jobId=${query.jobId}`);

    const jobName = await fetch('/selectByType?type=jobTitle')
    const ageLimit = ["","经验不限","应届生","一年以下","1-3年","3-5年","5-10年","10年以上"]
    const education = await fetch('/selectByType?type=education')
    const nature = ["","全职","兼职","实习"]
    return {
            jobDetail: jobDetail || {},
            jobId: query.jobId,
            dic:{
              jobNameDic: jobName,
              ageLimitDic: ageLimit,
              educationDic: education,
              natureDic: nature,
            }
          };
  }

  handleClickDelete = () => {
    alert('删除', '你确定删除该职位吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => console.log('ok') },
    ])
  }
  render() {
    return (
      <Layout>
        <Container>
            <Name>客户经理</Name>
            <More>深圳南山区/3-5年/本科/全职</More>
        </Container>
        <WhiteSpace />
        <Container>
          <Title>职位描述</Title>
          <Divider />
          <Describe
            dangerouslySetInnerHTML={{
                    __html: '<h3>hahhah</h3>'
                }}
            />

        </Container>
        <WhiteSpace />
        <Container>
          <Address>
            <Title>所在地区</Title>
            <Title>深圳市南山区</Title>
          </Address>
          <Divider />
          <Describe>
            详细地址
          </Describe>
        </Container>
        <div className="bottom">
          <Button>编辑</Button>
          <Button delete onClick={this.handleClickDelete}>删除</Button>
        </div>
        <style jsx>{`
          .bottom{
            margin-top:20px;
            display:flex;
            justify-content: space-around;
          }
        `}</style>
      </Layout>
    )
  }
}

export default publishedJobDetail;
