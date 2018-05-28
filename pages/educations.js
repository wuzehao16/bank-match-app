import React from 'react'
import Link from 'next/link'
import fetch from '../lib/fetch'
import Router from 'next/router'
import getCookie from '../lib/getCookie'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout'
import { Card, WhiteSpace, WingBlank, Button } from 'antd-mobile';

class Educations extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    var educationList;
    const token = req ? getCookie('token', req) : ''
    if (query.type) {
      educationList = await fetch(`/getEducationList`)
    }
    console.log('educationList',educationList);
    return { 
              educationList: educationList || {
                graduate:'2018',
                school:'民大',
                educationBackground:'本科',
                major:'信管'
              }
          }
  }

  add = () => {
    Router.push({
      pathname:'/educationExperience',
      // query: { ...this.resumeId }
    })
  }

  // edit = () => {
  //   Router.push({
  //     pathname:'/educationExperience?type=1',
  //     // query: { ...this.resumeId }
  //   })
  // }
  render() {
    const {educationList} = this.props.educationList
    console.log('educationList',educationList)
    return (
      <Layout  title="教育经历">
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Link href='/educationExperience'>
            <Card>
              <Card.Header
                title={<span>毕业年份：{educationList.graduate}</span>}
                extra={<div style={{color:'#ee5648',fontSize:'14px'}}><i className="iconfont icon-edit" style={{marginRight:'5px'}}></i>编辑</div>}
              />
              <Card.Body>
                <div className="school">{educationList.school}杭州电子科技大学</div>
                <div className="majorInfo"><span>{educationList.educationBackground}-</span><span>{educationList.major}</span></div>
              </Card.Body>
            </Card>
          </Link>
          <WhiteSpace size="lg" /> 
        </WingBlank>
        <WhiteSpace/>
        
        <WingBlank>
          <Link href="/educationExperience">
            <Button type="primary" style={{marginTop:'50px',fontSize:'14px'}}>新增教育经历</Button>
          </Link>  
          <WhiteSpace />
        </WingBlank>
        <style jsx global>{`
          .am-list-item .am-input-label {
            font-size: 14px !important;
          }   
          .am-list-item .am-input-control input {
            font-size: 14px !important;
          }
          .school {
            margin: 0 0 10px 0;
          }
          .majorInfo {
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

export default Educations;