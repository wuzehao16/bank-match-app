import React, { Fragment }from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { List, WhiteSpace, WingBlank, SegmentedControl } from 'antd-mobile'
import { Form } from 'antd'
import Layout from '../layout/HasFooterRecruitLayout'
import fetch from '../lib/fetch'
import { formatData , getCookie } from '../lib/util'
import withRoot from '../src/withRoot';
const Item = List.Item;
const Brief = Item.Brief;

const Button = styled.button`
    display: inline-block;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
`

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

const Desc = styled.div`
  font-size: 14px;
  width: 100%;
  color: #999;
  text-align: center;
  padding: 50% 0 ;
`

const workingYearDic = ['','一年以下','1-3年','3-5年','5-10年','10年以上']
const expectSalaryDic = ['面议','2k以下','2k-5k','5k-10k','10k-15k','15k-25k','25k-50k','50k以上']

class PublishedJobList extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req);
    const resumeListData = await fetch('/getResumeList',token)
    const education = await fetch(`/selectByType?type=education`)
    const expectJob = await fetch(`/selectByType?type=jobTitle`)


    return {
      resumeListData: resumeListData || [],
      dic:{
        educationDic: education,
        expectJobDic: expectJob
      }
    };
  }

  onChange = (e) => {
    console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  }
  onValueChange = (value) => {
    console.log(value);
  }

  render() {
    const resumeListData = this.props.resumeListData;
    const {educationDic,expectJobDic} = this.props.dic
    return (
      <Layout title="人才列表">
        <WhiteSpace/>
        {/* <WingBlank size="sm"> */}
        <div style={{display:'flex',justifyContent:'space-around'}}>
          <Button>客户经理</Button>
          <Button>高级客户经理</Button>
          <Button>销售代表</Button>
          <Button>电话销售</Button>
        </div>
        {/* </WingBlank> */}
        <WhiteSpace/>
        <List>
          {
            resumeListData.length ? resumeListData.map(item => 
              <Link href={`/resumeDetail?resumeId=${item.resumeId}`}>
                <Item
                  align="top"
                  thumb={item.headPortrait}
                  multipleLine>
                <Name>{item.name}</Name>
                <Brief>
                  <Fragment>
                    <Info>{workingYearDic[item.workingYear]}<Divider>|</Divider></Info>
                    <Info>{educationDic[item.education]}<Divider>|</Divider></Info>
                    <Salary>{expectSalaryDic[item.expectSalary]}</Salary>
                  </Fragment>
                </Brief>
                </Item>
              </Link>
            ):
            <Desc><p>暂无数据</p></Desc>
          }
        </List>
      <style jsx global>{`
          .am-list-item .am-list-line .am-list-brief{
            font-size: 12px !important;
            color: #999 !important;
          }
          .am-list-thumb  img{
            width: 35px !important;
            height: 35px !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}
const PublishedJobListWapper = Form.create()(PublishedJobList);
export default withRoot(PublishedJobListWapper);
