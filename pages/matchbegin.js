import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Layout from '../layout/layout';
import Nprogress from '../components/Nprogress'
import fetch from '../lib/fetch'
import withRoot from '../src/withRoot';

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
    height: 238px;
  }
  @media (min-width: 414px){
    height: 275px;
  }
`
const Step = styled.div`
  margin: 110px 0 0 30%;
  font-size: 12px;
  p{
    font-size: 13px;
    margin: 46px 0;
  }
  @media (min-width:320px) {
    margin: 72px 0 0 30%;
    p{
      margin: 28px 0;
    }
  }
  @media (min-width:360px) {
    margin: 78px 0 0 30%;
  }
  @media(min-width: 375px) {
    margin: 100px 0 0 30%;
    p{
      font-size: 14px;
      margin: 35px 0;
    }
  }
  @media (min-width: 414px){
    margin: 110px 0 0 30%;
    p{
      font-size: 15px;
      margin: 46px 0;
    }
  }
`
const NextButton = styled(Button)`
  width: 100%;
  height: 36px;
  border-radius: 4px;
`
class MatchBegin extends React.Component {
  state = {
    name: '',
    disabled: 'true',
  };

  async componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/static/manifest/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful");
        })
        .catch(err => {
          console.warn("service worker registration failed");
        });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


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
            {/* <div className="l" onClick={this.toMatchList}>匹配记录</div> */}
            <Link prefetch href="/matchstep1">
            <NextButton variant="raised" color="primary">
                立即匹配
            </NextButton>
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
            color:#3c3c3c;
          }
          .btn{
            text-align:center;
          }

        `}
        </style>
      </Layout>

    )
  }
}


export default withRoot(MatchBegin);
