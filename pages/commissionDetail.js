import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import PullToRefresh from 'rmc-pull-to-refresh'
import '../node_modules/rmc-pull-to-refresh/assets/index.css'
import Layout from '../layout/Elayout'
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
import { fetchDetail } from '../services/commission'
const Wrapper = styled.div`
  padding: 5px 15px 15px;
  background: #fff;
`
const Card = styled.div`
  margin-top: 10px;
  border-radius: 20px;
  background-image: ${props => props.primary % 2==0 ? 'linear-gradient(90deg,#addde5 0%,#4ca1af 100%),linear-gradient(#e75d5d,#e75d5d);' :
   'linear-gradient(90deg,#fbbec5 0%,#e78290 100%), linear-gradient(#e75d5d, #e75d5d);'};

  color:#fff;
  padding: 15px
`
const Title = styled.div`
  text-align:center;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`
const L =styled.div`
  text-align: center;
  width: 30%;
  font-size: 14px;
`
const R =styled.div`
 width: 45%;
 font-size: 13px;
`
const More = styled.div`
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Nomessage = styled.div`
  color: #999;
  text-align: center;
`
export default class extends React.Component {
  static async getInitialProps({query, req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const res = await fetch(`/getIncomesList`, token)
    console.log(res, "res")
    return {
      res: {
        "code": 0,
        "msg": "ok",
        "data": [
          {
            "ftime": "2018年03月",
            "settledAmount": 200.92,
            "waitAmount": 100.25,
            "totalAmount": 301.17,
            "incomeDateList": [
              {
                "name": "黄金会员",
                "time": "2018-03-20 10:33:01",
                "amt": 100.25
              }, {
                "name": "大宇宙",
                "time": "2018-03-20 10:35:00",
                "amt": 200.92
              }
            ]
          }, {
            "ftime": "2018年02月",
            "settledAmount": 400.33,
            "waitAmount": 0,
            "totalAmount": 400.33,
            "incomeDateList": [
              {
                "name": "jack",
                "time": "2018-02-01 10:35:04",
                "amt": 400.33
              }
            ]
          }, {
            "ftime": "2018年01月",
            "settledAmount": 0,
            "waitAmount": 300,
            "totalAmount": 300,
            "incomeDateList": [
              {
                "name": "jack",
                "time": "2018-01-23 16:14:16",
                "amt": 300
              }
            ]
          }, {
            "ftime": "2017年12月",
            "settledAmount": 1200.12,
            "waitAmount": 0,
            "totalAmount": 1200.12,
            "incomeDateList": [
              {
                "name": "jack",
                "time": "2017-12-01 16:14:59",
                "amt": 1200.12
              }, {
                "name": "钻石会员",
                "time": "2017-12-15 16:15:31",
                "amt": 1232.23
              }
            ]
          }, {
            "ftime": "2017年12月",
            "settledAmount": 1200.12,
            "waitAmount": 0,
            "totalAmount": 1200.12,
            "incomeDateList": [
              {
                "name": "jack",
                "time": "2017-12-01 16:14:59",
                "amt": 1200.12
              }, {
                "name": "钻石会员",
                "time": "2017-12-15 16:15:31",
                "amt": 1232.23
              }
            ]
          }
        ],
        "count": 4
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.res.data || [],
      refreshing: false,
      params: {
        page: 0
      }
    };
    this.refresh = this.refresh.bind(this)
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({switchContainer: true});
    }, 100);
    // document.body.style.overflowY =
    //   navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? 'hidden' : 'auto';
  }
  showMore = v => e => {
    e.preventDefault;
    const newlist = this.state.data
    newlist[v].showmore = !newlist[v].showmore
    this.setState({data: newlist})
  }
  async refresh() {
    const res = await fetchDetail()
    console.log(res)

    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 1000);
  }

  render() {
    const item = this.props.item;
    const list = this.state.data;
    return (<Layout>
      <Wrapper>
        <PullToRefresh key={this.state.switchContainer}
          // style={{ height: 200, overflow: 'auto', border: '1px solid #ccc' }}
          {...(this.state.switchContainer ? { getScrollContainer: () => document.body } : {}) }
          className="forTest"
          direction="up"
          refreshing={this.state.refreshing}
          onRefresh={this.refresh}
          indicator={{deactivate: '上拉'}}
          >
          {
            list.map((i, index) => {
              return (<Card key={index} primary={index}>
                <Title>{i.ftime}</Title>
                <div style={{
                    marginTop: 30
                  }}>
                  <Row>
                    <L>当前收益(元)</L>
                    <R>已结算(元)：{i.settledAmount}</R>
                  </Row>
                  <Row>
                    <L>{i.totalAmount}</L>
                    <R>待结算(元)：{i.waitAmount}</R>
                  </Row>
                </div>
                <Divider style={{
                    background: '#fff',
                    marginTop: 20
                  }}/>
                <div style={{
                    display: i.showmore
                      ? 'block'
                      : 'none'
                  }}>
                  {
                    i.incomeDateList.map((i) => {
                      return (<div
                        key={i.time}
                         style={{
                          display: 'flex',
                          justifyContent: "space-between",
                          fontSize: '12px',
                          marginTop: '10px'
                        }}>
                        <span style={{
                            width: '60px'
                          }}>{i.name}</span>
                        <span>{i.time}</span>
                        <span>{i.amt}</span>
                      </div>)
                    })
                  }
                  <Divider style={{
                      background: '#fff',
                      marginTop: 15
                    }}/>
                </div>
                {
                  i.showmore
                    ? <More onClick={this.showMore(index)}>
                        <span>收起</span>
                        <Icon>arrow_drop_up</Icon>
                      </More>
                    : <More onClick={this.showMore(index)}>
                        <span>查看详情</span>
                        <Icon>arrow_drop_down</Icon>
                      </More>
                }
              </Card>)
            })
          }
        </PullToRefresh>
        {
          list.length < 1
            ? <Nomessage>暂无数据...</Nomessage>
            : null
        }

      </Wrapper>

    </Layout>)
  }
}
