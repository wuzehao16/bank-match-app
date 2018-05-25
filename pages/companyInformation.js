import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../layout/RecruitLayout';
import Avatar from '@material-ui/core/Avatar';
import fetch from '../lib/fetch';
import getCookie from '../lib/getCookie';
import { InputItem, List, Button, WingBlank, WhiteSpace, Picker, TextareaItem } from 'antd-mobile';
import { Form } from 'antd';

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
const Name = styled.h3`
  font-size: 14px;
  color: #333;
  padding-left: 15px;
  font-weight: normal;
`

const scale = [
  {
    label: '20人以下',
    value: 1
  },
  {
    label: '20-49人',
    value: 2
  },
  {
    label: '50-99人',
    value: 3
  },
  {
    label: '100-499人',
    value: 4
  },
  {
    label: '500人以上',
    value: 5
  }
]

class CompanyInformation extends React.PureComponent {

  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const userInfo = await fetch(`/getUserInfo`)
    const orgType = await fetch(`/selectByType?type=orgType`)
    return { dic: {
              orgType:orgType,
              },
             userInfo: userInfo
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
        const validateData = {
          headProtrait: validateValues.headProtrait,
          userName:validateValues.userName,
          companyName:validateValues.companyName,
          intro:validateValues.intro,
          organizationCategory:validateValues.organizationCategory.toString(),
          scale:validateValues.scale.toString(),
          job:validateValues.job,
          mail:validateValues.mail,
          addressDetial:validateValues.addressDetial,
        }
        console.log(validateData);
      } else {
        console.log('Validation failed',error);
      }
    });
  }

  render() {
    const { userInfo, resume } = this.props
    const { getFieldProps, getFieldsError } = this.props.form;
    const { orgType} = this.props.dic;
    const orgTypeOption = orgType.map(i => {return {value:i.code, label:i.name}})
    return (
      <Layout title="基本信息">
        <Head>
            <Avatar
              alt="Adelle Charles"
              src={userInfo.userHead}
              style={{height:60,width:60}}
              {...getFieldProps('headProtrait',{initialValue:userInfo.userHead})}
            />
            <Name {...getFieldProps('userName',{initialValue:userInfo.userName})}>{userInfo.userName}</Name>
        </Head>
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('companyName',{rules:[
              {
                required: true,
              }
            ]
          })}
          >
            <div className="itemTitle">公司名称</div>
          </InputItem>
          <InputItem
            {...getFieldProps('intro',{rules:[
              {
                required: true,
              }
            ]
          })}
          >
            <div className="intro">公司简称</div>
          </InputItem>
          <Picker data={orgTypeOption} cols={1} title="机构类别" {...getFieldProps('organizationCategory',{rules:[
              {
                required: true,
              }
            ]
          })} className="forss">
            <List.Item arrow="horizontal">机构类别</List.Item>
          </Picker>
          <Picker data={scale} cols={1} title="公司规模" {...getFieldProps('scale',{rules:[
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
            {...getFieldProps('mail',{rules:[
              {
                required: true,
              }
            ]
          })}
            type="email"
            labelNumber="6"
          >
            <div className="itemTitle">接收简历邮箱</div>
          </InputItem>
        </List>
        <List renderHeader={() => '所在地区(详细地址)'}>
          <TextareaItem
            {...getFieldProps('addressDetial',{
              rules:[
                {
                  required: true
                }
              ]
            })}
            rows={3}
            // count={50}
            // placeholder='请输入公司详细地址'
            style={{background:'#f2f2f2',padding:'3px 3px'}}
          />
        </List>  
        <WhiteSpace />
        <List>
          <InputItem
            {...getFieldProps('job',{rules:[
              {
                required: true,
              }
            ]
          })}
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
            color: #888 !important;
            text-align: right;
          }
        `}</style>
      </Layout>
    )
  }
}

const CompanyInformationWapper = Form.create()(CompanyInformation);
export default CompanyInformationWapper;
