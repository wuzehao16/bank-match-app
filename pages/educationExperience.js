import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Picker, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
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
const graduationTime = [
  [
    {
      label:'2018',
      value:'2018'
    },
    {
      label:'2017',
      value:'2017'
    }
  ],
  [
    {
      label:'1',
      value:'1'
    },
    {
      label:'2',
      value:'2'
    },
    {
      label:'3',
      value:'3'
    },
    {
      label:'4',
      value:'4'
    },
    {
      label:'5',
      value:'5'
    },
    {
      label:'6',
      value:'6'
    },
    {
      label:'7',
      value:'7'
    },
    {
      label:'8',
      value:'8'
    },
  ]
];

const education = [
  [
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
]
class EducationExperience extends React.PureComponent {
  state = {
    // data: [],
    // cols: 1,
    // pickerValue: [],
    // asyncValue: [],
    gtValue: ['2018', '6'],
    // visible: false,
  };
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
            <div><I className="iconfont icon-school"/><Span>学校</Span></div>
          </InputItem>
          <InputItem
            {...getFieldProps('inputtitle2')}
            placeholder="请输入专业"
          >
            <div><I className="iconfont icon-zhuanye"/><Span>专业</Span></div>
          </InputItem>

        </List>
        <WhiteSpace/>
        <List>
          <Picker
            data={graduationTime}
            title="毕业年份"
            // cascade={false}
            // extra="请选择毕业年份"
            value={this.state.gtValue}
            // onChange={v => this.setState({ sValue: v })}
            // onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal"><I className="iconfont icon-year" /><Span>毕业年份</Span></List.Item>
          </Picker>
          <Picker data={education} cols={1} title="学历" {...getFieldProps('education')}>
            <List.Item arrow="horizontal"><I className="iconfont icon-school1" /><Span>学历</Span></List.Item>
          </Picker>
        </List>
        <style jsx global>{`
          .am-list-item .am-input-label {
            color: #ee5648 !important;
            font-size: 14px !important;
          }   
          .am-list-item .am-input-control input {
            font-size: 14px !important;
          }
          .am-list-extra {
            font-size: 14px !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}

const EducationExperienceWapper = Form.create()(EducationExperience);
export default EducationExperienceWapper;
