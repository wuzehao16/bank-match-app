import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {  WhiteSpace, Modal } from 'antd-mobile'
import fetch from '../lib/fetch';
import { getCookie } from '../lib/util'
import Layout from '../layout/Blanklayout'
import {deleteJob} from '../services/recruit'

const alert = Modal.alert;

const Container = styled.div`
  background-color: #fff;
  padding: 15px;
`
const Name =styled.div`
  font-size: 15px;
  line-height:15px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 10px;
`
const More =styled.div`
  font-size: 13px;
  line-height: 15px;
  color: #666;
`
const Title =styled.div`
  font-size: 15px;
  color: #333333;
`
const Divider = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  margin: 12px 0;
`
const Describe = styled.div`
  font-size: 13px;
  color: #333;
  line-height: 25px;
`
const AddDescribe = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 15px;
`

const Address = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  line-height: 15px;
  color: #333;
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
    const token = getCookie('token', req);
    const jobDetail = await fetch(`/getJobDetail?jobId=${query.jobId}`,token);

    console.log('query','jobDetail',query,jobDetail)
    const jobName = await fetch('/selectByType?type=jobTitle')
    const ageLimit = ["","经验不限","应届生","一年以下","1-3年","3-5年","5-10年","10年以上"]
    const education = await fetch('/selectByType?type=education')
    const nature = ["","全职","兼职","实习"]
    return {
            jobDetail: jobDetail || {},
            jobId: query.jobId,
            companyId: query.companyId,
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
      { text: '确定', onPress: () => {
          const res = await deleteJob(this.props.jobId);
          if(res.code == 0){
            Router.push({
              pathname:`/publishedJobList?companyId=${this.props.companyId}`
            })
          }else {
            Toast.fail(res.msg);
          }
      } },
    ])
  }
  render() {
    const {jobDetail, dic, jobId} = this.props;
    console.log('this.props',this.props)
    return (
      <Layout>
        <Container>
            <Name>{jobDetail.jobName}</Name>
            <More>{jobDetail.address}/{dic.ageLimitDic[jobDetail.ageLimit]}/{jobDetail.education}/{dic.natureDic[jobDetail.nature]}</More>
        </Container>
        <WhiteSpace />
        <Container>
          <Title>职位描述</Title>
          <Divider />
          <Describe
            dangerouslySetInnerHTML={{
                    __html: jobDetail.jobDesribe
                }}
            />

        </Container>
        <WhiteSpace />
        <Container>
          <Address>
            <Title>所在地区</Title>
            <Address>{jobDetail.address}</Address>
          </Address>
          <Divider />
          <AddDescribe>
            {jobDetail.addressDetial}
          </AddDescribe>
        </Container>
        <div className="bottom">
          <Link href={`/publishJob?jobId=${this.props.jobId}`}><Button>编辑</Button></Link>
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
