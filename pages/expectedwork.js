import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Picker, List, InputItem, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { Form } from 'antd';
import Layout from '../layout/RecruitLayout';
import "../styles/index.css"
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
import { formatData } from '../lib/util'
import { updateExpectedWork } from '../services/recruit'
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
    value:1
  },
  {
    label:'销售主管',
    value:2
  },
  {
    label:'销售总监',
    value:3
  }
]
const salary =[
    {
      label: '面议',
      value: 0,
    },
    {
      label: '2k以下',
      value: 1,
    },
    {
      label: '2k-5k',
      value: 2,
    },
    {
      label: '5k-10k',
      value: 3,
    },
    {
      label: '10k-15k',
      value: 4,
    },
    {
      label: '15k-25k',
      value: 5,
    },
    {
      label: '25k-50k',
      value: 6,
    },
    {
      label: '50k以上',
      value: 7,
    },
];

class ExpectedWork extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    var i;
    const token = req ? getCookie('token', req) : '';
    i = await fetch(`/getExpectJobDetail`);
    const jobTitle = await fetch(`/selectByType?type=jobTitle`)
    const city = await fetch(`/selectByType?type=city`)
    return {
            resumeId:query.resumeId,
            i: i || {},
            dic: {
                jobTitle:jobTitle,
                city:city
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
    const res = await updateExpectedWork(value);
    if (res.code != 0) {
      Toast.fail(res.msg);
    }
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        value = {...formatData(value),resumeId:this.props.resumeId}
        this.sendData(value);
      } else {
        alert('Validation failed');
      }
    });
  }

  render() {
    const {dic:{city , jobTitle} , i={}} = this.props;
    const { getFieldProps, getFieldsError } = this.props.form;
    const jobTitleOption = jobTitle.map(i => {return {value:i.code, label:i.name}})
    const cityOption = city.map(i => {return {value:i.code, label:i.name}})
    console.log('i',i)
    return (
      <Layout title="期望工作">
        <WhiteSpace/>
      <List>
      <Picker
      data = {jobTitleOption}
      title="期望工作"
      cols = {1}
       {...getFieldProps('expectJob', {
          initialValue: i.expectJob?[i.expectJob]:'',
          rules: [
            {
              required: true
            }
          ]
        })
      }
      className = "forss"
      >
      <List.Item arrow="horizontal">
        <div><I className="iconfont icon-city"/>
          <Span>期望工作</Span>
        </div>
      </List.Item>
      </Picker>
      <Picker
        title="期望城市"
        data = {cityOption}
      cols = {1}
      {...getFieldProps('expectCity', {
          initialValue: i.expectCity?[i.expectCity]:'',
          rules: [
            {
              required: true
            }
          ]
        })
      }
      className = "forss" >
      <List.Item arrow="horizontal">
        <div><I className="iconfont icon-incumbencyHr"/>
          <Span>期望城市</Span>
        </div>
      </List.Item>
      </Picker>
      <Picker
        data = {salary}
        title="期望月薪"
      cols = {1}
      {  ...getFieldProps('expectSalary', {
          initialValue: i.expectSalary?[i.expectSalary]:'',
          rules: [
            {
              required: true
            }
          ]
        })
      }
      className = "forss" >
      <List.Item arrow="horizontal">
        <div>
          <I className="iconfont icon-incumbencyHr"/>
          <Span>期望月薪</Span>
        </div>
      </List.Item>
      </Picker>
      </List>
      <WingBlank>
        <Button onClick={this.onSubmit} type="primary" disabled={this.hasErrors(getFieldsError())} style={{marginTop:'50px',fontSize:'14px'}}>保存</Button><WhiteSpace />
      </WingBlank>
      <style jsx global>{`
        .am-list-extra {
          font-size: 14px !important;
        }
      `}
      </style>
      </Layout>
    )
  }
}
const WrappedExpectedWork = Form.create()(ExpectedWork);
export default WrappedExpectedWork;
