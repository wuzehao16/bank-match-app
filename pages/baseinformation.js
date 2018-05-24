import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout';
import { Picker, List, InputItem, WhiteSpace, Button, WingBlank,Toast } from 'antd-mobile';
import { Form } from 'antd';
import "../styles/index.css"
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
import { formatData } from '../lib/util'
import { updateBaseInformation } from '../services/recruit'
const FormItem = Form.Item;
const Item = List.Item;

const I = styled.i`
  font-size: 14px;
  color: #ee5648;
`

const Span = styled.span`
  font-size: 14px;
  color: #666;
  padding-left: 10px;
`

const sex =[
  {
    label:'男',
    value:'0'
  },
  {
    label:'女',
    value:'1'
  },
]
const jobStatus =[
  {
    label:'离职',
    value:'0'
  },
  {
    label:'在职',
    value:'1'
  },
]
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
function getYear() {
  const year = (new Date()).getFullYear();
  const birthday =[];
  let beginYear = 1970;
  for (let i = 0; i <= year - 1970; i++) {
    birthday[i] = {
      label: `${beginYear}`,
      value: `${beginYear}`
    }
    beginYear += 1
  }
  return birthday
}
class BaseInformation extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    var i;
    const token = req ? getCookie('token', req) : ''
    if (query.type) {
      i = await fetch(`/getResumeDetail`)
    }
    const education = await fetch(`/selectByType?type=education`)
    const city = await fetch(`/selectByType?type=city`)
    // var i ;
    console.log(i)
    return {
            i: i || {},
            dic: {
                education: education,
                city: city
              }
            }
  }
  componentDidMount () {
    this.props.form.validateFields();
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  async sendData(value) {
    const res = await updateBaseInformation(value);
    if (res.code != 0) {
      Toast.fail(res.msg);
    }
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        value = formatData(value)
        this.sendData(value);
      } else {
        alert('Validation failed');
      }
    });
  }
  render() {
    const { education,city } = this.props.dic;
    const i = this.props.i;
    const educationOption = education.map(i => {return {value:i.code, label:i.name}})
    const cityOption = city.map(i => {return {value:i.code, label:i.name}})
    const { getFieldProps, getFieldsError } = this.props.form;
    return (
      <Layout title="基本信息">
        <WhiteSpace/>
        <List >
          <InputItem
            {...getFieldProps('name',{initialValue:i.name,rules:[{required:true}]})}
            clear
            placeholder="最好使用真实姓名"
          >
            <div><I className="iconfont icon-name"/><Span>姓名</Span></div>
          </InputItem>
          {/* </Item> */}

          <Picker data={sex} cols={1} {...getFieldProps('sex', {initialValue:[i.sex],rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
                <div><I className="iconfont icon-Sex"/><Span>性别</Span></div>
            </List.Item>
          </Picker>
          <Picker data={getYear()} cols={1} {...getFieldProps('birthYear', {initialValue:[i.birthYear],rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-icon-chushengriqi"/><Span>出生年月</Span></div>
            </List.Item>
          </Picker>
        </List>
        <WhiteSpace/>

        <List>
          <Picker data={educationOption} cols={1} {...getFieldProps('education', {initialValue:[i.education],rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-incumbencyHr"/><Span>最高学历</Span></div>
            </List.Item>
          </Picker>
          <Picker data={workingSeniority} cols={1} {...getFieldProps('workingYear', {initialValue:[i.workingYear],rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-time"/><Span>工作年限</Span></div>
            </List.Item>
          </Picker>
       </List>
       <WhiteSpace/>
       <List>
        <InputItem
          {...getFieldProps('phone', {initialValue:i.phone,rules:[{required:true}]})}
          clear
          placeholder="请填入电话号码"
        >
          <div><I className="iconfont icon-tel"/><Span>电话号码</Span></div>
        </InputItem>
        <InputItem
          {...getFieldProps('mail', {initialValue:i.mail,rules:[{required:true}]})}
          clear
          placeholder="请填入邮箱"
        >
          <div><I className="iconfont icon-email"/><Span>邮箱</Span></div>
        </InputItem>
      </List>
      <WhiteSpace/>
      <List>
        <Picker data={cityOption} cols={1} {...getFieldProps('city', {initialValue:[i.city],rules:[{required:true}]})} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-city"/><Span>所在城市</Span></div>
          </List.Item>
        </Picker>
        <Picker data={jobStatus} cols={1} {...getFieldProps('status', {initialValue:[i.status],rules:[{required:true}]})} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-incumbencyHr"/><Span>在职状态</Span></div>
          </List.Item>
        </Picker>
      </List>
      <WingBlank>
        <Button onClick={this.onSubmit} type="primary" disabled={this.hasErrors(getFieldsError())} style={{marginTop:'50px',fontSize:'14px'}}>保存</Button><WhiteSpace />
      </WingBlank>
      </Layout>
    )
  }
}
const WrappedBaseInformation = Form.create()(BaseInformation);
export default WrappedBaseInformation;
