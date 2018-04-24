import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';
import Nprogress from '../components/Nprogress'
import fetch from '../lib/fetch'

const Container = styled.div`
  padding: 19px 0;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
`
const Contain = styled.div`
  background-color: #fff;
  padding-top: 16px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 20px;
`
const Wrapper1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: url(/static/match_bg.jpg);
  background-size: 100% 100%;
  height: 269px;
  width: 100%;
`
const Advantage = styled.div`
  margin:0 auto;
  margin-top: 143px;
  background-color: #fff;
  width: 90%;
  height: 150px;
  box-shadow: 0px 1px 12px 3px
  rgba(47, 47, 47, 0.15);
  border-radius: 8px;
  z-index: 10;
`
const Title = styled.div`
  text-align: center;
  line-height: 38px;
  font-size: 15px;
`
const Dot = styled.span`
  height: 4px;
  width: 4px;
  transform:rotate(45deg);
`
const Wrapper2 = styled.div`
  position: absolute;
  top: 269px;
  left: 0;
  background: url(/static/match_bg1.jpg);
  background-size: 100% 100%;
  height: 275px;
  z-index: -1;
  width: 100%;
  @media (min-width:320px) {
    height: 190px;
  }
  @media (min-width: 375px){
    height: 254px;
  }
  @media (min-width: 414px){
    height: 275px;
  }
`
const Step = styled.div`
  margin: 110px 0 0 30%;
  font-size: 12px;
  p{
    margin: 46px 0;
  }
  @media (min-width:320px) {
    margin: 72px 0 0 30%;
    p{
      margin: 28px 0;
    }
  }
  @media (min-width:360px) {
    margin: 90px 0 0 30%;
  }
  @media(min-width: 375px) {
    margin: 100px 0 0 30%;
    p{
      margin: 45px 0;
    }
  }
  @media (min-width: 414px){
    margin: 110px 0 0 30%;
    p{
      margin: 46px 0;
    }
  }
`
class MatchBegin extends React.Component {
  // static async getInitialProps({query}) {
	// 	return {
	// 		item: await fetch(`/item/${query.id}`)
	// 	}
	// }
  state = {
    name: '',
    disabled: 'true',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  toMatchList = () => {
    window.webkit.messageHandlers.gotoMatchHistory.postMessage({});
  }

  render () {
    const { classes } = this.props;

    return (
      // <MuiThemeProvider theme={theme}>
      <Layout title="智能匹配">
        <Nprogress/>
        <Wrapper1>
          <Advantage>
            <Title>
              <span></span>
              三大优势
            </Title>
            <ul className="list">
              <li>
                <div className="ad1"></div>
                <p>安全</p>
                <span>拒绝信息泄露</span>
              </li>
              <li>
                <div className="ad2"></div>
                <p>全面</p>
                <span>覆盖主流产品</span>
              </li>
              <li>
                <div className="ad3"></div>
                <p>精准</p>
                <span>预估获批额度</span>
              </li>
            </ul>
          </Advantage>
        </Wrapper1>
        <Wrapper2>
          <Step>
            <p>第一步：点选基本信息，匹配是否准入</p>
            <p>第二步：填写收入数据，计算负债情况</p>
            <p>第三步：输出最优产品，获取预估额度</p>
          </Step>
          <div className="btn">
            <div className="l" onClick={this.toMatchList}>匹配记录</div>
            <Link href="/matchstep1">
            <div className="r">
                立即匹配
            </div>
            </Link>
          </div>
        </Wrapper2>
        <style jsx >{`
          .list li div{
            height:45px;
            width:45px;
            background-size: 100% 100%;
            margin:0 auto;
          }
          .ad1{
            background:url(/static/match_begin_ad1.jpg);
          }
          .ad2{
            background:url(/static/match_begin_ad2.jpg);
          }
          .ad3{
            background:url(/static/match_begin_ad3.jpg);
          }
          .list{
            list-style:none;
            margin: 0;
            padding: 0;
            display:flex;
            text-align:center;
            justify-content: space-around;
          }
          .list li p{
            color: #ee5648;
            font-size: 13px;
          }
          .list li span{
            font-size: 9px;
            color:#969696;
          }
          .btn{
            // margin: 0 auto;
            margin-left: 10%;
          }
          .l,.r{
            width: 40%;
            height: 40px;
            border-radius: 3px;
            display: inline-block;
            line-height:40px;
            font-size:15px;
            color: #fff;
            text-align: center;
          }
          .l {
            background-color: #fdc041;
          }
          .r {
            background-color: #ee5648;
            margin-left:25px;
          }
        `}
        </style>
      </Layout>

    )
  }
}


export default MatchBegin;
