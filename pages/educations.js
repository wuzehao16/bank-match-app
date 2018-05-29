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
    const token = getCookie('token', req)
    const i = await fetch(`/getEducationList?resumeId=${query.resumeId}`,token);
    return {
              resumeId:query.resumeId,
              i: i || []
          }
  }

  // edit = () => {
  //   Router.push({
  //     pathname:'/educationExperience?type=1',
  //     // query: { ...this.resumeId }
  //   })
  // }

  render() {
    const {i, resumeId }= this.props
    return (
      <Layout  title="教育经历">
        {i.length==0?null:<div>
          {
          i.map((item,index) =>
            <WingBlank size="lg" key={index}>
              <WhiteSpace size="lg" />
              <Link prefetch href={{pathname:'/educationExperience',query:{educationId:item.educationId}}}>
                <Card>
                  <Card.Header
                    title={<span>毕业年份：{item.graduate}</span>}
                    extra={<div style={{color:'#ee5648',fontSize:'14px'}}><i className="iconfont icon-edit" style={{marginRight:'5px'}}></i>编辑</div>}
                  />
                  <Card.Body>
                    <div className="school">{item.school}杭州电子科技大学</div>
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
