import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/Elayout'
import fetch from '../lib/fetch'

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
  static async getInitialProps({query}) {
		return {
			item: await fetch(`/item/${query.id}`)
		}
	}
  componentDidMount () {
    // 基于准备好的dom，初始化echarts实例
    console.log(this.props.item)
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
            data: ["2017-11","2017-12","2018-1","2018-2","2018-3","2018-4"],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {},
        series: [{
            name: '元',
            type: 'bar',
            barWidth:'40%',
            data: [200, 400, 600, 800, 600,1000]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  render () {
    return (
      <Layout>
        <Title>
          <Name>本月已结算余额(元)</Name>
          <Balance>2200.00元</Balance>
        </Title>
        <Income>
          <div className="price left">
            <div>待结算金额(元)</div>
            <div>0</div>
          </div>
          <div className="price">
            <div>待结算金额(元)</div>
            <div>0</div>
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
