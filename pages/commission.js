import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Elayout'
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'

const Title = styled.div`
  height: 136px;
  color: #fff;
  text-align: center;
  background-image: linear-gradient(90deg,#ff7063 0%,#ee5648 75%),linear-gradient(#ee5648,#ee5648);
	background-blend-mode: normal,normal;
	box-shadow: inset 0px -3px 8px 0pxrgba(0, 0, 0, 0.15);
`
const Name = styled.div`
  margin: 0 auto;

  padding-top: 41px;
  font-size: 13px;
`
const Balance = styled.div`
  margin: 0 auto;
  margin-top: 21px;
  font-size: 25px;
`
const Income = styled.div`
  height: 80px;
  font-size: 13px;
  color: #969696;
  text-align: center;
  display: flex;
  background-color: #ffffff;
`
const Graph = styled.div`
  height: 387px;
`

export default class extends React.Component {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const res = await await fetch(`/myIncomes`,token)
    return { item: res }
  }

  componentDidMount () {
    // 基于准备好的dom，初始化echarts实例
    const item = this.props.item
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        color: ['#969696'],
        tooltip: {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type : 'category',
            data: item.xaxis,
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {},
        series: [{
            name: '元',
            type: 'bar',
            barWidth:'20%',
            data: item.yaxis
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  render () {
    const item = this.props.item;
    return (
      <Layout title="我的佣金">
        <Title>
          <Name>本月已结算余额(元)</Name>
          <Balance>{item.mothBalance || 0}元</Balance>
        </Title>
        <Income>
          <div className="price left">
            <div>待结算金额(元)</div>
            <div>{item.openAmt}</div>
          </div>
          <div className="price">
            <div>累计收益(元)</div>
            <div>{item.sumAmt}</div>
          </div>
        </Income>
        <Graph id="main"></Graph>
        <style jsx >{`
          .price{
            width:50%;
          }
          .left{
            border-right:1px solid #f2f2f2;
          }
          .price div:first-child{
            margin-top:20px;
          }
          .price div:nth-child(2){
            margin-top:15px;
          }
        `}
        </style>
      </Layout>
    )
  }
}
