import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/contentLayout';
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'

const Wrapper = styled.div`
  padding: 15px;
  background: #fff;
  margin-bottom: 15px;
`
const Name = styled.div`
  color: #000;
  font-size: 22px;
  line-height: 1.45;
  font-weight: 600;
  font-family: 'PingFangSC-Medium';
  @media (min-width:320px) {
    font-size: 21px;
    line-height: 30px;
  }
  @media(min-width: 375px) {
    font-size: 24px;
    line-height: 34px;
  }
  @media (min-width:360px) {
    font-size: 23px;
    line-height: 31px;
  }
`
const Title = styled.div`
  font-size:14px;
  padding:0 10px;
  border-left: 2px solid rgb(238,86,72);
`
const Base = styled.div`
  color:#969696;
  font-size: 12px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`
const More = styled.div`
  color:rgb(238,86,72);
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`

const I = styled.i`

`
const loanType = ['信用贷款','抵押贷款'];
const city = ['深圳','广州','东莞','珠海','惠州','中山'];
const age = ['18岁以下','18-24','25-55','55岁以上'];
const location = ['深户','非深户','港澳台','外籍'];
const education = [];
const maritalStatus = [];
class MatchDetail extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const res = await fetch(`/selectModelUserDetail?matchNo=${query.matchNo}`, token)
    console.log(res)
    //总利息
    return { product: res }
  }
  componentDidMount(){

  }
  render() {
    const i = this.props.product;
    console.log(i,"iiiiiiii")
    //贷款需求
    const loanDemand = i.loanDemand || {};
    //基本信息
    const basicInformation = i.basicInformation|| {};
    //征信信息
    const creditInformation = i.creditInformation|| {};
    // 工作收入
    const income = i.income|| {};
    // 资产状况
    const assets = i.assets|| {};
    //资产负债
    const capitalDebtSituation = i.capitalDebtSituation|| {};
    return (
      <Layout>
        <Wrapper>

           <Name><span>{loanDemand.name}</span></Name>
          <Base>
            <span><i className="hj"></i><span>{city[loanDemand.city]}</span></span>
            <span><i className="shijian"></i><span>{age[basicInformation.age]}</span></span>
            <span><i className="xueli"></i><span>{education[basicInformation.education]}</span></span>
            <span><i className="hunyin"></i><span>{maritalStatus[basicInformation.maritalStatus]}</span></span>
          </Base>
          <More>
            <span><i className="daikuan"></i><span>期望贷款：{loanDemand.exLoanAmount}万</span></span>
            <span><i className="leixing"></i><span>贷款类型：{loanDemand.loanType}</span></span>
          </More>
        </Wrapper>
        <Wrapper>
          <Title>基本信息</Title>
        </Wrapper>
        <style jsx>{`
          span{
            margin-left:4px;
          }
          i{
            height:12px;
            width:12px;
            display:inline-block;
            background-size:100% 100%;
          }
          .hj{
            width:12px;
            background-image:url(/static/huji.png);
          }
          .shijian{
            width:12px;
            background-image:url(/static/shijian.png);
          }
          .xueli{
            background-image:url(/static/xueli.png);
          }
          .hunyin{
            background-image:url(/static/hunyin.png);
          }
          .daikuan{
            background-image:url(/static/daikuan.png);
          }
          .leixing{
            background-image:url(/static/leixing.png);
          }

        `}
        </style>
      </Layout>
    )
  }
}

export default MatchDetail;
