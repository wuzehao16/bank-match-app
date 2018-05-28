import React from 'react'
import Link from 'next/link'
import getCookie from '../lib/getCookie'
import fetch from '../lib/fetch'
import styled from 'styled-components'
import Router from 'next/router'
import dayjs from 'dayjs'
import Layout from '../layout/RecruitLayout'
import { Card, WhiteSpace, WingBlank, Button } from 'antd-mobile'

class WorkExperienceList extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    // const resumeID = query.resumeID
    const token = req ? getCookie('token', req) : ''
    const WorkExperienceList = await fetch('/getWorkExperienceList',token);
    return { 
            WorkExperienceList: WorkExperienceList || [],
            resumeId: query.resumeId
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
    const {WorkExperienceList, resumeId} = this.props;
    return (
      <Layout  title="工作经历">
        {WorkExperienceList.length==0?null:<div>
          {WorkExperienceList.map((item,index) => 
            <WingBlank size="lg" key={index}>
              <WhiteSpace size="lg" />
              <Link href={{pathname:'/workExperience',query:{workExperienceId:item.workExperienceId}}} >
                <Card>
                  <Card.Header
                    title={<span>{dayjs(item.entryTime).format('YYYY.MM')}-{dayjs(item.leaveTime).format('YYYY.MM')}</span>}
                    extra={<div onClick={this.edit} style={{color:'#ee5648',fontSize:'14px'}}><i className="iconfont icon-edit" style={{marginRight:'5px'}}></i>编辑</div>}
                  />
                  <Card.Body>
                    <div className="company">{item.companyName}</div>
                    <div className="job">{item.job}</div>
                  </Card.Body>
                </Card>
              </Link>
              <WhiteSpace size="lg" /> 
              <WhiteSpace/>
            </WingBlank>
          )} 
        </div>}
        <WingBlank>
          <Link prefetch href={{pathname:'/workExperience',query:{resumeId:resumeId}}}>
            <Button type="primary" style={{marginTop:'50px',fontSize:'14px'}}>新增工作经历</Button>
          </Link>
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