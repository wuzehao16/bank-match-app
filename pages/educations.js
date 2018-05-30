import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Card, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import Router from 'next/router'
import fetch from '../lib/fetch'
import { getCookie } from '../lib/util'
import Layout from '../layout/RecruitLayout'

class Educations extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const i = await fetch(`/getEducationList?resumeId=${query.resumeId}`,token);
    console.log('u',i)
    return {
              resumeId:query.resumeId,
              i: i || []
          }
  }

  render() {
    const {i, resumeId }= this.props
    return (
      <Layout  title="教育经历">
        {i.length==0?null:<div>
          {
          i.map((item,index) =>
            <WingBlank size="lg" key={index}>
              <WhiteSpace size="lg" />
              <Link prefetch href={{pathname:'/educationExperience',query:{resumeId:resumeId,educationId:item.educationId}}}>
                <Card>
                  <Card.Header
                    title={<span>毕业年份：{item.graduate}</span>}
                    extra={<div style={{color:'#ee5648',fontSize:'14px'}}><i className="iconfont icon-edit" style={{marginRight:'5px'}}></i>编辑</div>}
                  />
                  <Card.Body>
                    <div className="school">{item.school}</div>
                    <div className="majorInfo"><span>{item.educationBackground}-</span><span>{item.major}</span></div>
                  </Card.Body>
                </Card>
              </Link>
          </WingBlank>
          )
          }
        </div>
        }

        <WingBlank>
          <Link prefetch href={{pathname:'/educationExperience',query:{resumeId:resumeId}}}>
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
