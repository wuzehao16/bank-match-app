import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import ControlPoint from '@material-ui/icons/ControlPoint';
import Avatar from '@material-ui/core/Avatar';
import dayjs from 'dayjs'
import Router from 'next/router';
import { Modal, Button, WhiteSpace, WingBlank} from 'antd-mobile';
import Layout from '../layout/HasFooterWantedLayout';
import fetch from '../lib/fetch';
import { getCookie } from '../lib/util'
import { addBaseInformation } from '../services/recruit'
import withRoot from '../src/withRoot';
const alert = Modal.alert;

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
  margin-bottom: 50px;
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
  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    if (token) {
      const userInfo = await fetch('/getUserInfo',token)
      const resume = await fetch('/getResumeAllDetail',token)
      return {
        resume: resume || '',
        userInfo: userInfo
      }
    }
    return {
      resume:  '',
      userInfo: '',
      notoken: true
    }
  }

  state = {
    resumeId: ''
  }

  async componentDidMount () {
    if (this.props.notoken) {
      const alertInstance = alert('您尚未登录', '登陆后即可填写查看简历，前往登录?', [
        { text: '取消', onPress: () => Router.push('/workList') },
        { text: '确定', onPress: () => {
            if(typeof window !== 'undefined'){
              navigator.userAgent.match(/iPhone|iPad|iPod/i) ? window.webkit.messageHandlers.login.postMessage({}) : androidRef.notifyLoginAction()
            }
        }},
      ]);
    }
    if (this.props.resume&&this.props.resume.appResume.resumeId) {
      // console.log('if')
      this.setState({
        resumeId:this.props.resume.appResume.resumeId
      })
    } else {
      const resumeId = (await addBaseInformation()).data
      // console.log('else')
      this.setState({
        resumeId:resumeId
      })
    }
  }

  render() {
      const { userInfo, resume:{appResume,education,expectJob,workExperience},notoken } = this.props
      console.log("this.props",this.props)
      console.log('userInfo',userInfo)
      const resumeId = this.state.resumeId
      console.log('resumeId',resumeId)
      return (
        <Layout title="简历">
        { this.props.notoken? null:
        <div>
          <Head>
              <Avatar
              alt="Adelle Charles"
              src={userInfo?userInfo.userHead:"/static/resume_head.png"}
              style={{height:60,width:60}}
            />
          </Head>
          <Wrapper>
            <Title>基本信息</Title>
            {
              appResume
                ? <Card>
                  <Link href={{pathname:'/baseinformation',query:{resumeId:resumeId,avatar:userInfo.userHead}}}>
                    <Edit>
                      <i className="iconfont icon-edit"/>
                      <span style={{paddingLeft:'5px'}}>编辑</span>
                    </Edit>
                  </Link>
                    <ul className="ul">
                      <li>姓名：{appResume.name}</li>
                      <li>性别：{appResume.sex==1?'女':'男'}</li>
                      <li>出生年月：{appResume.birthYear}</li>
                      <li>最高学历：{appResume.education}</li>
                      <li>工作年限：{appResume.workingYear}</li>
                      <li>电话号码：{appResume.phone}</li>
                      <li>邮箱：{appResume.mail}</li>
                      <li>所在城市：{appResume.city}</li>
                      <li>在职状态：{appResume.status==1?'在职':'离职'}</li>
                    </ul>
                  </Card>
                : <Link prefetch href={{pathname:'/baseinformation',query:{resumeId:resumeId},avatar:userInfo.userHead}}>
                    <AddContainer>
                      <Add ><ControlPoint/>
                        <span>添加基本信息</span>
                      </Add>
                    </AddContainer>
                  </Link>
            }
            <Title>工作经历</Title>
            {
              workExperience && workExperience.length
              ? <Card>
                  <Link href={{pathname:'/workExperienceList',query:{resumeId:resumeId}}}>
                    <Edit>
                      <i className="iconfont icon-edit"/>
                      <span style={{paddingLeft:'5px'}}>编辑</span>
                    </Edit>
                  </Link>
                    {workExperience.map(i => {
                      return(
                        <ul className="list" key={i.workExperienceId}>
                      <li>{dayjs(i.entryTime).format('YYYY.MM')}-{dayjs(i.leaveTime).format('YYYY.MM')}</li>
                      <li className="company">{i.companyName}</li>
                      <li className="job">{i.job}</li>
                    </ul>
                    )
                    })}
                </Card>
                : <Link prefetch href={{pathname:'/workExperience',query:{resumeId:resumeId}}}>
                  <AddContainer>
                    <Add ><ControlPoint/>
                      <span>添加工作经历</span>
                    </Add>
                  </AddContainer>
                </Link>
            }

            <Title>教育经历</Title>
            {
              education && education.length
              ? <Card>
                  <Link href={{pathname:'/educations',query:{resumeId:resumeId}}}>
                    <Edit>
                      <i className="iconfont icon-edit"/>
                      <span style={{paddingLeft:'5px'}}>编辑</span>
                    </Edit>
                  </Link>
                    {education.map(i => {
                      return(
                        <ul className="list" key={i.educationId}>
                      <li>毕业年份：{i.graduate}</li>
                      <li className="company">{i.school}</li>
                      <li className="job">{i.educationBackground}-{i.major}</li>
                    </ul>
                    )
                    })}
                </Card>
               :  <Link prefetch href={{pathname:'/educationExperience',query:{resumeId:resumeId}}}>
                  <AddContainer>
                    <Add ><ControlPoint/><span>添加教育经历</span></Add>
                  </AddContainer>
                </Link>
            }

            <Title>期望工作</Title>
            {
              expectJob
              ? <Card>
                <Link href={{pathname:'/expectedwork',query:{resumeId:resumeId}}}>
                  <Edit>
                    <i className="iconfont icon-edit"/>
                    <span style={{paddingLeft:'5px'}}>编辑</span>
                  </Edit>
                </Link>
                  <ul className="ul">
                    <li>期望岗位：{expectJob.expectJob}</li>
                    <li>期望城市：{expectJob.expectCity}</li>
                    <li>期望月薪：{salary[expectJob.expectSalary]}</li>
                  </ul>
                </Card>
                : <Link prefetch href={{pathname:'/expectedwork',query:{resumeId:resumeId}}}>
                    <AddContainer>
                      <Add ><ControlPoint/>
                        <span>添加期望工作</span>
                      </Add>
                    </AddContainer>
                  </Link>
            }
          </Wrapper>
          </div>}
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
