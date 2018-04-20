import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Steps, { Step } from 'rmc-steps';
import 'isomorphic-unfetch';
import Layout from '../layout/Elayout';
import '../styles/iconfont.css';
import stylesheet from '../styles/index.css';
import fetch from '../lib/fetch';
import getCookie from '../lib/getCookie'
const Pd = styled.div`
  padding: 0 15px;
  background: #fff;
  margin-bottom: 5px;
`
const Label= styled.span`
  color: #969696;
  background: #f2f2f2;
  font-size: 8px;
  border: 1px solid #e5e5e5;
  padding: 2px 4px;
  margin: 7px 12px 7px 0;
  display: inline-block;
`
const Title =styled.div`
  height: 28px;
  width: 60px;
  line-height: 28px;
  color: #646464;
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid #ee5648;
`
const TitleContainer = styled.div`
  border-bottom:1px solid #f2f2f2;
`
const Box =styled.div`
  padding: 0 15px 18px 15px;
  background: #fff;
  margin-bottom: 5px;
`
const Input = styled.input`
  border:1px solid papayawhip;
  box-shadow: none;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 0px;
`
const Square = styled.span`
  background: ${props => {
    return props.primary
    }
};
  display: inline-block;
  height: 12px;
  width: 12px;
  margin-right: 12px;
`
const InfoRight = styled.div`
  padding:27px 0 0 33px;
  position:relative;
  font-size: 12px;
  @media (min-width:320px) {
    padding: 27px 0 0 22px;
    font-size: 11px;
  }
  @media(min-width: 360px) {
    padding: 27px 0 0 23px;
    font-size: 12px;
  }
  @media (min-width:375px) {
    padding: 27px 0 0 24px;
    font-size: 13px;
  }
`
const Notice = styled.div`
  color:#969696;
  font-size:8px;
  @media (min-width:320px) {
    width:140px;
  }
  @media(min-width: 360px) {
    width:160px;
  }
  @media (min-width:375px) {
    width:160px;
  }


`
class ProductDetail extends React.PureComponent {
  static async getInitialProps ({query, req}) {
    // eslint-disable-next-line no-undef
    // const token = getCookie('token',req)
    const res = await fetch(`/getProductInfomationDetails?productId=${query.productId}`)
    //总利息
    res.productTimeMin = res.productTimeLimit.split("-")[0];
    res.productTimeMax = res.productTimeLimit.split("-")[1];
    res.productLoad =res.productMaxLoad
    res.productTime =res.productTimeMax
    return { product: res }
  }
  state = {
    productTimeMax: 1,
    productMaxLoad: 1,
    monthlyFeeRate: 1,
  }
  componentDidMount () {
    //计算利息和月供
    this.setState({
      ...this.props.product,
    })
    this.countPie()
  }
  //计算饼图信息
  countPie = (value) => {
    var product;
    var productTime;
    this.state.productName?product = this.state:product = this.props.product
    if(value){
      productTime = value
    } else {
      productTime = product.productTime
    }
    console.log(this.state)
    const productLoad = product.productLoad* 10000;
    const monthlyPayment= (productLoad/productTime)+(productLoad*product.monthlyFeeRate/100);
    const interest = monthlyPayment * productTime - productLoad;
    this.myChart(productLoad,interest)
  }
  //先息后本和等额本息月供
  countMonthlyPayment1 = () => {
    const product = this.state;
    return product.productMaxLoad* 10000*product.monthlyFeeRate/100;
  }
  //等额本息月供
  countMonthlyPayment2 = (productTimeMax = 1) => {
    const product = this.state;
    const productLoad = product.productLoad* 10000;
    50/24+500000*0.75/100
    500000/60+500000*0.75/100
    return Math.round((productLoad/productTimeMax)+ productLoad*product.monthlyFeeRate/100);
  }
  //总利息
  countInterest = (productTimeMax) => {
    const product = this.state;
    return Math.round(product.productLoad* 10000*product.monthlyFeeRate/100*productTimeMax);
  }
  //手续费
  countPoundage =  (poundage = 0) => {
    const product = this.props.product
    return product.productMaxLoad* 10000* poundage /100;
  }
  // 画图
  myChart (productMaxLoad, interest) {
    var myChart = echarts.init(document.getElementById('main'));

    var option = {
      title : {
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series : [
          {
              name:'利息占比',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              tooltip:{
                position: ['50%', '50%']
              },
              label: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: false
                  }
              },
              lableLine: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: false
                  }
              },
              data:[
                  {value:productMaxLoad, name:'贷款金额'},
                  {value:interest, name:'利息'},
              ],
              color:['#ff7c70', '#fbc02d'],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  // changeProductTimeLimit
  changeLoanAmount = (e) =>{
    const productMaxLoad = Number(this.state.productMaxLoad);
    let value = e.target.value ;
    if (!value) return
    if (value < 0) {
      value = 1
    } else if (value > productMaxLoad) {
      value = productMaxLoad
    }
    this.setState({
      productLoad: value
    })
  }
  changeProductTimeLimit = (e) =>{
    // debugger;
    const productTimeMax = Number(this.state.productTimeMax);
    const productTimeMin = Number(this.state.productTimeMin);
    let value = e.target.value ;
    if (!value) return
    if (value < productTimeMin) {
      value = productTimeMin
    } else if (value > productTimeMax) {
      value = productTimeMax
    }
    // this.myChart(productMaxLoad, interest)
    this.setState({
      productTime: value
    })
    this.countPie(value)
  }
  render() {
    let product = this.props.product;
    if (this.state.productName) {
      product = this.state;
    }
    return (

      <Layout title="产品详情">
        <Pd>
          <div className="head">
            <div className="title-container">
              <div className="title">{product.productName}</div>
              <div className="sub-title">{product.productRecommend}</div>
            </div>
            <div>
              <div className="logo">
                <img src={product.manageLogoId} alt="" width={100} height={35}/>
              </div>
            </div>
          </div>
          <div className="tip">
            {
              product.productFeatures.split(',').map(v => {
                return (
                  <Label
                    key={v}
                    >{v}</Label>
                )
              })
            }
          </div>
        </Pd>
        <Pd>
          <div className="info">
            <div>
              <div className="pie" id="main"></div>
              <Notice>{product.productNotice}</Notice>
            </div>
            <InfoRight>
              <div className="pie-info">
                <div><Square primary="#ff7c70"/>贷款<span className="pie-info-detail">{product.productLoad}万/{product.productTime||product.productTimeMax}期</span></div>
                <div><Square primary="#fbc02d"/>利息<span className="pie-info-detail">{this.countInterest(product.productTime)}元({product.monthlyFeeRate}%/月)</span></div>
                <div><Square primary="#beb1ff"/>月供<span className="pie-info-detail">{this.countMonthlyPayment2(product.productTime)}元</span></div>
                <div><Square primary="#00ddb0"/>手续费<span className="pie-info-detail">{this.countPoundage(product.productPoundage)}元/{product.productPoundage?product.productPoundage:0.00}%</span></div>
              </div>
              <Input type="number" min={3}  onBlur={this.changeLoanAmount}  placeholder={`输入借款额度(1-${product.productMaxLoad}万)`}/><span className="after">万</span>
              <Input type="number" min={1}  onBlur={ this.changeProductTimeLimit }  placeholder={`输入借款期限(${product.productTimeLimit}月)`}/><span className="after">期</span>
            </InfoRight>
          </div>
        </Pd>
        {
          product.productIntroduction
          ?        <Box
                      >
                    <TitleContainer>
                      <Title>产品介绍</Title>
                    </TitleContainer>
                    <div
                      dangerouslySetInnerHTML={{
                          __html: product.productIntroduction
                      }}>
                    </div>
                  </Box>:null
        }
        {
          product.basieReq
          ?        <Box>
                    <TitleContainer>
                      <Title>基本要求</Title>
                    </TitleContainer>
                    <div
                      dangerouslySetInnerHTML={{
                          __html: product.basieReq
                      }}>
                    </div>
                  </Box>:null
        }
        {
          product.creditReq
          ?        <Box>
                    <TitleContainer>
                      <Title>征信要求</Title>
                    </TitleContainer>
                    <div
                      dangerouslySetInnerHTML={{
                          __html: product.creditReq
                      }}>
                    </div>
                  </Box>: null
        }
        {
          product.claims
          ?        <Box>
                    <TitleContainer>
                      <Title>负债要求</Title>
                    </TitleContainer>
                    <div
                      dangerouslySetInnerHTML={{
                          __html: product.claims
                      }}>
                    </div>
                  </Box>: null
        }
        {
          product.positonCount
          ?        <Box>
                    <TitleContainer>
                      <Title>额度计算</Title>
                    </TitleContainer>
                    <div
                      dangerouslySetInnerHTML={{
                          __html: product.positonCount
                      }}>
                    </div>
                  </Box>: null
        }
        {
          product.otherReq
          ?        <Box>
                    <TitleContainer>
                      <Title>其他要求</Title>
                    </TitleContainer>
                    <div
                      dangerouslySetInnerHTML={{
                          __html: product.otherReq
                      }}>
                    </div>
                  </Box> :null
        }
        {
          product.applyFlow
          ?        <Box>
                    <TitleContainer>
                      <Title>申请流程</Title>
                    </TitleContainer>
                    <div className="step">
                      <Steps progressDot size="small" current={product.applyFlow.split(',').length}>
                        {
                          product.applyFlow.split(',').map(v => {
                            if (v=="") return
                            return(
                                <Step title={v}  />
                            )
                          })
                        }
                      </Steps>
                    </div>
                    <div className="more">
                      <div className="more-img"></div>
                    </div>
                  </Box> :null
        }
        <style jsx>{`
          .head{
            padding: 30px 0;
            display:flex;
            border-bottom:1px solid #f2f2f2;
          }
          .title-container{
            width: 185px;
            padding-left:5px;
            text-overflow: ellipsis;
            text-align:center;
            white-space:nowrap;
          }
          .title{
            color:#3c3c3c;
            font-size:16px;
          }
          .sub-title{
            font-size:12px;
            color:#646464;
          }
          .logo{
            width:100px;
            height:35px;
            margin-left:20px;
            background: #000;
          }
          .info{
            height:170px;
            display:flex;
          }
          .after {
            margin-left: -18px;
            vertical-align: middle;
            font-size:12px;
            display: inline-block;
          }
          .pie{
            width:135px;
            height:135px;
          }
          .pie-info{
            color:#646464;
            // font-size:12px;
          }
          .pie-info div{
            height:22px;
            line-height:22px;
            display:flex;
            align-items: center;
          }
          .pie-info-detail{
            margin-left:10px;
          }
          .step{
            margin-top:30px;
            width:100%;
            overflow:hidden;
          }
          .more{
            height:100px;
          }
          .more-img{
            height:38px;
            width:131px;
            background: url(/static/product_img.png);
            background-size:100% 100%;
            margin:40px auto;
          }
        `}
        </style>
      </Layout>

    )
  }
}

export default ProductDetail;
