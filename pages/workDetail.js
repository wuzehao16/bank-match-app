import React ,{ Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { List , WhiteSpace, WingBlank, Toast, Button } from 'antd-mobile'
import fetch from '../lib/fetch';
import { getCookie } from '../lib/util'
import Layout from '../layout/RecruitLayout'
import { sendResume } from '../services/recruit'

const Item = List.Item;
const Brief = Item.Brief

const Name = styled.span`
  font-size: 14px;
  color: #404040;
  margin-right: 10px;
`
const Info = styled.span`
  font-size: 12px;
  color: #999;
`
const Divide = styled.span`
  display:inline-block;
  margin: 0 3px;
`

const Wrapper =styled.div`
  padding: 5px 15px;
  background-color: #fff;
`
const ICard = styled.div`
  padding: 15px;
  border: solid 1px #f1f1f1;
  position: relative;
`
const Divider = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  margin: 20px 0;
`
const Title = styled.div`
  font-size: 16px;
  color: #242424;
  font-weight: 500;
  margin: 25px 0;
  display: flex;
  align-items: center;        
`
const Line = styled.div`
  height: 1px;
  margin: 0 10px;
  width: 80%;
  background-color: #f2f2f2;
`
const Card = styled.div`
  background-color: #fafafa;
  border: solid 1px #f2f2f2;
  height: 82px;
`
const nature = ["","全职","兼职","实习"]
const scale = ['','20人以下','20-49人','50-99人','100-499人','500人以上']
const ageLimit = ["","经验不限","应届生","一年以下","1-3年","3-5年","5-10年","10年以上"]
const expectSalary = ['面议','2k以下','2k-5k','5k-10k','10k-15k','15k-25k','25k-50k','50k以上']

class WorkDetail extends React.PureComponent {
  static async getInitialProps ({query}) {
    // eslint-disable-next-line no-undef
    const jobDetail = await fetch(`/getJobDetail?jobId=${query.jobId}`);
    console.log('jobDetail',jobDetail)

    const education = await fetch('/selectByType?type=education')

    return {
            jobDetail: jobDetail || {},
            jobId: query.jobId,
            companyId: query.companyId,
            dic:{
              ageLimitDic: ageLimit,
              educationDic: education,
              natureDic: nature,
              expectSalaryDic: expectSalary,
              scaleDic: scale,
            }
          };
  }

 async handleClick () {
    const res = await sendResume({mail:this.props.jobDetail.mail});
    if (res.code == 0) {
      Toast.success('发送成功', 1);
    }else {
      Toast.offline(res.msg, 1);
    }
  }

  render() {
    const {jobDetail, dic, jobId} = this.props;
    console.log('jobDetail',jobDetail)
    console.log('dic',dic)
    return (
      <Layout>
        <Wrapper>
          <ICard>
            <div className="name">{jobDetail.jobName}</div>
            <div className="info">{jobDetail.address}/{dic.ageLimitDic[jobDetail.ageLimit]}/{jobDetail.education}</div>
            <div className="salary">{dic.expectSalaryDic[jobDetail.salary]}</div>
            <div className="logo"><img src={jobDetail.logo}/></div>
            <Divider></Divider>
            <div className="address"><i className="iconfont icon-city" style={{fontSize:'14px'}}></i>{jobDetail.address}</div>
            <div className="address-detail">{jobDetail.addressDetial}</div>
          </ICard>
           <Title>
             <span className="title">职位描述</span>
           </Title>
              <div style={{fontSize:'14px',color:'#333'}} dangerouslySetInnerHTML={{
                      __html: jobDetail.jobDesribe
                  }}
              >
              </div>
           <Title>
             <span className="title">公司信息</span>
           </Title>
           <List>
              <Item
                align="top"
                thumb={jobDetail.logo}
                multipleLine>        
                <Name>{jobDetail.companyName}</Name>
                <Brief>
                  <Fragment>
                    <Info>{dic.scaleDic[jobDetail.scale]}<Divide>|</Divide></Info>
                    <Info>{jobDetail.organizationCategory}</Info>
                  </Fragment>
                </Brief>
              </Item>
            </List>
        </Wrapper>
        <WingBlank>
          <Button onClick={this.handleClick.bind(this)} type="primary" style={{marginTop:'30px',fontSize:'14px'}}>发送简历</Button>
        </WingBlank>
        <style jsx>{`
          .name{
            font-size:16px;
            font-weight:bold;
            line-height:15px;
          }
          .logo img{
            position:absolute;
            top:15px;
            right:15px;
            height:45px;
            width:45px;
            border: solid 1px #f2f2f2;
            margin-bottom:20px;
          }
          .info{
            font-size:11px;
            line-height:15px;
            margin:17px 0 10px;
          }
          .salary {
            color: #ee5648;
            font-size: 13px;
          }
          .address{
            font-size:14px;
            margin-bottom:10px;
            color: #242424;
          }
          .address-detail{
            font-size: 10px;
            color: #989898;
          }
          .title{
            flex: 0 0 75px;
          }
          .am-list-item .am-list-line .am-list-brief{
            font-size: 12px !important;
            color: #999 !important;
          }
          .am-list-item .am-list-thumb  img{
            width: 55px !important;
            height: 55px !important;
          }
        `}</style>
      </Layout>
    )
  }
}

export default WorkDetail;
