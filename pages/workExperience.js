import React from 'react'
import Link from 'next/link'
import fetch from '../lib/fetch'
import Router from 'next/router'
import { getCookie } from '../lib/util'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout'
import { DatePicker, Picker, List, InputItem, WhiteSpace, WingBlank, TextareaItem, Button, Toast} from 'antd-mobile'
import { Form } from 'antd'
import { formatData } from '../lib/util'
import dayjs from 'dayjs'
import { insertWorkExperience, updateWorkExperience, deleteWorkExperience } from '../services/recruit'

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth()+1;
let EmploymentDate = new Array();
let EmploymentYear = new Array();
let Month = new Array();
for (let i = 1990; i <= currentYear;i++){
  EmploymentYear.unshift({
    label: i,
    value: i
  });
}

for (let i = 1; i <= currentMonth; i++){
  Month.push({
    label: i,
    value: i
  })
}

EmploymentDate.push(EmploymentYear);
EmploymentDate.push(Month);

const leaveDate = EmploymentDate;

class WorkExperience extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req);
    var i;
    // ${query.workExperienceId}
    if(query.workExperienceId){
      i = await fetch(`/getWorkExperienceDetail?workExperienceId=${query.workExperienceId}`,token)
    }
    return {
            workExperienceId: query.workExperienceId,
            resumeId: query.resumeId,
            i: i || {},
            }
  }
  componentDidMount () {
    this.props.form.validateFields();
    window.deleteWork = this.delete;
  }
  async saveData(value) {
    console.log('value',value)
    const res = await insertWorkExperience(value);
    if (res.code == 0) {
      Router.push({
        pathname:'/workExperienceList',
        query: { resumeId: this.props.resumeId }
      })
    } else {
      Toast.fail(res.msg);
    }
  }

  async updateData(value) {
    const res = await updateWorkExperience(value);
    if (res.code == 0) {
      Router.push({
        pathname:'/workExperienceList',
        query: { resumeId: this.props.resumeId }
      })
    } else {
      Toast.fail(res.msg);
    }
  }

  async deleteData(val) {
    const res = await deleteWorkExperience(val);
    if (res.code == 0) {
      Router.push(`/workExperienceList?resumeId=${this.props.resumeId}`)
    } else {
      Toast.fail(res.msg);
    }
  }

  delete = () => {
    console.log("this.props.workExperienceId",this.props.workExperienceId)
    this.deleteData(this.props.workExperienceId)
  }

  save = () => {
    this.props.form.validateFields({ force: true }, (error,value) => {
      if (!error) {
        console.log('提交的value',value)
        value = this.props.workExperienceId?{...formatData(value),workExperienceId:this.props.workExperienceId}:{...formatData(value),resumeId:this.props.resumeId}
        this.props.workExperienceId?this.updateData(value): this.saveData(value);
        console.log('formatvalue',value)
      } else {
        console.log('Validation failed',error);
      }
    });
  }


  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldProps, getFieldsError} = this.props.form;
    const {i, workExperienceId, resumeId} = this.props;
    return (
      <Layout  title="工作经历">
        <WhiteSpace/>
        <List>
          <InputItem
            {...getFieldProps('companyName',{initialValue:i.companyName,rules:[
              {
                required: true,
              }
            ]
          })}
            placeholder="请输入公司名称"
          >
            <div><i className="iconfont icon-company"/><span className="itemTitle">公司名称</span></div>
          </InputItem>
          <InputItem
            {...getFieldProps('job',{initialValue:i.job, rules:[
              {
                required: true,
              }
            ]
          })
        }
            placeholder="请输入任职岗位"
          >
            <div><i className="iconfont icon-jober"/><span className="itemTitle">任职岗位</span></div>
          </InputItem>
        </List>
        <WhiteSpace/>
        <List>
          <Picker
            data={EmploymentDate}
            title="入职时间"
            className="forss"
            cascade={false}
            {...getFieldProps('entryTime',{initialValue:i.entryTime?[dayjs(i.entryTime).year(),dayjs(i.entryTime).month()+1]:[],rules:[
              {
                required: true,
                // dayjs(i.entryTime).format('YYYY,MM')
              }
            ]
          })}
          >
            <List.Item arrow="horizontal"><i className="iconfont icon-year" /><span className="itemTitle">入职时间</span></List.Item>
          </Picker>
          <Picker
            data={leaveDate}
            title="离职时间"
            className="forss"
            cascade={false}
            {...getFieldProps('leaveTime',{initialValue:i.leaveTime?[dayjs(i.leaveTime).year(),dayjs(i.leaveTime).month()+1]:[],rules:[
              {
                required: true,
              }
            ]
          })}
          >
            <List.Item arrow="horizontal"><i className="iconfont icon-time" /><span className="itemTitle">离职时间</span></List.Item>
          </Picker>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => <div><i className="iconfont icon-content" /><span className="itemTitle">工作内容</span></div>}>
          <TextareaItem
            {...getFieldProps('jobContent',{initialValue:i.job, rules:[
              {
                required: true,
                message:"岗位不为空"
              }
            ]
          })}
            rows={8}
            placeholder='请输入你的工作内容…'
            count={1600}
          />
        </List>
        <WingBlank size="lg">
          <Button type="primary" style={{marginTop:'50px',marginLeft: '8px',fontSize:'14px'}} disabled={this.hasErrors(getFieldsError())} className="am-button-borderfix" onClick={this.save}>保存</Button>
          {/* <WhiteSpace /> */}
          {/* <Button >删除此工作经历</Button> */}
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
          .am-list-header {
            background: #fff;
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

const WorkExperienceWapper = Form.create()(WorkExperience);
export default WorkExperienceWapper;
