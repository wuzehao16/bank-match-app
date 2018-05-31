import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { List, WhiteSpace, WingBlank, SegmentedControl } from 'antd-mobile'
import { Form } from 'antd'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Layout from '../layout/HasFooterRecruitLayout'
import fetch from '../lib/fetch'
import { formatData , getCookie } from '../lib/util'
import withRoot from '../src/withRoot'
import { getResumeList } from '../services/recruit'

const Item = List.Item;
const Brief = Item.Brief;

const Button = styled.button`
    display: inline-block;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
`

const Name = styled.span`
  font-size: 14px;
  color: #404040;
  margin-right: 10px;
`
const Info = styled.span`
  font-size: 12px;
  color: #999;
`
const Divider = styled.span`
  display:inline-block;
  margin: 0 3px;
`
const Salary = styled.span`
  font-size: 12px;
  color:rgb(238,86,72);
`

const Desc = styled.div`
  font-size: 14px;
  width: 100%;
  color: #999;
  text-align: center;
  padding: 50% 0 ;
`

const workingYearDic = ['','一年以下','1-3年','3-5年','5-10年','10年以上']
const expectSalaryDic = ['面议','2k以下','2k-5k','5k-10k','10k-15k','15k-25k','25k-50k','50k以上']
const workingSeniority =[
  {
    label:'1年以下',
    value:'1'
  },
  {
    label:'1-3年',
    value:'2'
  },
  {
    label:'3-5年',
    value:'3'
  },
  {
    label:'5-10年',
    value:'4'
  },
  {
    label:'10年以上',
    value:'5'
  }
]
class PublishedJobList extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req);
    const resumeListData = await fetch(`/getResumeList?expectJob=1`,token);
    console.log('resumeListData',resumeListData)
    const education = await fetch('/selectByType?type=education')
    const expectJob = await fetch('/selectByType?type=jobTitle')

    return {
      resumeListData: resumeListData || [],
      dic:{
        educationDic: education,
        expectJobDic: expectJob
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      resumeListData: this.props.resumeListData || [],
      params:{
      }
    };
  }

  async getResumeList (data) {
    console.log('data',data)
  const res = await getResumeList({
    ...data
  });
    console.log('res',res);
    if (res.code == 0) {
      this.setState({
        resumeListData: res.data,
      })

    } else {
      Toast.fail(res.msg);
    }
  }

  handleChange = field => e => {
  
    const params = {
      ...this.state.params,
      [field]: e.target.value
    };
    this.setState({
      params: params
    })
    console.log('params',this.state.params)
    this.getResumeList(params);
  }

  render() {
    const resumeListData = this.state.resumeListData;
    const {educationDic,expectJobDic} = this.props.dic
    const educationOption = educationDic.map(i => {return {value:i.code, label:i.name}})
    const expectJobOption = expectJobDic.map(i => {return {value:i.code, label:i.name}})
    // const expectJobArr = expectJobDic.map(item => item.name);
    console.log('resumeListData',resumeListData)
    
    return (
      <Layout title="人才列表">
        {/* <WhiteSpace/> */}
        <div className="filter">
          <Select
              style={{fontSize:'14px'}}
              value={this.state.age}
              onChange={this.handleChange('expectJob')}
              native defaultValue='none'>
              <option value="">
                职位名称
              </option>
              {
                expectJobOption.map(i => {
                  return <option value={i.value}>{i.label}</option>
                })
              }
            </Select>
          {/* <FormControl  style={{minWidth:'45%'}}> */}
          {/* <InputLabel htmlFor="controlled-open-select">工作年限</InputLabel> */}
          <Select
            style={{fontSize:'14px'}}
            value={this.state.age}
            onChange={this.handleChange('workingYear')}
             native defaultValue='none'>
            <option value="">
              工作年限
            </option>
            {
              workingSeniority.map(i => {
                return <option value={i.value}>{i.label}</option>
              })
            }
          </Select>
          {/* </FormControl> */}
          {/* <FormControl style={{minWidth:'45%'}}> */}
                {/* <InputLabel htmlFor="controlled-open-select1">最该学历</InputLabel> */}
                <Select
                  style={{fontSize:'14px'}}
                  
                  value={this.state.age}
                  onChange={this.handleChange('education')}
                   native defaultValue='none'>
                  <option value="">
                    最高学历
                  </option>
                  {
                    educationOption.map(i => {
                      return <option value={i.value}>{i.label}</option>
                    })
                  }
                </Select>
              {/* </FormControl> */}

        </div>
        {/* <SegmentedControl selectedIndex={this.state.params.expectJob} onChange={this.onChange}  onValueChange={this.onValueChange} values={expectJobArr} /> */}
        {/* <WhiteSpace/> */}
        <List>
          {
            resumeListData.length ? resumeListData.map((item,index) =>
              <Link key={index} href={`/resumeDetail?resumeId=${item.resumeId}`}>
                <Item
                  align="top"
                  thumb={item.headPortrait}
                  multipleLine>
                <Name>{item.name}</Name>
                <Brief>
                  <Fragment>
                    <Info>{workingYearDic[item.workingYear]}<Divider>|</Divider></Info>
                    <Info>{item.education}<Divider>|</Divider></Info>
                    <Salary>{expectSalaryDic[item.expectSalary]}</Salary>
                  </Fragment>
                </Brief>
                </Item>
              </Link>
            ):
            <Desc><p>暂无数据</p></Desc>
          }
        </List>
      <style jsx global>{`
        .select {
        height: 40px;
        -webkit-appearance: none;
        appearance: none;
        border: none;
        font-size : 18px;
        padding : 0px 10px;
        display: block;
        width : 50%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #FFFFFF;
        color: #333333;
        border-radius : 4px
        }
        .filter{
          // margin-bottom:10px;
          padding:10px 0;
          background-color:#ffffff;
          display:flex;
          justify-content: space-around;
        }
          .am-list-item .am-list-line .am-list-brief{
            font-size: 12px !important;
            color: #999 !important;
          }
          .am-list-thumb  img{
            width: 35px !important;
            height: 35px !important;
          }
          .am-segment-item {
            border-radius: 5px !important;
            background-color: #f2f2f2 !important;
            border: 1px solid #ccc !important;
            color: #3c3c3c !important;
          }
          .am-segment-item-selected {
            border: 1px solid #ee5648 !important;
            background: #fff !important;
            color: #ee5648 !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}
const PublishedJobListWapper = Form.create()(PublishedJobList);
export default withRoot(PublishedJobListWapper);
