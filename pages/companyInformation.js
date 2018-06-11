import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Router from 'next/router'
import { InputItem, List, Button, WingBlank, WhiteSpace, Picker, TextareaItem, Toast } from 'antd-mobile';
import { Form } from 'antd';
import Layout from '../layout/RecruitLayout';
import fetch from '../lib/fetch';
import addressData from '../lib/address';
import { formatData,getCookie } from '../lib/util'
import { insertCompany, updateCompany } from '../services/recruit'
const FormItem = Form.Item;
const Item = List.Item;


const Head = styled.div`
  padding:15px 0 15px 25px;
  // height:111px;
  background-color:#fff;
  display: flex;
  justify-content: left;
  align-items: center;
`
const Name = styled.input`
  font-size: 14px;
  color: #333;
  padding-left: 15px;
  font-weight: normal;
  border: none;
`

const scaleOption = [
  {
    label: '20人以下',
    value: "1"
  },
  {
    label: '20-49人',
    value: "2"
  },
  {
    label: '50-99人',
    value: "3"
  },
  {
    label: '100-499人',
    value: "4"
  },
  {
    label: '500人以上',
    value: "5"
  }
]

class CompanyInformation extends React.PureComponent {

  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const userInfo = await fetch(`/getUserInfo`,token)
    const orgType = await fetch(`/selectByType?type=orgType`)
    const companyInfo = JSON.parse(sessionStorage.getItem('companyInfo'));
    return {
      dic: {
        orgType: orgType
      },
      companyInfo:companyInfo,
      userInfo: userInfo
    }
  }
  state ={
    companyName:""
  }
  componentDidMount () {
    this.props.form.validateFields();
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  async sendData(value) {
    try {
      var res;
      if (value.companyId) {
        res = await updateCompany(value);
      } else {
        res = await insertCompany(value);
      }
      if (res.code ==0) {
        Router.push(`/publishedJobList?companyId=${this.props.companyInfo.companyId}`)
      } else {
        Toast.fail(res.msg);
      }
    } catch (e) {
        console.log(e)
    }
  }

  save = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        // console.log('value1',value)
        value = {
          ...this.props.companyInfo,
          ...formatData(value)
        }
        // console.log('value2',value)
        this.sendData(value)
      } else {
        console.log('Validation failed',error);
      }
    });
  }

  render() {
    const { userInfo, resume } = this.props;
    const { companyName, intro, organizationCategory, scale, mail,address, addressDetial, job } = this.props.companyInfo;
    const { getFieldProps, getFieldsError } = this.props.form;
    const { orgType} = this.props.dic;
    const orgTypeOption = orgType.map(i => {return {value:i.code, label:i.name}})
    if (!userInfo.userHead) {
      userInfo.userHead = '/static/resume_head.png'
    }
    userInfo.userName ="wuzehao"
    return (
      <Layout title="基本信息">
        <Head>
            <Avatar
              alt="Adelle Charles"
              src={userInfo.userHead}
              style={{height:60,width:60}}
              {...getFieldProps('headProtrait',{initialValue:userInfo.userHead})}
            />
            <Name placeholder="请输入名称" {...getFieldProps('userName',{
              initialValue:userInfo.userName,
              rules:[
              {
                required: true,
              }
            ]

            })}/>
        </Head>
        <WhiteSpace />
        <List>
          <InputItem
            disabled
            {...getFieldProps('companyName',{
              initialValue: companyName,
              rules:[
              {
                required: true,
              }
            ]
          })}
          >
            <div className="itemTitle">公司名称</div>
          </InputItem>
          <InputItem
            {...getFieldProps('intro',{
              initialValue:intro,
              rules:[
              {
                required: true,
              }
            ]
          })}
          placeholder="请输入公司简称"
          >
            <div className="intro">公司简称</div>
          </InputItem>

          <Picker data={orgTypeOption} cols={1} title="机构类别" {...getFieldProps('organizationCategory',{
            initialValue:organizationCategory?(orgTypeOption.filter( item => item.label == organizationCategory))[0].value:'',
            rules:[
              {
                required: true,
              }
            ]
          })} className="forss">
            <List.Item arrow="horizontal">机构类别</List.Item>
          </Picker>

          {/* <Picker data={orgTypeOption} cols={1} title="机构类别" {...getFieldProps('organizationCategory',{
            initialValue:organizationCategory?parseInt( (orgTypeOption.filter( item => item.label == organizationCategory))[0].value ):'',
            rules:[
              {
                required: true,
              }
            ]
          })} className="forss">
            <List.Item arrow="horizontal">机构类别</List.Item>
          </Picker> */}

          <Picker data={scaleOption} cols={1} title="公司规模" {...getFieldProps('scale',{
            initialValue:scale,
            rules:[
              {
                required: true,
              }
            ]
          })} className="forss">
            <List.Item arrow="horizontal">公司规模</List.Item>
          </Picker>
        </List>
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('mail',{
              initialValue:mail,
              rules:[
              {
                required: true,
              }
            ]
          })}
            type="email"
            labelNumber="6"
            placeholder="请输入邮箱地址"
          >
            <div className="itemTitle">接收简历邮箱</div>
          </InputItem>
        </List>
        <Picker
          extra="请选择"
          data={addressData}
          title="地区"
          {...getFieldProps('address', {
            initialValue:address?address.split('-'):'',
            rules:[
            {
              required: true,
            }
          ]
          })}
        >
          <List.Item arrow="horizontal">公司地址</List.Item>
        </Picker>
        <List renderHeader={() => '所在地区(详细地址)'}>
          <TextareaItem
            {...getFieldProps('addressDetial',{
              initialValue:addressDetial,
              rules:[
                {
                  required: true
                }
              ]
            })}
            rows={3}
            // count={50}
            // placeholder='请输入公司详细地址'
            style={{background:'#f2f2f2',padding:'3px 3px',fontSize:'14px',color:'#3c3c3c'}}
          />
        </List>
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('job',{
              initialValue:job,
              rules:[
              {
                required: true,
              }
            ]
          })}
          placeholder="请输入您的职位"
          >
            <div className="itemTitle">您的职位</div>
          </InputItem>
        </List>
        <WingBlank>
          <Button onClick={this.save} type="primary" disabled={this.hasErrors(getFieldsError())} style={{marginTop:'50px',fontSize:'14px'}}>保存</Button><WhiteSpace />
        </WingBlank>
        <style jsx global>{`
          .am-list-header {
            background: #fff !important;
            color: #3c3c3c !important;
          }
          .am-list-body::before {
            height: 0px !important;
          }
          .am-list-item .am-input-label {
            font-size: 14px !important;
            color: #3c3c3c !important;
          }
          .am-list-item .am-list-line .am-list-content {
            font-size: 14px !important;
            color: #3c3c3c !important;
          }
          .am-list-extra {
            font-size: 14px !important;
          }
          .am-list-item .am-input-control input {
            font-size: 14px !important;
            color: #666 !important;
            text-align: right;
          }
          .am-list-item .am-input-control input:disabled {
            color: #666 !important;
          }
          .am-list-item .am-list-line .am-list-extra {
            color:#666 !important;
          }
          ::-webkit-input-placeholder { /* WebKit browsers */
            color:#666 !important;
          }
          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #666 !important;
          }
          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #666 !important;
          }
          :-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #666 !important;
          }
        `}</style>
      </Layout>
    )
  }
}

const CompanyInformationWapper = Form.create()(CompanyInformation);
export default CompanyInformationWapper;
