import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Card, List, WhiteSpace, PullToRefresh,SearchBar, Toast} from 'antd-mobile'
import styled from 'styled-components'
import Router from 'next/router'
import { Form } from 'antd'
import { ListView, Button } from 'antd-mobile'
import fetch from '../lib/fetch'
import { getCookie } from '../lib/util'
import Layout from '../layout/HasFooterWantedLayout'
import { getJobList } from '../services/recruit'
import withRoot from '../src/withRoot';

class workList extends React.Component {

    static async getInitialProps ({query,req}) {
      // eslint-disable-next-line no-undef
      var data = await fetch('/getJobList');
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
        data: this.props.data,
        dataSource,
        refreshing: true,
        isLoading: true,
        height: '1000px',
        useBodyScroll: false,
        hasMore: false,
        currentPage: 1,
        searchValue: ''
      };
    }

    genData() {
      const dataArr = [];
      if(this.state.data.length!==0){
        for (let i = 0; i < this.state.data.length; i++) {
          dataArr.push(this.state.data[i].jobId);
          console.log(this.state.data[i].jobId)
        }
      }
      return dataArr;
    }

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
    this.setState({ refreshing: true, isLoading: true,currentPage: 1 });
    this.getNewData({currentPage:this.state.currentPage,keyword:this.state.searchValue});
  };

  async getNewData(val) {
    const res = await getJobList(val);
    if(res.code == 0){
      this.setState({
        data: res.data,
      });
      setTimeout(() => {
        this.rData = this.genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          refreshing: false,
          isLoading: false,
        });
      }, 600);
    }else {
      Toast.fail(res.msg);
    }
  }

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.getMoreData({currentPage:this.state.currentPage+1,keyword:this.state.searchValue});
    this.setState({
      isLoading: true,
      hasMore: true,
      currentPage: this.state.currentPage+1
    });
  };

  async getMoreData(val) {
    const res = await getJobList(val);
    if(res.code == 0){
      if(res.data.length==0){
        this.setState({
          hasMore: false
        })
      }
      this.setState({
        data: this.state.data.concat(res.data),
        isLoading: true,
      })  
      setTimeout(() => {
        this.rData = this.genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
          hasMore: true
        });
      }, 600);
    }else {
      Toast.fail(res.msg);
    }
  }

  onSearchSubmit = (val) => {
    this.setState({ refreshing: true, isLoading: true, currentPage: 1, searchValue: val });
    this.getNewData({currentPage: 1, keyword:val});
  }

  onSearchCancel = () => {
    let searchBar = this.refs.search;
    searchBar.state.value = '';
    this.setState({
      searchValue: '',
      currentPage: 1
    })
    this.getNewData({currentPage:1,keyword:''});
  }

  render() {
    const data = this.state.data;
    const {jobNameDic, ageLimitDic, educationDic, salaryDic, organizationCategoryDic, scaleDic} = this.props.dic;
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

    let row;

    if(data.length!==0){
      let index = data.length - 1;
      row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
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
      );
    };
    }else {
      row = () =>{
        return (<div></div>)
      }
    }
    
    return (<Layout title="职位列表">
      <SearchBar
        ref="search"
        onSubmit={this.onSearchSubmit}
        onCancel={this.onSearchCancel}
        placeholder="搜索关键词"
      />
      <ListView
        // style={{marginBottom:'100px'}}
        key="1"
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: '10px 0',marginBottom:'50px', textAlign: 'center' }}>
          {(this.state.isLoading && (this.state.refreshing || this.state.hasMore))? 'Loading...' : '没有更多啦~'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0 0 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={8}
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
