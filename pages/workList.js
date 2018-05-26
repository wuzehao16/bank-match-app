import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout';
import { Card, List, WhiteSpace, PullToRefresh,SearchBar} from 'antd-mobile';
import { Form } from 'antd';
import { ListView, Button } from 'antd-mobile';

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_ROWS = 5;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

class workList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: '1000px',
      useBodyScroll: false,
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  componentDidUpdate() {
      document.body.style.overflow = 'hidden';
  }

  componentDidMount() {
    if(typeof window !== 'undefined'){
    this.setState({
      height:document.documentElement.clientHeight
    })
   }
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}>
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
      );
    };
    return (<Layout title="职位列表">
      <SearchBar
        // value={this.state.value}
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        placeholder="搜索关键词"
        // onChange={this.onChange}
      />
      <ListView
        key="1"
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span></span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        // useBodyScroll={this.state.useBodyScroll}
        style={{
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={5}
      />
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
        .am-search-input {
          border-radius: 5px !important;
        }
        .am-search-cancel{
          font-size: 14px !important;
        }
        .am-list-view-scrollview {
          border: none !important;
        }
      `}
      </style>
    </Layout>);
  }
}

const workListWapper = Form.create()(workList);
export default workListWapper;