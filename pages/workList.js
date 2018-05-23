import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout';
import { Card, List, WhiteSpace, PullToRefresh,SearchBar} from 'antd-mobile';
import { Form } from 'antd';

const FormItem = Form.Item;
const Item = List.Item;

function genData() {
  const dataArr = [];
  for (let i = 0; i < 4; i++) {
    dataArr.push(i);
  }
  return dataArr;
}



class workList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value:"搜索关键词",
      refreshing: false,
      down: true,
      height: '736px',
      data: []
    };
  }

  componentDidMount() {
    // this.autoFocusInst.focus();
    if(typeof window !== 'undefined'){
      // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
      setTimeout(() => this.setState({
        // height: hei,
        data: genData(),
      }), 0);
    }
  }

  onChange= (value) => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };
  // handleClick = () => {
  //   // this.manualFocusInst.focus();
  // }

  render() {
    return (
    // <div style={{height:'100%'}}>
    <Layout>
      <SearchBar placeholder="搜索关键词" maxLength={8} />
      <PullToRefresh
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        direction={'down'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        {this.state.data.map(i => (
          <div key={i}>
            <Link href='/workDetail'>
              <Card full>
                <Card.Header
                  className="jobdesc"
                  title="客户经理"
                  extra={<span className="salary">8-16k</span>}
                />
                <Card.Header
                className="jobInfo"
                  title="深圳南山区|3-5年|本科"
                  extra={<span className="publishedTime">2018年05月23日 15:23</span>}
                />
                <Card.Header
                  title={<div><p className="companyName">众银云测有限公司</p><p className="companyInfo">5000人以上/金融机构</p></div>}
                  // title="深圳众银云测有限责任公司"
                  thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                  thumbStyle={{width:'64px',height:'64px'}}
                />
              </Card>
            </Link>
            <WhiteSpace size="lg" />
          </div>
        ))}
      </PullToRefresh>
      <style jsx global>{`
        .am-pull-to-refresh-content-wrapper {
          height:100% !important;
        }
        .am-card {
          padding: 15px 0;
        }
        .am-card-header {
          padding: 0px 15px !important;
          margin: 0 0 5px 0;
        }
        .company {
          margin: 0 0 10px 0;
        }
        .job {
          color: #999;
        }
        .am-card-header {
          font-size: 14px !important;
        }
        .jobdesc {
          font-weight: 700;
        }
        .jobInfo .am-card-header-content{
          font-size: 13px;
          color: #999;
        }
        .salary {
          color: #ee5648;
          font-size: 13px;
        }
        .publishedTime {
          color: #999;
          font-size: 13px;
        }
        .companyName {
          color: #404040;
          font-size: 14px;
        }
        .companyInfo {
          color: #999;
          font-size: 13px;
        }
      `}
      </style>
    </Layout>
    );
  }
}

const workListWapper = Form.create()(workList);
export default workListWapper;
