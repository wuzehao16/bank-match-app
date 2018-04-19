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
  @media (min-width:360px) {
    font-size: 23px;
    line-height: 31px;
  }
  @media(min-width: 375px) {
    font-size: 24px;
    line-height: 34px;
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

const L = styled.span`
  color: #969696;
  font-size: 14px;
`
const R = styled.span`
  color: #646464;
  font-size: 14px;
`
const Li = styled.div`
  line-height: 30px;
`
const Divide = styled.div`
  height: 1px;
  background: #f2f2f2;
  margin: 10px 0;
`
const SubTitle = styled.div`
  color: #646464;
  font-size: 14px;
`
const loanType = ['信用贷款', '抵押贷款'];

const city = ['深圳', '广州', '东莞', '珠海', '惠州', '中山'];

const age = ['18岁以下', '18-24', '25-55', '55岁以上'];

const maritalStatus = ['已婚', '未婚', '离异', '丧偶'];

const location = ['深户', '非深户', '港澳台', '外籍'];

const education = ['本科及以上', '全日制大专', ' 高中以下', '自考/函授'];

const occupation = ['工薪族', '企业主', '工薪/企业主', '自由职业'];

const unitProperty = ['公立教师/医生', '公务员', '事业单位', '高新企业', '主板上市公司', '普通公司', '上市公司', '世界500强'];

const salaryDistribution = ['扣税代发', '固定转账', '现金发放'];

const workTime = ['3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const monthAvgSalary = ['4千以下', '4-5千', '5-6千', '6-8千', '8千-1万', '1万以上'];

const isInsurance = ['无', '有'];

const insuranceBase = ['4千以下', '4-5千', '5-6千', '6-8千', '8千以上'];

const insurancePaymonth = ['3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const isProvidentFund = ['无', '有'];

const providentFundBase = ['4千以下', '4-5千', '5-6千', '6-8千', '8千以上'];

const providentFundPaymonth = ['3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const licenseRegistTime = ['暂未注册', '3个月以下', '3-6个月', '6-12个月', '12-24个月', '24个月以上'];

const invoiceValue = ['2万以下', '2-10万', '10-100万', '100万以上'];

const shareRatio = ['0%', '0%-10%', '10%-20%', '20%以上'];

const recordTime = ['无', '1-3个月', '3-6个月', '6-12个月', '12个月以上'];

const sumPettyLoan = ['无', '1笔', '2笔', '3笔', '3笔以上'];

const sumConsumerFinanceLoan = ['无', '1笔', '2笔', '3笔', '3笔以上'];

const particleLoanLimit = ['3千以下', '3-5千', '5千-1万', '1万以上'];

const isLoanClose = ['无', '有'];

const isLoanLoss = ['无', '有'];

const isOverdue = ['无', '有'];

const overdueCategory = ['信用卡逾期', '贷款逾期', '信用卡/贷款逾期'];

const overdueDays = ['3天以下', '3-7天', '8-15天', '15天以上'];

const creditCardOverdueMoney = ['5百以下', '5百-1千', '1千-2千', '2千以上'];

const loanOverdueMoney = ['5百以下', '5百-1千', '1千-2千', '2千以上'];

const isTwoMonthsOverdue = ['无', '有'];

const isThreeMonthsOverdue = ['无', '有'];

const isSixMonthsOverdue = ['无', '有'];

const isOneYearOverdue = ['无', '有'];

const isTwoYearsOverdue = ['无', '有'];

const isFiveYearsOverdue = ['无', '有'];

const isInsuranceAdjustment = ['无', '半年内有', '一年内有'];

const isProvidentFundAdjustment = ['无', '半年内有', '一年内有'];

const isHouseProperty = ['无', '有'];

const housePropertyDependency = ['深房', '省内房产', '省外房产'];

const ownership = ['本人', '配偶', '子女', '父母', '联名房'];

const propertyType = ['住宅', '公寓', '商铺', '写字楼', '自建房', '厂房', '别墅'];

const propertyStatus = ['红本在手', '银行按揭', '银行抵押'];

const repaymentMethod = ['等额本息', '先息后本', '随借随还'];

const businessPolicy = ['无', '有'];
const isFamilyCar = ['无', '有'];

const policyBrand = ['中国平安', '中国人寿', '新华保险', '泰康人寿', '太平保险', '民生保险', '天安保险', '华夏人寿', '中邮人寿', '友邦保险', '安邦人寿', '招商信诺', '工银安盛', '安联保险', '中英保险', '阳光保险', '太平洋保险', '中国人民人寿', '高德生命人寿', '其他'];

const policyBrandPaymentMethod = ['年缴', '季缴', '月缴', '趸缴'];

const policyPaymentYears = ['1年以下', '1-2年', '2-3年', '3年以上'];

const carRegistStatus = ['绿本在手', '银行按揭', '信用卡按揭', '车贷机构抵押', '汽车金融按揭'];
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
    // const house = assets.housePropertyDependency.length;
    var h  = assets.housePropertyDependency || []
    const House = h.map((k,index) => {
      return (
        <div key={index}>
          <SubTitle>房产{index+1}:</SubTitle>
          <Li><L>名下房产属地：</L><R>{housePropertyDependency[assets.housePropertyDependency[index]]}</R></Li>
          <Li><L>产权归属：</L><R>{ownership[assets.ownership[index]]}</R></Li>
          <Li><L>产权占比（%）：</L><R>{assets.propertyRightRatio[index]}</R></Li>
          <Li><L>房产类型：</L><R>{propertyType[assets.propertyType[index]]}</R></Li>
          <Li><L>房产状态：</L><R>{propertyStatus[assets.propertyStatus[index]]}</R></Li>
          <Li><L>还款方式：</L><R>{repaymentMethod[assets.repaymentMethod[index]]}</R></Li>
          <Li><L>本笔抵押贷款余额（元）：</L><R>{assets.mortgageBalance[index]}</R></Li>
          <Li><L>每月还款金额（元）</L><R>{assets.mortgageMonthRepayment[index]}</R></Li>
          <Li><L>本笔抵押贷款期限（月）：</L><R>{assets.mortgageMonthRepayment[index]}</R></Li>
          <Li><L>已还月份数（月）：</L><R>{assets.returnedMonths[index]}</R></Li>
          <Li><L>本房产总面积（平）：</L><R>{assets.propertyTotalArea[index]}</R></Li>
          <Li><L>本房产总市值（万元）：</L><R>{assets.propertyTotalMarketValue[index]}</R></Li>
        </div>
      )
    })
    var c = assets.carRegistStatus || []
    const Car = c.map((k,index) => {
      return (
        <div key={index}>
          <SubTitle>辆车{index+1}:</SubTitle>
          <Li><L>车辆登记状态：</L><R>{carRegistStatus[assets.carRegistStatus[index]]}</R></Li>
          <Li><L>车辆贷款余额：</L><R>{assets.carLoanBalance?assets.carLoanBalance[index]:''}</R></Li>
          <Li><L>车辆残值评估价格（元）：</L><R>{assets.carPotentialPrice?assets.carPotentialPrice[index]:''}</R></Li>
          <Li><L>车贷还款金额（元）：</L><R>{assets.carRepayment?assets.carRepayment[index]:''}</R></Li>
          <Li><L>车贷还款月份（月）：</L><R>{assets.carrRepaymentMonths?assets.carrRepaymentMonths[index]:''}</R></Li>
        </div>
      )
    })
    var p = assets.policyBrand || []
    const policy = p.map((k,index) => {
      return (
        <div key={index}>
          <SubTitle>保单{index+1}:</SubTitle>
          <Li><L>保单品牌：</L><R>{policyBrand[assets.policyBrand[index]]}</R></Li>
          <Li><L>其他保单品牌：</L><R>{assets.otherPolicyBrand?assets.otherPolicyBrand[index]:''}</R></Li>
          <Li><L>保单缴纳方式：</L><R>{policyBrandPaymentMethod[assets.policyBrandPaymentMethod[index]]}</R></Li>
          <Li><L>保单缴费时长：</L><R>{policyPaymentYears[assets.policyPaymentYears[index]]}</R></Li>
          <Li><L>保单缴费金额（元）：</L><R>{assets.policyPayment?assets.policyPayment[index]:''}</R></Li>
        </div>
      )
    })
    return (
      <Layout title="匹配详情">
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
            <span><i className="leixing"></i><span>贷款类型：{loanType[loanDemand.loanType]}</span></span>
          </More>
        </Wrapper>
        <Wrapper>
          <Title>基本信息</Title>
          <Li><L>职业类别：</L><R>{occupation[basicInformation.occupation]}</R></Li>
          {
            (basicInformation.occupation == 0 || basicInformation.occupation ==2)
              ? <div>
                <Li><L>单位性质：</L><R>{unitProperty[basicInformation.unitProperty]}</R></Li>
                <Li><L>工资发放方式：</L><R>{salaryDistribution[basicInformation.salaryDistribution]}</R></Li>
                <Li><L>现单位上班时长：</L><R>{workTime[basicInformation.workTime]}</R></Li>
                <Li><L>现单位月均工资：</L><R>{monthAvgSalary[basicInformation.monthAvgSalary]}</R></Li>
                <Li><L>社保有无缴纳：</L><R>{basicInformation.isInsurance==1?'是':'否'}</R></Li>
                {
                  basicInformation.isInsurance==1
                    ? <div>
                        <Li><L>现单位社保缴纳基数: </L><R>{insuranceBase[basicInformation.insuranceBase]}</R></Li>
                        <Li><L>现单位社保连续缴纳时长：</L><R>{insuranceBase[basicInformation.insuranceBase]}</R></Li>
                      </div> :null
                }
                <Li><L>公积金有无缴纳：</L><R>{basicInformation.isProvidentFund==1?'是':'否'}</R></Li>
                {
                  basicInformation.isProvidentFund==1
                    ? <div>
                        <Li><L>现单位公积金缴纳基数: </L><R>{providentFundBase[basicInformation.providentFundBase]}</R></Li>
                        <Li><L>现单位公积金连续缴纳时长：</L><R>{providentFundPaymonth[basicInformation.providentFundPaymonth]}</R></Li>
                      </div> :null
                }
              </div>:null
          }
          {
            (basicInformation.occupation == 1 || basicInformation.occupation ==2)
              ? <div>
                <Li><L>企业一年开票金额：</L><R>{licenseRegistTime[basicInformation.licenseRegistTime]}</R></Li>
                <Li><L>股份占比：</L><R>{shareRatio[basicInformation.shareRatio]}</R></Li>
                <Li><L>是否法人：</L><R>{basicInformation.isLegalPerson==1?'是':'否'}</R></Li>
                <Li><L>单位座机是否能正常接听：</L><R>{basicInformation.isPhoneCall==1?'是':'否'}</R></Li>
                <Li><L>公司是否方便实地考察：</L><R>{basicInformation.isInvestigate==1?'是':'否'}</R></Li>
              </div>:null
          }

        </Wrapper>
        <Wrapper>
          <Title>征信情况</Title>
          <Li><L>征信记录时长：</L><R>{recordTime[creditInformation.recordTime]}</R></Li>
          <Li><L>名下上征信小额贷款笔数：</L><R>{sumPettyLoan[creditInformation.sumPettyLoan]}</R></Li>
          <Li><L>名下上征信消费金融类贷款笔数：</L><R>{sumConsumerFinanceLoan[creditInformation.sumConsumerFinanceLoan]}</R></Li>
          <Li><L>是否使用过微粒贷：</L><R>{creditInformation.isParticleLoan==1?'是':'否'}</R></Li>

          {
            creditInformation.isParticleLoan == 1
             ? <Li><L>使用微粒额度：</L><R>{particleLoanLimit[creditInformation.particleLoanLimit]}</R></Li> : null
          }

          <Li><L>名下贷款/信用卡账户状态是否有冻结/呆账/止付/挂失/收卡/作废：</L><R>{isLoanClose[creditInformation.isLoanClose]}</R></Li>
          <Li><L>名下贷款/信用卡五级分类是否有关注/次级/可疑/损失：</L><R>{isLoanLoss[creditInformation.isLoanLoss]}</R></Li>
          <Divide />
          <Li><L>当前是否有逾期：</L><R>{isOverdue[creditInformation.isOverdue]}</R></Li>
          {
            creditInformation.isOverdue == 1
              ? <div>
                <Li><L>当前逾期类别：</L><R>{overdueCategory[creditInformation.overdueCategory]}</R></Li>
                <Li><L>当前逾期天数：</L><R>{overdueDays[creditInformation.overdueDays]}</R></Li>
                <Li><L>当前信用卡逾期金额：</L><R>{creditCardOverdueMoney[creditInformation.creditCardOverdueMoney]}</R></Li>
                <Li><L>当前贷款逾期金额：</L><R>{loanOverdueMoney[creditInformation.loanOverdueMoney]}</R></Li>
                <Li><L>当前逾期是否已经结算：</L><R>{creditInformation.isOverdueBalance == 1?'是':'否'}</R></Li>
                <Li><L>近2个月内逾期的情况：</L><R>{isTwoMonthsOverdue[creditInformation.isTwoMonthsOverdue]}</R></Li>
                <Li><L>近3个月内逾期的情况：</L><R>{isThreeMonthsOverdue[creditInformation.isThreeMonthsOverdue]}</R></Li>
                <Li><L>近6个月内是否有逾期30天以上的情况：</L><R>{isSixMonthsOverdue[creditInformation.isSixMonthsOverdue]}</R></Li>
                <Li><L>近1年内是否有逾期60天以上的情况：</L><R>{isOneYearOverdue[creditInformation.isOneYearOverdue]}</R></Li>
                <Li><L>近2年内是否有逾期90天以上的情况：</L><R>{isTwoYearsOverdue[creditInformation.isTwoYearsOverdue]}</R></Li>
                <Li><L>近5年内是否有逾期120天以上的情况：</L><R>{isFiveYearsOverdue[creditInformation.isFiveYearsOverdue]}</R></Li>
              </div> :null
          }
          <Divide />
          <Li><L>近1个月查询次数：</L><R>{creditInformation.sumOneMonthQueries}</R></Li>
          <Li><L>近2个月查询次数：</L><R>{creditInformation.sumTwoMonthsQueries}</R></Li>
          <Li><L>近3个月查询次数：</L><R>{creditInformation.sumThreeMonthsQueries}</R></Li>
          <Li><L>近6个月查询次数：</L><R>{creditInformation.sumSixMonthsQueries}</R></Li>
          <Li><L>近12个月查询次数：</L><R>{creditInformation.sumOneYearQueries}</R></Li>
        </Wrapper>
        {
          (basicInformation.occupation == 0 || basicInformation.occupation ==2)
            ?         <Wrapper>
                      <Title>工作收入</Title>
                      <Li><L>单位名称：</L><R>{income.unitName}</R></Li>
                      <Li><L>本单位连续上班时间（月）：</L><R>{income.specificWorkTime}</R></Li>
                      <Li><L>近3个月税前月均收入（元）：</L><R>{income.threeMonthsAvgSalary}</R></Li>
                      <Li><L>近6个月税前月均收入（元）：</L><R>{income.SixMonthsAvgSalary}</R></Li>
                      <Li><L>近12个月税前月均收入（元）：</L><R>{income.thisYearMonthsAvgSalary}</R></Li>
                      <Li><L>上一年度税前月均收入（元）：</L><R>{income.lastYearMonthsAvgSalary}</R></Li>
                      <Divide />
                      <Li><L>社保缴纳基数（元）：</L><R>{income.specificInsuranceBase}</R></Li>
                      <Li><L>本单位连续缴纳月（月）：</L><R>{income.specificInsurancePaymonth}</R></Li>
                      <Li><L>是否有养老保险：</L><R>{income.isEndowmentInsurance==1?'有':'无'}</R></Li>
                      <Li><L>本单位社保基数调整：</L><R>{isInsuranceAdjustment[income.isInsuranceAdjustment]}</R></Li>
                      <Li><L>调整前社保缴纳基数（元）：</L><R>{income.exInsuranceBase}</R></Li>
                      <Li><L>公积金缴纳基数（元）：</L><R>{income.specificProvidentFundBase}</R></Li>
                      <Li><L>本单位连续缴纳月（月）：</L><R>{income.specificProvidentFundPaymonth}</R></Li>
                      <Li><L>本单位公积金基数调整：</L><R>{isProvidentFundAdjustment[income.isProvidentFundAdjustment]}</R></Li>
                      <Li><L>调整前公积金缴纳基数（元）：</L><R>{income.exProvidentFundBase}</R></Li>
                    </Wrapper> : null
        }
        <Wrapper>
          <Title>资产状况</Title>
          <Li><L>名下有无房产：</L><R>{isHouseProperty[assets.isHouseProperty]}</R></Li>
          {
            assets.isHouseProperty == 1
              ?<div>
                <Li><L>名下房产数量（套）：</L><R>{assets.sumHouseProperty}</R></Li>
                {/* 循环 */}
                {/* <Li><L>名下房产属地：</L><R>{housePropertyDependency[assets.housePropertyDependency]}</R></Li>
                <Li><L>产权归属：</L><R>{ownership[assets.ownership]}</R></Li>
                <Li><L>产权占比（%）：</L><R>{assets.propertyRightRatio}</R></Li>
                <Li><L>房产类型：</L><R>{propertyType[assets.propertyType]}</R></Li>
                <Li><L>房产状态：</L><R>{propertyStatus[assets.propertyStatus]}</R></Li>
                <Li><L>还款方式：</L><R>{repaymentMethod[assets.repaymentMethod]}</R></Li>
                <Li><L>本笔抵押贷款余额（元）：</L><R>{assets.mortgageBalance}</R></Li>
                <Li><L>每月还款金额（元）</L><R>{assets.mortgageMonthRepayment}</R></Li>
                <Li><L>本笔抵押贷款期限（月）：</L><R>{assets.mortgageMonthRepayment}</R></Li>
                <Li><L>已还月份数（月）：</L><R>{assets.returnedMonths}</R></Li>
                <Li><L>本房产总面积（平）：</L><R>{assets.propertyTotalArea}</R></Li>
                <Li><L>本房产总市值（万元）：</L><R>{assets.propertyTotalMarketValue}</R></Li> */}
                {House}
                <Divide></Divide>
              </div> :null
          }

          <Li><L>名下商业保单：</L><R>{businessPolicy[assets.businessPolicy]}</R></Li>
          {
            assets.businessPolicy == 1
              ?<div>
                <Li><L>保单份数（份）：</L><R>{assets.sumHouseProperty}</R></Li>
                {/* 循环 */}
                {policy}
                <Divide></Divide>
              </div> :null
          }
          <Li><L>名下是否有家用汽车：</L><R>{isFamilyCar[assets.isFamilyCar]}</R></Li>
          {
            assets.isHouseProperty == 1
              ?<div>
                <Li><L>名下车辆数（辆）：</L><R>{assets.sumHouseProperty}</R></Li>
                {/* 循环 */}
                {Car}
              </div> :null
          }
        </Wrapper>
        <Wrapper>
          <Title>资产负债</Title>
          <Li><L>信用类贷款（笔）：</L><R>{capitalDebtSituation.sumCreditLoan}</R></Li>

          <Li><L>等额本息类（笔）：</L><R>{capitalDebtSituation.sumEqualInterest}</R></Li>
          {
            capitalDebtSituation.sumEqualInterest > 0
              ? <div>
                <Li><L>等额本息类贷款总余额（元）：</L><R>{capitalDebtSituation.equalInterestTotalBalance}</R></Li>
                <Li><L>等额本息每月还款总额（元）：</L><R>{capitalDebtSituation.equalInteresMonthPayment}</R></Li>
              </div>:null
          }
          <Li><L>先息后本类（笔）：</L><R>{capitalDebtSituation.sumFirstInterest}</R></Li>
          {
            capitalDebtSituation.sumEqualInterest > 0
              ? <div>
                <Li><L>先息后本类贷款总余额（元）：</L><R>{capitalDebtSituation.firstInterestTotalBalance}</R></Li>
                <Li><L>先息后本每月还利息（元）：</L><R>{capitalDebtSituation.firstInterestMonthPayment}</R></Li>
              </div>:null
          }
          <Li><L>随借随还类（笔）：</L><R>{capitalDebtSituation.sumAlongLoan}</R></Li>
          {
            capitalDebtSituation.sumEqualInterest > 0
              ? <div>
                <Li><L>随借随还类贷款总余额（元）：</L><R>{capitalDebtSituation.alongLoanTotalBalance}</R></Li>
                <Li><L>随借随还每月还利息（元）:</L><R>{capitalDebtSituation.alongLoanMonthPayment}</R></Li>
              </div>:null
          }
          <Li><L>信用卡（笔）：</L><R>{capitalDebtSituation.sumCreditCard}</R></Li>
          {
            capitalDebtSituation.sumEqualInterest > 0
              ? <div>
                <Li><L>信用卡总额度（元）：</L><R>{capitalDebtSituation.creditCardTotalLimit}</R></Li>
                <Li><L>信用卡当月已使用额度（元）:</L><R>{capitalDebtSituation.creditCardUsedLimit}</R></Li>
                <Li><L>信用卡近6个月平均使用额度（元）:</L><R>{capitalDebtSituation.creditCardSixMonthsAvgUsedLimit}</R></Li>
                <Li><L>信用卡办理了分期还款数（张）:</L><R>{capitalDebtSituation.sumStagesCreditCard}</R></Li>
              </div>:null
          }

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
