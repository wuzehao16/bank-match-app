import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Picker, List, InputItem, WhiteSpace, WingBlank } from 'antd-mobile';
import { Form } from 'antd';

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
class EducationExperience extends React.PureComponent {
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
      <Layout  title="教育经历">
        <WhiteSpace/>
        <List>
          <InputItem
            {...getFieldProps('inputtitle1')}
            placeholder="请输入毕业学校"
          >
            <div><i className="iconfont icon-school"/><span className="itemTitle">学校</span></div>
          </InputItem>
          <InputItem
            {...getFieldProps('inputtitle2')}
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
            {...getFieldProps('graduationTime')}
            // extra="请选择毕业年份"
            // value={this.state.gtValue}
            // onChange={v => this.setState({ sValue: v })}
            // onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal"><i className="iconfont icon-year" /><span className="itemTitle">毕业时间</span></List.Item>
          </Picker>
          <Picker data={education} cols={1} title="学历" {...getFieldProps('education')} className="forss">
            <List.Item arrow="horizontal"><i className="iconfont icon-school1" /><span className="itemTitle">学历</span></List.Item>
          </Picker>
        </List>
        <WingBlank>
          <Button onClick={this.remove}>删除此教育经历</Button><WhiteSpace />
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

const EducationExperienceWapper = Form.create()(EducationExperience);
export default EducationExperienceWapper;
