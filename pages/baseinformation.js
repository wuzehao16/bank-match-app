import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout';
import { Picker, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import "../styles/index.css"
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
import { Form } from 'antd';
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
console.log(year - beginYear,birthday)
class BaseInformation extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const education = await fetch(`/selectByType?type=education`)
    const city = await fetch(`/selectByType?type=city`)
    return { dic: {
                education:education,
                city:city
              }
            }
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  }
  render() {
    const { education,city } = this.props.dic;
    const educationOption = education.map(i => {return {value:i.code, label:i.name}})
    const cityOption = city.map(i => {return {value:i.code, label:i.name}})
    const { getFieldProps } = this.props.form;
    return (
      <Layout title="基本信息">
        <WhiteSpace/>
        <List >
          <InputItem
            {...getFieldProps('name',{initialValue:123456})}
            clear
            placeholder="最好使用真实姓名"
          >
            <div><I className="iconfont icon-name"/><Span>姓名</Span></div>
          </InputItem>
          {/* </Item> */}

          <Picker data={sex} cols={1} {...getFieldProps('sex', {initialValue:["0"]})} className="forss">
            <List.Item arrow="horizontal">
                <div><I className="iconfont icon-Sex"/><Span>性别</Span></div>
            </List.Item>
          </Picker>
          <Picker data={birthday} cols={1} {...getFieldProps('birthYear', {initialValue:['1970']})} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-icon-chushengriqi"/><Span>出生年月</Span></div>
            </List.Item>
          </Picker>
        </List>
        <WhiteSpace/>

        <List>
          <Picker data={educationOption} cols={1} {...getFieldProps('education', {initialValue:['3']})} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-incumbencyHr"/><Span>最高学历</Span></div>
            </List.Item>
          </Picker>
          <Picker data={workingSeniority} cols={1} {...getFieldProps('workingYear', {initialValue:['3']})} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-time"/><Span>工作年限</Span></div>
            </List.Item>
          </Picker>
       </List>
       <WhiteSpace/>
       <List>
        <InputItem
          {...getFieldProps('phone', {initialValue:'18312341324'})}
          clear
          placeholder="请填入电话号码"
        >
          <div><I className="iconfont icon-tel"/><Span>电话号码</Span></div>
        </InputItem>
        <InputItem
          {...getFieldProps('mail', {initialValue:'279920@qq.com'})}
          clear
          placeholder="请填入邮箱"
        >
          <div><I className="iconfont icon-email"/><Span>邮箱</Span></div>
        </InputItem>
      </List>
      <WhiteSpace/>
      <List>
        <Picker data={cityOption} cols={1} {...getFieldProps('city', {initialValue:['50']})} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-city"/><Span>所在城市</Span></div>
          </List.Item>
        </Picker>
        <Picker data={jobStatus} cols={1} {...getFieldProps('jobStatus', {initialValue:['0']})} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-incumbencyHr"/><Span>在职状态</Span></div>
          </List.Item>
        </Picker>
      </List>
       <List.Item>
         <Button type="warning" size="small" inline onClick={this.onSubmit}>Submit</Button>
       </List.Item>
      </Layout>
    )
  }
}
const WrappedBaseInformation = Form.create()(BaseInformation);
export default WrappedBaseInformation;
