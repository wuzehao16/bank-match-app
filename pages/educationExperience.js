import React from 'react'
import Link from 'next/link'
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout';
import { Picker, List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { Form } from 'antd';
import dayjs from 'dayjs';

const FormItem = Form.Item;
const Item = List.Item;

const date = new Date();
const currentYear = date.getFullYear();
let graduationTime = new Array();
for (let i = 1990; i<=currentYear;i++){
  let data = {
    label: i,
    value: i
  }
   graduationTime.unshift(data);
}

const education = [
    {
      label:'博士',
      value:'博士'
    },
    {
      label:'研究生',
      value:'研究生'
    },
    {
      label:'本科',
      value:'本科'
    },
    {
      label:'专科',
      value:'专科'
    },
    {
      label:'高中',
      value:'高中'
    },
]

class EducationExperience extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const education = await fetch(`/selectByType?type=education`)
    return { dic: {
                education:education,
              }
            }
  }
  componentDidMount () {
    this.props.form.validateFields();
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  save = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const validateValues = this.props.form.getFieldsValue();
        const array=validateValues.entryTime;
        // array.push('01');
        // array.
      } else {
        console.log('Validation failed',error);
      }
    });
  }


  render() {
    const { education} = this.props.dic;
    const educationOption = education.map(i => {return {value:i.code, label:i.name}})
    const { getFieldProps, getFieldsError } = this.props.form;
    return (
      <Layout  title="教育经历">
        <WhiteSpace/>
        <List>
          <InputItem
            {...getFieldProps('school',{rules:[
              {
                required: true,
              }
            ]
          })}
            placeholder="请输入毕业学校"
          >
            <div><i className="iconfont icon-school"/><span className="itemTitle">学校</span></div>
          </InputItem>
          <InputItem
            {...getFieldProps('major',{rules:[
              {
                required: true,
              }
            ]
          })}
            placeholder="请输入专业"
          >
            <div><i className="iconfont icon-zhuanye"/><span className="itemTitle">专业</span></div>
          </InputItem>

        </List>
        <WhiteSpace/>
        <List>
          <Picker
            data={graduationTime}
            title="毕业时间"
            className="forss"
            cols={1}
            {...getFieldProps('graduate',{rules:[
              {
                required: true,
              }
            ]
          })}
            // extra="请选择毕业年份"
            // value={this.state.gtValue}
            // onChange={v => this.setState({ sValue: v })}
            // onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal"><i className="iconfont icon-year" /><span className="itemTitle">毕业时间</span></List.Item>
          </Picker>
          <Picker data={educationOption} cols={1} title="学历" {...getFieldProps('educationBackground',{rules:[
              {
                required: true,
              }
            ]
          })} className="forss">
            <List.Item arrow="horizontal"><i className="iconfont icon-school1" /><span className="itemTitle">学历</span></List.Item>
          </Picker>
        </List>
        <WingBlank>
          <Button onClick={this.save} type="primary" disabled={this.hasErrors(getFieldsError())} style={{marginTop:'50px',fontSize:'14px'}}>保存</Button><WhiteSpace />
        </WingBlank>
        <style jsx global>{`
          .iconfont {
            color: #ee5648;
          }
          .itemTitle {
            color: #666;
            font-size: 14px;
            padding-left: 10px;
          }
          .am-list-extra {
            font-size: 14px !important;
          }
          .am-list-item .am-input-control input {
            font-size: 14px !important;
            color: #888 !important;
            text-align: right;
          }
        `}
        </style>
      </Layout>
    )
  }
}

const EducationExperienceWapper = Form.create()(EducationExperience);
export default EducationExperienceWapper;
