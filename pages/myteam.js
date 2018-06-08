import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Layout from '../layout/Elayout'
import fetch from '../lib/fetch'
import withRoot from '../src/withRoot';
import { getCookie } from '../lib/util'
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

const Income = styled.div`
  height: 80px;
  font-size: 13px;
  color: #969696;
  text-align: center;
  display: flex;
  background-color: #ffffff;
`
const Graph = styled.div`
  height: 322px;
  margin-top:50px;
  @media (min-width:320px) {
    height: 267px;
  }
  @media (min-width:360px) {
    height: 304px;
  }
  @media (min-width:375px) {
    height: 364px;
  }
  @media (min-width:414px) {
    height: 364px;
  }
`

class Myteam extends React.Component {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const res = await await fetch(`/getTeamsCountList`,token)
    return { i: res }
  }
  constructor (props) {
    super(props);
    const {   xaxis, ypaxis, yvaxis, newSum, timeSlotIncome } = this.props.i.sevenDays;
    this.state = {
      value: 'sevenDays',
      checkedA: true,
      timeSlotIncome: timeSlotIncome,
      newSum: newSum,
      xaxis: xaxis,
      ypaxis: ypaxis,
      yvaxis: yvaxis,
      type:'1' //1 收益 2 队员
    };
  }


  handleChange = (event, value) => {
    const { i } = this.props;
    this.setState({
      value:value,
      newSum:i[value].newSum,
      timeSlotIncome:i[value].timeSlotIncome,
      xaxis:i[value].xaxis,
      ypaxis:i[value].ypaxis,
      yvaxis:i[value].yvaxis,
    })
  };
  componentDidMount () {
    this.echarts();
  }
  handleSwitch = v => e => {
    this.setState({
      type: v
    })
  }
  echarts = () =>{
    var myChart = echarts.init(document.getElementById('main'));
    const {   xaxis, ypaxis, yvaxis, type } = this.state;
    // 指定图表的配置项和数据
    const y = (type == 1) ? yvaxis : ypaxis
    const name =(type == 1) ? '元' : '人'
    const max = (type == 1)
      ? function(value) {
        return value.max;
      }
      : function(value) {
        return value.max + 1;
      }
    var option = {
        color: ['#ee5648'],
        tooltip: {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              backgroundColor:'#ee5648'

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
            data: xaxis,
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: [{
          type:'value',
          minInterval: 1,
          max: max
        }],
        series: [{
            name: name,
            type: 'bar',
            barWidth:'20%',
            data: y
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  componentDidUpdate () {
    this.echarts();
  }
  render () {
    const { classes } = this.props;
    const { value, timeSlotIncome, newSum, xaxis, ypaxis, yvaxis, type } = this.state;
    const { i } = this.props;
    return (
      <Layout title="我的团队">
        <Income>
          <div className="price left">
            <div>当前队员数</div>
            <div>{i.totalPeople}</div>
          </div>
          <div className="price">
            <div>待结算金额(元)</div>
            <div>{ i.sumincomes || 0 }</div>
          </div>
        </Income>
          <BottomNavigation
            style={{
              marginTop:10
            }}
            value={value}
            onChange={this.handleChange}
            showLabels
          >
            <BottomNavigationAction label="最近7日" value="sevenDays"/>
            <BottomNavigationAction label="最近一个月"  value="thirtyDays"/>
            <BottomNavigationAction label="最近三个月" value="ninetyDays"/>
          </BottomNavigation>
          <Income>
            <div className="price left">
              <div>新增队友数</div>
              <div>{newSum}</div>
            </div>
            <div className="price">
              <div>佣金(元)</div>
              <div>{timeSlotIncome}</div>
            </div>
          </Income>
          <div className="switch">
            <div className={type == 1? 'income active':'income'} onClick={this.handleSwitch(1)}>佣金</div>
            <div className={type == 2? 'teammate active':'teammate'} onClick={this.handleSwitch(2)}>队员</div>
          </div>
            <Graph id="main"></Graph>
        <style jsx >{`
          .price{
            width:50%;
          }
          .price div:first-child{
            margin-top:20px;
          }
          .price div:nth-child(2){
            padding-top:15px;
            border-left: 1px solid #f2f2f2;
          }
          .switch{
            float:right;
            margin: 20px 15px 0 0 ;
          }
          .income,.teammate{
            display:inline-block;
            color:#999;
            height:24px;
            width:53px;
            border: 1px solid #cacaca;
            text-align:center;
            line-height:24px;
          }
          .income {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            margin-right:-1px;
          }
          .teammate {
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
          }
          .active {
            color:#fff;
            background: #ee5648;
          }
        `}
        </style>
      </Layout>
    )
  }
}

export default withRoot(Myteam);
