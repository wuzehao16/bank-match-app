import React, { Fragment }from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { List, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import Layout from '../layout/HasFooterRecruitLayout';
import fetch from '../lib/fetch'
import { getCookie, formatData } from '../lib/util'
import withRoot from '../src/withRoot';
const Item = List.Item;
const Brief = Item.Brief;

const Name = styled.span`
  font-size: 14px;
  color: #333;
`

class PublishedJobList extends React.PureComponent {
  // static async getInitialProps ({query,req}) {
  //   // eslint-disable-next-line no-undef
  //   var JobListData;
  //   const token = req ? getCookie('token', req) : ''
  //   if (query.type) {
  //     JobListData = await fetch(`app/getJobList`)
  //   }
  //   JobListData = JobListData || {
  //     jobName:'客户经理',
  //     address: '深圳南山区',
  //     ageLimit: '3-5年',
  //     education: '本科',
  //     nature: '全职'
  //   };
  //   return JobListData;
  // }


  render() {
    // const JobListData = this.props.JobListData;
    return (
      <Layout title="职位管理">
        <WhiteSpace/>
        <WingBlank style={{padding:'0 17px'}}>
          <Link href="/publishJob">
          <Button type="primary" style={{fontSize:'14px',marginTop:'50px'}}><i className="iconfont icon-zhifeiji"></i>去发布新职位</Button>
          </Link>
        </WingBlank>
        <WhiteSpace/>

        <List >
          <Link href="/jobDetail：jobId">
            <Item arrow="horizontal" multipleLine onClick={() => {}}>
              <Name>客户经理</Name>
              <Brief>
                <Fragment>
                  <span>深圳南山区/</span>
                  <span>3-5年/</span>
                  <span>本科/</span>
                  <span>全职</span>
                </Fragment>
              </Brief>
            </Item>
          </Link>
          <Link href="/jobDetail：jobId">
            <Item arrow="horizontal" multipleLine onClick={() => {}}>
              <Name>客户经理</Name>
              <Brief>
                <Fragment>
                  <span>深圳南山区/</span>
                  <span>3-5年/</span>
                  <span>本科/</span>
                  <span>全职</span>
                </Fragment>
              </Brief>
            </Item>
          </Link>
          <Link href="/jobDetail：jobId">
            <Item arrow="horizontal" multipleLine onClick={() => {}}>
              <Name>客户经理</Name>
              <Brief>
                <Fragment>
                  <span>深圳南山区/</span>
                  <span>3-5年/</span>
                  <span>本科/</span>
                  <span>全职</span>
                </Fragment>
              </Brief>
            </Item>
          </Link>

        </List>
      <style jsx global>{`
          .am-list-item .am-list-line .am-list-brief{
            font-size: 12px !important;
            color: #666 !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}
export default withRoot(PublishedJobList);
