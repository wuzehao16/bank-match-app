import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import fetch from '../lib/fetch'
import styled from 'styled-components'
import Router from 'next/router'
import getCookie from '../lib/getCookie'
import dayjs from 'dayjs'
import Layout from '../layout/HasFooterWantedLayout'
import { Card, List, WhiteSpace, PullToRefresh,SearchBar} from 'antd-mobile'
import { Form } from 'antd'
import { ListView, Button } from 'antd-mobile'
import { searchJobList } from '../services/recruit'
import withRoot from '../src/withRoot';


// const data = [
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: 'Meet hotel',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: 'Meet hotel',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   }
// ];


class workList extends React.Component {

    static async getInitialProps ({query,req}) {
      // eslint-disable-next-line no-undef
      var data = await fetch('/getJobList');
      console.log('data',data)
      const jobName = await fetch('/selectByType?type=jobTitle')
      const ageLimit = ["","经验不限","应届生","一年以下","1-3年","3-5年","5-10年","10年以上"]
      const education = await fetch('/selectByType?type=education')
      const salary = ["面议","2k以下","2k-5k","5k-10k",'10k-15k','15k-25k','25k-50k','50k以上']
      const organizationCategory = await fetch('/selectByType?type=orgType')
      const scale = ['','20人以下','20-49人','50-99人','100-499人','500人以上']

      return {
                data: data || [],
                dic:{
                  jobNameDic: jobName,
                  ageLimitDic: ageLimit,
                  educationDic: education,
                  salaryDic: salary,
                  organizationCategoryDic: organizationCategory,
                  scaleDic: scale
                }
                // dataSource: dataSource
            }
    };


    constructor(props) {
      super(props);
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });

      this.state = {
        resdata:[],
        dataSource,
        refreshing: true,
        isLoading: true,
        height: '1000px',
        useBodyScroll: false,
      };
    }


    genData(pIndex = 1) {
      const dataArr = [];
      for (let i = 0; i < this.props.data.length; i++) {
        dataArr.push(`row - ${(pIndex * this.props.data.length) + i}`);
      }
      console.log('dataArr',dataArr)
      return dataArr;
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
      this.rData = this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1000);
  }


  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    console.log("refresh")
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  // onEndReached = (event) => {
  //   // load new data
  //   // hasMore: from backend data, indicates whether it is the last page, here is false
  //   if (this.state.isLoading && !this.state.hasMore) {
  //     return;
  //   }
  //   console.log('reach end', event);
  //   this.setState({ isLoading: true });
  //   setTimeout(() => {
  //     this.rData = [...this.rData, ...genData(++pageIndex)];
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(this.rData),
  //       isLoading: false,
  //     });
  //   }, 1000);
  // };

  async searchJobList(params) {
    const res = await searchJobList(params);
    this.state.setState=({
      resdata: res.data
    })
    if (res.code !==0) {
      Toast.fail(res.msg);
    }
  }

  onSearchSubmit = (val) => {
    console.log("提交val",val)
    const params = {keyword:val,currentPage:1,pageSize:8};
    this.searchJobList(params);
  }

  onSearchCancel = () => {
    let searchBar = this.refs.search;
    searchBar.state.value = '';

    console.log("点击取消")
  }

  render() {
    const data = this.props.data;
    const {jobNameDic, ageLimitDic, educationDic, salaryDic, organizationCategoryDic, scaleDic} = this.props.dic;
    console.log('data2',data)
    console.log('dic',this.props.dic)
    // console.log('this.state',this.state)
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
    const dataObj = this.state.resdata.length?this.state.resdata:data;
    let index = dataObj.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = dataObj.length - 1;
      }
      const obj = dataObj[index--];
      return (
        // <div key={rowID}>
            <Link key={rowID} href={`/workDetail?jobId=${obj.jobId}`}>
              <Card full>
                <Card.Header
                  className="jobdesc"
                  title={obj.jobName}
                  extra={<span className="salary">{salaryDic[obj.salary]}</span>}
                />
                <Card.Header
                className="jobInfo"
                  title={<div>{obj.address}|{ageLimitDic[obj.ageLimit]}|{obj.education}</div>}
                />
                <Card.Header
                  title={<div style={{width:'100%'}}><p className="companyName">{obj.companyName}</p><p className="companyInfo" style={{width:'100%'}}>{scaleDic[obj.scale]}/{obj.organizationCategory}<span className="publishedTime" style={{float:'right'}}>{dayjs(obj.createTime).format("MM月DD日 HH:mm")}</span></p></div>}
                  thumb={obj.logo}
                  thumbStyle={{width:'64px',height:'64px'}}
                />
              </Card>
            </Link>
            // <div style={{width:'100%',height:'20px',background:'rgb(245,245,249)'}}></div>
          // </div>
      );
    };
    return (<Layout title="职位列表">
      <SearchBar
        // value={this.state.value}
        // onChange={this.onSearchChange}
        ref="search"
        onSubmit={this.onSearchSubmit}
        // onClear={value => console.log(value, 'onClear')}
        // onFocus={() => console.log('onFocus')}
        // onBlur={() => console.log('onBlur')}
        onCancel={this.onSearchCancel}
        placeholder="搜索关键词"
        // onChange={this.onChange}
      />
      <ListView
        key="1"
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span></span>}
        renderFooter={() => (<div style={{ padding: '10px 0 50px 0', textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : '没有更多啦~'}
        </div>)}
        renderRow={row}
        // renderRow={row}
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
        // onEndReached={this.onEndReached}
        // pageSize={5}
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

export default withRoot(workList);
