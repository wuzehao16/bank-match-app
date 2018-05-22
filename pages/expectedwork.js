import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Picker, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import "../styles/index.css"
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
const city =[
  {
    label:'离职',
    value:'0'
  },
  {
    label:'在职',
    value:'1'
  },
]
const salary =[
  {
    label:'离职',
    value:'0'
  },
  {
    label:'在职',
    value:'1'
  },
]

class ExpectedWork extends React.PureComponent {
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
    const { getFieldProps } = this.props.form;
    return (
      <Layout title="期望工作">
        <WhiteSpace/>
      <List>
        <Picker data={job} cols={1} {...getFieldProps('city')} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-city"/><Span>期望工作</Span></div>
          </List.Item>
        </Picker>
        <Picker data={city} cols={1} {...getFieldProps('jobStatus')} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-incumbencyHr"/><Span>期望城市</Span></div>
          </List.Item>
        </Picker>
        <Picker data={salary} cols={1} {...getFieldProps('jobStatus')} className="forss">
          <List.Item arrow="horizontal">
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
