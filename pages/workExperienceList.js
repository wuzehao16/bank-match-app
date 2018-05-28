import React from 'react'
import Link from 'next/link'
import getCookie from '../lib/getCookie'
import fetch from '../lib/fetch'
import styled from 'styled-components'
import Router from 'next/router'
import Layout from '../layout/RecruitLayout'
import { Card, WhiteSpace, WingBlank, Button } from 'antd-mobile'

class WorkExperienceList extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    // const resumeID = query.resumeID
    const token = req ? getCookie('token', req) : ''
    const WorkExperienceList = await fetch('/getWorkExperienceList')
    console.log('WorkExperienceList', WorkExperienceList);
    WorkExperienceList.entryTime = `${dayjs(WorkExperienceList.entryTime).year()}.${dayjs(WorkExperienceList.entryTime).month()+1}`;
    WorkExperienceList.leaveTime = `${dayjs(WorkExperienceList.leaveTime).year()}.${dayjs(WorkExperienceList.leaveTime).month()+1}`;
    return { 
              educationList: educationList || {},
              resumeID: resumeID
          }
  };

  add = () => {
    Router.push({
      pathname:'/workExperience',
      // query: { ...this.resumeId }
    })
  }

  edit = () => {
  }
  render() {
    const {WorkExperienceList, resumeID} = this.props;
  
    return (
      <Layout  title="工作经历">
      {WorkExperienceList.map(item => 
      <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Link href='/workExperience'>
            <Card>
              <Card.Header
                title={<div><span>{WorkExperienceList.entryTime}</span> <span>{WorkExperienceList.leaveTime}</span></div>}
                extra={<div onClick={this.edit} style={{color:'#ee5648',fontSize:'14px'}}><i className="iconfont icon-edit" style={{marginRight:'5px'}}></i>编辑</div>}
              />
              <Card.Body>
                <div className="company">众银云测有限公司</div>
                <div className="job">销售主管</div>
              </Card.Body>
            </Card>
          </Link>
          <WhiteSpace size="lg" /> 
          <WhiteSpace/>
        </WingBlank>
      )} 
        <WingBlank>
          <Button type="primary" onClick={this.add} style={{marginTop:'50px',fontSize:'14px'}}>新增工作经历</Button>
          <WhiteSpace />
        </WingBlank>
        <style jsx global>{`
          .am-list-item .am-input-label {
            font-size: 14px !important;
          }   
          .am-list-item .am-input-control input {
            font-size: 14px !important;
          }
          .company {
            margin: 0 0 10px 0;
          }
          .job {
            color: #999;
          }
          .am-card-header {
            font-size: 14px !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}

export default WorkExperienceList;