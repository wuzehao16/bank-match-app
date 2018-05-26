import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout';
import { DatePicker, Picker, List, InputItem, WhiteSpace, WingBlank, TextareaItem, Button, Toast} from 'antd-mobile';
import { Form } from 'antd';
import { formatData } from '../lib/util'
import { insertWorkExperience } from '../services/recruit'

const date = new Date();
const currentYear = date.getFullYear();
let EmploymentDate = new Array();
let EmploymentYear = new Array();
for (let i = 1990; i<=currentYear;i++){
  let data = {
    label: i,
    value: i
  }
  EmploymentYear.unshift(data);
}
const Month = [
  {
    label:'01',
    value:'01'
  },
  {
    label:'02',
    value:'02'
  },
  {
    label:'03',
    value:'03'
  },
  {
    label:'04',
    value:'04'
  },
  {
    label:'05',
    value:'05'
  },
  {
    label:'06',
    value:'06'
  },
  {
    label:'07',
    value:'07'
  },
  {
    label:'08',
    value:'08'
  },
  {
    label:'09',
    value:'09'
  },
  {
    label:'10',
    value:'10'
  },
  {
    label:'11',
    value:'11'
  },
  {
    label:'12',
    value:'12'
  },
]

EmploymentDate.push(EmploymentYear);
EmploymentDate.push(Month);

const leaveDate = EmploymentDate;

class WorkExperience extends React.PureComponent {

  async saveData(value) {
    const res = await insertWorkExperience(value);
    console.log('res',res)
    if (res.code != 0) {
      Toast.fail(res.msg);
    }
  }

  save = () => {
    this.props.form.validateFields({ force: true }, (error,value) => {
      if (!error) {
        console.log('value1',value)
        value = formatData(value);
        console.log('value2',value);
        this.saveData(value);
      } else {
        console.log('Validation failed',error);
      }
    });
  }

  componentDidMount () {
    this.props.form.validateFields();
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldProps, getFieldsError} = this.props.form;
    // console.log(this.props)
    return (
      <Layout  title="工作经历">
        <WhiteSpace/>
        <List>
          <InputItem
            {...getFieldProps('companyName',{rules:[
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
            {...getFieldProps('job',{rules:[
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
            {...getFieldProps('entryTime',{rules:[
              {
                required: true,
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
            {...getFieldProps('leaveTime',{rules:[
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
            {...getFieldProps('jobContent',{rules:[
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
