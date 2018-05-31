import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import ControlPoint from '@material-ui/icons/ControlPoint';
import Avatar from '@material-ui/core/Avatar';
import dayjs from 'dayjs'
import Layout from '../layout/RecruitLayout';
import fetch from '../lib/fetch';
import { getCookie } from '../lib/util'
import { addBaseInformation } from '../services/recruit'
import withRoot from '../src/withRoot';

const Head = styled.div`
  height:111px;
  background-color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  height: 57px;
  font-size: 15px;
  color: #333;
  line-height: 57px;
`
const AddContainer = styled.div`
  height: 80px;
  width: 100%;
  background-color: #fff2f1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ee5648;
`
const Add = styled.div`
  height: 14px;
  width: 130px;
  color:#ee5648;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  padding: 0 15px;
  padding-bottom: 50px;
`
const Card = styled.div`
  position: relative;
  background-color: #fff;
  padding: 15px;
  color: #6d6d6d;
  border: solid 1px #d5d5d5;
`
const Edit = styled.div`
  position: absolute;
  top: 5px;
  right: 12px;
  font-size: 13px;
  line-height: 30px;
  color: #ee5749;
`
const workingSeniority =[0,'1年以下','1-3年','3-5年','5-10年','10年以上']
const salary =[ '面议','2k以下', '2k-5k','5k-10k','10k-15k','15k-25k','25k-50k', '50k以上'];
class Resume extends React.PureComponent {
  static async getInitialProps ({req, query}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    // const userInfo = await fetch('/getUserInfo',token)
    const resume = await fetch(`/getResumeForBody?resumeId=${query.resumeId}`)
    return {
      resume: resume||'',
     }
  }
  state = {
    resumeId: ''
  }
  render() {
    const { appResume,education,expectJob,workExperience } = this.props.resume
    console.log(this.props.resume)
  return (<Layout>
  <Head>
    <Avatar alt="Adelle Charles" src={appResume.headPortrait
        ? appResume.headPortrait
        : "/static/resume_head.png"} style={{
        height: 60,
        width: 60
      }}/>
  </Head>
  <Wrapper>
    <Title>基本信息</Title>
    <Card>
      <ul className="ul">
        <li>姓名：{appResume.name}</li>
        <li>性别：{
            appResume.sex == 1
              ? '女'
              : '男'
          }</li>
        <li>出生年月：{appResume.birthYear}</li>
        <li>最高学历：{appResume.education}</li>
        <li>工作年限：{appResume.workingYear}</li>
        <li>电话号码：{appResume.phone}</li>
        <li>邮箱：{appResume.mail}</li>
        <li>所在城市：{appResume.city}</li>
        <li>在职状态：{
            appResume.status == 1
              ? '在职'
              : '离职'
          }</li>
      </ul>
    </Card>
    <Title>工作经历</Title>
    <Card>
      {
        workExperience.map((i,index) => {
          return (<ul className="list" key={index}>
            <li>{dayjs(i.entryTime).format('YYYY.MM')}-{dayjs(i.leaveTime).format('YYYY.MM')}</li>
            <li className="company">{i.companyName}</li>
            <li className="job">{i.job}</li>
          </ul>)
        })
      }
    </Card>
    <Title>教育经历</Title>
    <Card>
      {
        education.map((i,index) => {
          return (<ul className="list" key={index}>
            <li>毕业年份：{i.graduate}</li>
            <li className="company">{i.school}</li>
            <li className="job">{i.educationBackground}-{i.major}</li>
          </ul>)
        })
      }
    </Card>
    <Title>期望工作</Title>
    <Card>
      <ul className="ul">
        <li>期望岗位：{expectJob.expectJob}</li>
        <li>期望城市：{expectJob.expectCity}</li>
        <li>期望月薪：{salary[expectJob.expectSalary]}</li>
      </ul>
    </Card>

  </Wrapper>
        <style jsx>{`
          .ul{
            margin:0;
            padding:0;
            list-style:none;
            font-size: 13px;
            line-height: 30px;
          }
          .list{
            background:url(static/resume_list.jpg) no-repeat;
            background-size:15px 100%;
            color:#333333;
            margin:0;
            padding:0 20px;
            list-style:none;
            font-size: 13px;
          }
          .company{
            margin:10px 0;
          }
          .job{
            font-size:12px;
            color:#999999;
            padding-bottom:20px;
          }
          .iconfont{
            font-size: 14px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRoot(Resume);
