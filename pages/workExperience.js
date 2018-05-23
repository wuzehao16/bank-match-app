import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Picker, List, InputItem, WhiteSpace, WingBlank, TextareaItem} from 'antd-mobile';
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

const Button = styled.button`
font-size: 14px;
color: #ee5648;
background: #fff;
border-radius: 3px;
height: 40px;
width: 100%;
margin: 50px 0 0 0;
border: 1px solid #ee5648;
`

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

console.log('leaveDate',leaveDate);

class WorkExperience extends React.PureComponent {
  remove = () => {
    // this.props.form.validateFields({ force: true }, (error) => {
    //   if (!error) {
    //     console.log(this.props.form.getFieldsValue());
    //   } else {
    //     alert('Validation failed');
    //   }
    // });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Layout  title="工作经历">
        <WhiteSpace/>
        <List>
          <InputItem
            {...getFieldProps('inputtitle1')}
            placeholder="请输入公司名称"
          >
            <div><i className="iconfont icon-company"/><Span className="itemTitle">公司名称</Span></div>
          </InputItem>
          <InputItem
            {...getFieldProps('inputtitle2')}
            placeholder="请输入任职岗位"
          >
            <div><i className="iconfont icon-jober"/><Span className="itemTitle">任职岗位</Span></div>
          </InputItem>
        </List>
        <WhiteSpace/>
        <List>
          <Picker
            data={EmploymentDate}
            title="入职时间"
            className="forss"
            cascade={false}
            {...getFieldProps('EmploymentDate')}
          >
            <List.Item arrow="horizontal"><i className="iconfont icon-year" /><Span className="itemTitle">入职时间</Span></List.Item>
          </Picker>
          <Picker
            data={leaveDate}
            title="离职时间"
            className="forss"
            cascade={false}
            {...getFieldProps('leaveDate')}
          >
            <List.Item arrow="horizontal"><i className="iconfont icon-time" /><Span className="itemTitle">离职时间</Span></List.Item>
          </Picker>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => <div><i className="iconfont icon-content" /><Span className="itemTitle">工作内容</Span></div>}>
          <TextareaItem
            {...getFieldProps('count')}
            rows={5}
            placeholder='请输入你的工作内容…'
            count={200}
          />
        </List>
        <WingBlank>
          <Button onClick={this.remove}>删除此工作经历</Button><WhiteSpace />
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
          // .am-list-item .am-input-label {
          //   color: #ee5648 !important;
          //   font-size: 14px !important;
          // }   
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
          .am-picker-popup-item {
            color: #ee5648 !important;
          }
          .am-picker-popup-title {
            color: #000 !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}

const WorkExperienceWapper = Form.create()(WorkExperience);
export default WorkExperienceWapper;
