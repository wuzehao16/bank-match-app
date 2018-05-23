import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Picker, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { Form } from 'antd';
import Layout from '../layout/RecruitLayout';
import "../styles/index.css"
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
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

const job =[
  {
    label:'销售人员',
    value:'1'
  },
  {
    label:'销售主管',
    value:'2'
  },
  {
    label:'销售总监',
    value:'3'
  }
]
const salary =[
  [
    {
      label: '1k',
      value: '1',
    },
    {
      label: '2k',
      value: '2',
    },
  ],
  [
    {
      label: '2k',
      value: '2',
    },
    {
      label: '3k',
      value: '3',
    },
  ],
];

class ExpectedWork extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const jobTitle = await fetch(`/selectByType?type=jobTitle`)
    const city = await fetch(`/selectByType?type=city`)
    return { dic: {
                jobTitle:jobTitle,
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
  handleChange = () => {
    console.log(1)
  }
  render() {
    const {city ,jobTitle } = this.props.dic;
    const { getFieldProps } = this.props.form;
    const jobTitleOption = jobTitle.map(i => {return {value:i.code, label:i.name}})
    const cityOption = city.map(i => {return {value:i.code, label:i.name}})
    console.log(cityOption)
    return (
      <Layout title="期望工作">
        <WhiteSpace/>
      <List>
        <Picker data={jobTitleOption} cols={1} {...getFieldProps('jobStatus')} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-city"/><Span>期望工作</Span></div>
          </List.Item>
        </Picker>
        <Picker data={cityOption} cols={1} {...getFieldProps('city')} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-incumbencyHr"/><Span>期望城市</Span></div>
          </List.Item>
        </Picker>
        <Picker cascade={false}  data={salary} onPickerChange={this.handleChange} onScrollChange={this.handleChange} onChange={this.handleChange} cols={1} {...getFieldProps('jobStatus')} className="forss">
          <List.Item arrow="horizontal" >
            <div><I className="iconfont icon-incumbencyHr"/><Span>期望月薪</Span></div>
          </List.Item>
        </Picker>
      </List>
       <List.Item>
         <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
       </List.Item>
      </Layout>
    )
  }
}
const WrappedExpectedWork = Form.create()(ExpectedWork);
export default WrappedExpectedWork;
