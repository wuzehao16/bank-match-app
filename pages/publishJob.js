import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout'
import { Picker, List, InputItem, WhiteSpace, Button, WingBlank,Toast,TextareaItem } from 'antd-mobile'
import { Form } from 'antd'
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
import { formatData } from '../lib/util'
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
const nature =[
  {
    label:'全职',
    value: 1
  },
  {
    label:'兼职',
    value: 2
  },
  {
    label:'实习',
    value: 3
  },
]
const ageLimit =[
  {
    label:'经验不限',
    value: 1
  },
  {
    label:'应届生',
    value: 2
  },
  {
    label:'一年以下',
    value: 3
  },
  {
    label:'1-3年',
    value: 4
  },
  {
    label:'3-5年',
    value: 5
  },
  {
    label:'5-10年',
    value: 6
  },
  {
    label:'10年以上',
    value: 7
  }
]

const salary =[
  {
    label:'面议',
    value: 0
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
  }
];

class PublishJob extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    var i;
    const token = req ? getCookie('token', req) : ''
    if (query.type) {
      i = await fetch(`/getResumeDetail`)
    }
    const education = await fetch(`/selectByType?type=education`)
    const jobName = await fetch(`/selectByType?type=jobTitle`)
    // var i ;
    console.log(i)
    return {
            i: i || {},
            dic: {
                education: education,
                jobName: jobName
              }
            }
  }
  componentDidMount () {
    this.props.form.validateFields();
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  publishJob = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        console.log('value1',value);
        value = formatData(value)
        console.log('value2',value);
        // this.sendData(value);
      } else {
        alert('Validation failed');
      }
    });
  }
  render() {
    const { education,city,jobName } = this.props.dic;
    const i = this.props.i;
    const educationOption = education.map(i => {return {value:i.code, label:i.name}})
    const jobNameOption = jobName.map(i => {return {value:i.code, label:i.name}})
    const { getFieldProps, getFieldsError } = this.props.form;
    return (
      <Layout title="发布职位">
        <WhiteSpace/>
        <List >
          <Picker data={jobNameOption} title="职位名称" cols={1} {...getFieldProps('jobName', {initialValue:i.jobName?[i.jobName]:'',rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
                <div>职位名称</div>
            </List.Item>
          </Picker>
          <Picker data={nature} cols={1} title="工作性质" {...getFieldProps('nature', {initialValue:i.nature?[i.nature]:'',rules:[{required:true}]})} className="forss">
          <List.Item arrow="horizontal">
            <div>工作性质</div>
          </List.Item>
        </Picker>
          <Picker data={ageLimit} cols={1} title="工作年限" {...getFieldProps('ageLimit', {initialValue:i.ageLimit?[i.ageLimit]:'',rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div>工作年限</div>
            </List.Item>
          </Picker>
          <Picker data={educationOption} title="学历要求" cols={1} {...getFieldProps('education', {initialValue:i.education?[i.education]:'',rules:[{required:true}]})} className="forss">
            <List.Item arrow="horizontal">
              <div>学历要求</div>
            </List.Item>
          </Picker>
          <Picker
              data = {salary}
              title="月薪范围"
            cols = {1}
            {  ...getFieldProps('salary', {
                initialValue: i.salary?[i.salary]:'',
                rules: [
                  {
                    required: true
                  }
                ]
              })
            }
            className = "forss" >
            <List.Item arrow="horizontal">
            <div>月薪范围</div>
            </List.Item>
          </Picker>
      </List>
      <List renderHeader={() => '职位描述'}>
          <TextareaItem
            {...getFieldProps('jobDesribe',{
              rules:[
                {
                  required: true
                }
              ]
            })}
            rows={8}
            count={1600}
            placeholder='请输入该职位描述…'
            style={{background:'#f2f2f2'}}
          />
      </List>
      <WingBlank>
        <Button onClick={this.publishJob} type="primary" disabled={this.hasErrors(getFieldsError())} style={{marginTop:'50px',fontSize:'14px'}}>发布</Button><WhiteSpace />
      </WingBlank>
      <style jsx global>{`
          .am-list-extra {
            font-size: 14px !important;
            color: #666 !important;
          }
          .am-list-item .am-list-line .am-list-content {
            font-size: 14px !important;
            color: #3c3c3c !important;
          }
          .am-list-header {
            background: #fff;
            color: #3c3c3c;
          }
          .am-list-body::before {
            height: 0px !important;
          }
          .am-textarea-control textarea {
            font-size: 14px !important;
            color: #666 !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}
const PublishJobWapper = Form.create()(PublishJob);
export default PublishJobWapper;
