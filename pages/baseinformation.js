import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Router from 'next/router'
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
      value: beginYear
    }
    beginYear += 1
  }
  return birthday
}
class BaseInformation extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const i = await fetch(`/getResumeDetail`, token)
    const education = await fetch(`/selectByType?type=education`)
    const city = await fetch(`/selectByType?type=city`)

    return {
            resumeId:query.resumeId,
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
    if (res.code ==0) {
       Router.push('/resume')
    } else {
      Toast.fail(res.msg);
    }
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        value = {
          ...formatData(value),
          resumeId: this.props.resumeId,
          headPortrait:this.props.avatar
        }
        this.sendData(value);
      } else {
        alert('Validation failed');
      }
    });
  }
  render() {
    const { education,city } = this.props.dic;
    const i = this.props.i;
    console.log('i',i)
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
            <div><i className="iconfont icon-name"/><span className="itemTitle">姓名</span></div>
          </InputItem>
          {/* </Item> */}

          <Picker data={sex} cols={1} {...getFieldProps('sex', {initialValue:i.sex?[i.sex]:'',rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
                <div><i className="iconfont icon-Sex"/><span className="itemTitle">性别</span></div>
            </List.Item>
          </Picker>
          <Picker data={getYear()} cols={1} {...getFieldProps('birthYear', {initialValue:i.birthYear?[i.birthYear]:'',rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div><i className="iconfont icon-icon-chushengriqi"/><span className="itemTitle">出生年月</span></div>
            </List.Item>
          </Picker>
        </List>
        <WhiteSpace/>

        <List>
          <Picker data={educationOption} cols={1} {...getFieldProps('education', {initialValue:
            [i.education?(educationOption.filter( item => item.label == i.education))[0].value:'']
            ,rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div><i className="iconfont icon-incumbencyHr"/><span className="itemTitle">最高学历</span></div>
            </List.Item>
          </Picker>
          <Picker data={workingSeniority} cols={1} {...getFieldProps('workingYear', {initialValue:i.workingYear?[i.workingYear]:'',rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div><i className="iconfont icon-time"/><span className="itemTitle">工作年限</span></div>
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
          <div><i className="iconfont icon-tel"/><span className="itemTitle">电话号码</span></div>
        </InputItem>
        <InputItem
          {...getFieldProps('mail', {initialValue:i.mail,rules:[{required:true}]})}
          clear
          placeholder="请填入邮箱"
        >
          <div><i className="iconfont icon-email"/><span className="itemTitle">邮箱</span></div>
        </InputItem>
      </List>
      <WhiteSpace/>
      <List>
        <Picker data={cityOption} cols={1} {...getFieldProps('city', {initialValue:i.city?[i.city]:'',rules:[{required:true}]})} className="forss">
          <List.Item arrow="horizontal">
            <div><i className="iconfont icon-city"/><span className="itemTitle">所在城市</span></div>
          </List.Item>
        </Picker>
        <Picker data={jobStatus} cols={1} {...getFieldProps('status', {initialValue:i.status?[i.status]:'',rules:[{required:true}]})} className="forss">
          <List.Item arrow="horizontal">
            <div><i className="iconfont icon-incumbencyHr"/><span className="itemTitle">在职状态</span></div>
          </List.Item>
        </Picker>
      </List>
      <WingBlank>
        <Button onClick={this.onSubmit} type="primary" disabled={this.hasErrors(getFieldsError())} style={{marginTop:'50px',fontSize:'14px'}}>保存</Button><WhiteSpace />
      </WingBlank>
      <style jsx global>{`
          .iconfont {
            font-size: 14px;
            color: #ee5648;
          }
          .itemTitle {
            color: #666;
            font-size: 14px;
            padding-left: 10px;
          }

          .am-list-item .am-input-control input {
            font-size: 14px !important;
          }
          .am-list-extra {
            font-size: 14px !important;
          }
          .am-list-item .am-input-control input {
            color: #888 !important;
            text-align: right;
          }
        `}
        </style>
      </Layout>
    )
  }
}
const WrappedBaseInformation = Form.create()(BaseInformation);
export default WrappedBaseInformation;
