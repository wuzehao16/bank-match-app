import React, { Fragment }from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout'
import { List, WhiteSpace, Button, WingBlank } from 'antd-mobile'
import { Form } from 'antd'
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
import { formatData } from '../lib/util'
const Item = List.Item;
const Brief = Item.Brief;

const Name = styled.span`
  font-size: 14px;
  color: #404040;
  margin-right: 10px;
`
const Info = styled.span`
  font-size: 12px;
  color: #999;
`
const Divider = styled.span`
  display:inline-block;
  margin: 0 3px;
`
const Salary = styled.span`
  font-size: 12px;
  color:rgb(238,86,72);
`
class PublishedJobList extends React.PureComponent {
  // static async getInitialProps ({query,req}) {
  //   // eslint-disable-next-line no-undef
  //   var resumeListData;
  //   const token = req ? getCookie('token', req) : ''
  //   if (query.type) {
  //     resumeListData = await fetch(`app/getResumeList`)
  //   }
  //   resumeListData = resumeListData || {
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
      <Layout title="人才列表">
        <WhiteSpace/>
        <div style={{display:'flex'}}>
          <Button inline size="small" type="inline ghost" style={{flex:'1'}}>客户经理</Button>
          <Button inline size="small" type="inline ghost" style={{flex:'1.5'}}>高级客户经理</Button>
          <Button inline size="small" type="inline ghost" style={{flex:'1'}}>销售代表</Button>
          <Button inline size="small" type="inline ghost" style={{flex:'1'}}>电话销售</Button>
        </div>
        <WhiteSpace/>
        <List >
        <Link href="/resumeDetail：resumeId">
            <Item 
              align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              multipleLine>
            <Name>王小姐</Name> 
            <Brief>
              <Fragment>
                <Info>三年<Divider>|</Divider></Info>
                <Info>本科<Divider>|</Divider></Info>
                <Salary>10-15K</Salary>
              </Fragment>
            </Brief>
            </Item>
          </Link>
          <Link href="/resumeDetail：resumeId">
            <Item 
              align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              multipleLine>
            <Name>王小姐</Name> 
            <Brief>
              <Fragment>
                <Info>三年<Divider>|</Divider></Info>
                <Info>本科<Divider>|</Divider></Info>
                <Salary>10-15K</Salary>
              </Fragment>
            </Brief>
            </Item>
          </Link>
          <Link href="/resumeDetail：resumeId">
            <Item 
              align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              multipleLine>
            <Name>王小姐</Name> 
            <Brief>
              <Fragment>
                <Info>三年<Divider>|</Divider></Info>
                <Info>本科<Divider>|</Divider></Info>
                <Salary>10-15K</Salary>
              </Fragment>
            </Brief>
            </Item>
          </Link>
         
        </List>
      <style jsx global>{`
          .am-list-item .am-list-line .am-list-brief{
            font-size: 12px !important;
            color: #999 !important;
          }
          .am-list-thumb  img{
            width:35px;
            height: 35px;
          }
        `}
        </style>
      </Layout>
    )
  }
}
const PublishedJobListWapper = Form.create()(PublishedJobList);
export default PublishedJobListWapper;
