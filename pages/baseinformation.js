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

class BaseInformation extends React.PureComponent {
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
      <Layout title="基本信息">
        <WhiteSpace/>
        <List >
          <InputItem
            {...getFieldProps('name')}
            clear
            placeholder="最好使用真实姓名"
          >
            <div><I className="iconfont icon-name"/><Span>姓名</Span></div>
          </InputItem>
          {/* </Item> */}

          <Picker data={sex} cols={1} {...getFieldProps('sex')} className="forss">
            <List.Item arrow="horizontal">
                <div><I className="iconfont icon-Sex"/><Span>性别</Span></div>
            </List.Item>
          </Picker>
          <Picker data={sex} cols={1} {...getFieldProps('birthYear')} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-icon-chushengriqi"/><Span>出生年月</Span></div>
            </List.Item>
          </Picker>
        </List>
        <WhiteSpace/>

        <List>
          <Picker data={sex} cols={1} {...getFieldProps('education')} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-incumbencyHr"/><Span>最高学历</Span></div>
            </List.Item>
          </Picker>
          <Picker data={jobStatus} cols={1} {...getFieldProps('workingYear')} className="forss">
            <List.Item arrow="horizontal">
              <div><I className="iconfont icon-time"/><Span>工作年限</Span></div>
            </List.Item>
          </Picker>
       </List>
       <WhiteSpace/>
       <List>
        <InputItem
          {...getFieldProps('phone')}
          clear
          placeholder="请填入电话号码"
        >
          <div><I className="iconfont icon-tel"/><Span>电话号码</Span></div>
        </InputItem>
        <InputItem
          {...getFieldProps('mail')}
          clear
          placeholder="请填入邮箱"
        >
          <div><I className="iconfont icon-email"/><Span>邮箱</Span></div>
        </InputItem>
      </List>
      <WhiteSpace/>
      <List>
        <Picker data={sex} cols={1} {...getFieldProps('city')} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-city"/><Span>所在城市</Span></div>
          </List.Item>
        </Picker>
        <Picker data={jobStatus} cols={1} {...getFieldProps('jobStatus')} className="forss">
          <List.Item arrow="horizontal">
            <div><I className="iconfont icon-incumbencyHr"/><Span>在职状态</Span></div>
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
const WrappedBaseInformation = Form.create()(BaseInformation);
export default WrappedBaseInformation;
