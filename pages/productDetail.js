import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Steps, { Step } from 'rmc-steps';
import es6promise from 'es6-promise'
import 'isomorphic-unfetch';
import Layout from '../components/Elayout';
import '../styles/iconfont.css';
import stylesheet from '../styles/index.css';
es6promise.polyfill()

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
class ProductDetail extends React.PureComponent {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef

    const res = await fetch('http://47.106.70.82:8611/app/getProductInfomationDetails?productId=0007169ec657477e831ef8cee87edff4',{
      headers: {
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkNzk3OWY0MGQzZmE0ZTc0YTFjNGY0NjU4NmEyNWNjNyIsImlhdCI6MTUyMjYzMzczNCwiZXhwIjoxNTIzMjM4NTM0fQ.qq14ADKebQca0nieYISYJuPVyQHBVtwPb4zhtboJaTq52emgwNogK5JoWeVlq-O1c28USsx1U1WqHXhc7yhN9A'
      },
    })
    const json = await res.json()
    console.log("json",json)
    return { product: json.data }
  }

  componentDidMount () {
    var myChart = echarts.init(document.getElementById('main'));
    const product = this.props.product
    //计算利息和月供
    console.log(product)
    const productMaxLoad = product.productMaxLoad* 10000;
    const monthlyPayment= (productMaxLoad/product.productTimeLimit)+(productMaxLoad*product.monthlyFeeRate/100);
    // console.log(monthlyPayment)
    const interest = monthlyPayment * product.productTimeLimit - productMaxLoad;
    console.log(interest)
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
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
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
                  {value:product.productMaxLoad, name:'贷款金额'},
                  {value:interest, name:'利息'},
              ],
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
  render() {
    const product = this.props.product;
    return (

      <Layout>
        <Pd>
          <div className="head">
            <div className="title-container">
              <div className="title">{product.productName}</div>
              <div className="sub-title">{product.productRecommend.slice(0,9)}</div>
            </div>
            <div>
              <div className="logo">
                <img src={product.manageLogoId} alt="" width={100} height={35}/>
              </div>
            </div>
          </div>
          <div className="tip">
            {
              product.productPayWayName.split(',').map(v => {
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
              <div className="notice">{product.productNotice}</div>
            </div>
            <div className="info-r">
              <div className="pie-info">
                <div>贷款<span className="pie-info-detail">{product.productMaxLoad}万/{product.productTimeLimit}期</span></div>
                <div>利息<span className="pie-info-detail"></span></div>
                <div>月供<span className="pie-info-detail"></span></div>
                <div>手续费<span className="pie-info-detail"></span></div>
              </div>

            </div>
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
                      <Steps progressDot size="small" current={3}>
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
            width:10=0px;
            padding-left:45px;
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
            margin-left:60px;
            background: #000;
          }
          .info{
            height:170px;
            display:flex;
          }
          .info-r{
            padding:27px 0 0 33px;
          }
          .pie{
            width:135px;
            height:135px;
          }
          .notice{
            color:#969696;
            font-size:8px;
          }
          .pie-info{
            color:#646464;
            font-size:8px;
          }
          .pie-info div{
            height:25px;
            line-height:22px;
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
            height:125px;
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
