import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { List, WhiteSpace, Button, WingBlank } from 'antd-mobile'
import Layout from '../layout/HasFooterRecruitLayout'
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
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req);
    const  JobListData = await fetch('/getJobList', token);
    const jobName = await fetch('/selectByType?type=jobTitle')
    const ageLimit = ["","经验不限","应届生","一年以下","1-3年","3-5年","5-10年","10年以上"]
    const education = await fetch('/selectByType?type=education')
    const nature = ["","全职","兼职","实习"]
    return {
            JobListData: JobListData || [],
            companyId: query.companyId,
            dic:{
              jobNameDic: jobName,
              ageLimitDic: ageLimit,
              educationDic: education,
              natureDic: nature,
            }
          };
  }


  render() {
    const { JobListData, companyId} = this.props;
    const {jobNameDic, ageLimitDic, educationDic, natureDic} = this.props.dic;
    console.log('JobListData',JobListData,'dic',this.props.dic)
    return (
      <Layout title="职位管理">
      {
        JobListData.length==0?
        // <WhiteSpace/>
        <WingBlank style={{padding:'0 17px'}}>
          <Link href={`/publishJob?companyId=${this.props.companyId}`}>
          <Button type="primary" style={{fontSize:'14px',marginTop:'50px'}}><i className="iconfont icon-zhifeiji"></i>去发布新职位</Button>
          </Link>
        </WingBlank>
        // <WhiteSpace/>
        :<List >
          {JobListData.map((item,index) =>
            <Link href={`/publishedJobDetail?jobId=${item.jobId}`} key={index}>
              <Item arrow="horizontal" multipleLine onClick={() => {}}>
                <Name>{item.jobName}</Name>
                <Brief>
                  <Fragment>
                    <span>{item.address}/</span>
                    <span>{ageLimitDic[item.ageLimit]}/</span>
                    <span>{item.education}/</span>
                    <span>{natureDic[item.nature]}</span>
                  </Fragment>
                </Brief>
              </Item>
            </Link>
          )}
        </List>
    }
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
