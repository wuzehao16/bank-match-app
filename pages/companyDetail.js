import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { InputItem, List, WingBlank, WhiteSpace, Picker, TextareaItem } from 'antd-mobile';
import Layout from '../layout/HasFooterRecruitLayout';
import Avatar from '@material-ui/core/Avatar';
import fetch from '../lib/fetch';
import { getCookie } from '../lib/util';
import addressData from '../lib/address';
import withRoot from '../src/withRoot';
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
const ImgGroup = styled.div`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 50px;
  padding-bottom: 10px;
`

const Img = styled.img`
  width: 213px;
  height: 157px;
  // margin-top: 15px;
`

const P = styled.p`
  font-size: 14px;
  color: #333;
  text-align: center;
  margin: 15px 0;
`

const scaleOption = [
  {
    label: '20人以下',
    value: '1'
  },
  {
    label: '20-49人',
    value: '2'
  },
  {
    label: '50-99人',
    value: '3'
  },
  {
    label: '100-499人',
    value: '4'
  },
  {
    label: '500人以上',
    value: '5'
  }
]

class companyDetail extends React.PureComponent {

  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const userInfo = await fetch(`/getUserInfo`,token)
    const companyInfo = await fetch(`/getCompanyDetail`,token)
    const orgType = await fetch(`/selectByType?type=orgType`)
    return {
      dic: {
        orgType: orgType
      },
      companyInfo:companyInfo,
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
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        const validateValues = this.props.form.getFieldsValue();
        const validateData = {
          headProtrait: value.headProtrait,
          userName:value.userName,
          companyName:value.companyName,
          intro:value.intro,
          organizationCategory:value.organizationCategory.toString(),
          scale:value.scale.toString(),
          job:value.job,
          mail:value.mail,
          address:value.address,
          addressDetial:value.addressDetial,
        }
        console.log(value);
      } else {
        console.log('Validation failed',error);
      }
    });
  }

  render() {
    const { userInfo, resume } = this.props
    const { companyName, intro, organizationCategory, scale, mail,address, addressDetial, job, logo,businessLicense } = this.props.companyInfo;
    const { getFieldProps, getFieldsError } = this.props.form;
    const { orgType} = this.props.dic;
    const orgTypeOption = orgType.map(i => {return {value:i.code, label:i.name}})
    return (
      <Layout title="公司信息">
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
            disabled
            {...getFieldProps('intro',{
              initialValue:intro,
              rules:[
              {
                required: true,
              }
            ]
          })}
          >
            <div className="intro">公司简称</div>
          </InputItem>
          <Picker disabled data={orgTypeOption} cols={1} title="机构类别" {...getFieldProps('organizationCategory',{
            initialValue:
            [organizationCategory?(orgTypeOption.filter( item => item.label == organizationCategory))[0].value:'']
            ,
            rules:[
              {
                required: true,
              }
            ]
          })} className="forss">
            <List.Item arrow="horizontal">机构类别</List.Item>
          </Picker>
          <Picker disabled data={scaleOption} cols={1} title="公司规模" {...getFieldProps('scale',{
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
            disabled
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
          >
            <div className="itemTitle">接收简历邮箱</div>
          </InputItem>
        </List>
        <Picker
          disabled
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
            disabled
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
            disabled
            {...getFieldProps('job',{
              initialValue:job,
              rules:[
              {
                required: true,
              }
            ]
          })}
          >
            <div className="itemTitle">您的职位</div>
          </InputItem>
        </List>
        <WhiteSpace />
        <ImgGroup>
          <Img
            src={logo}
            {...getFieldProps('logo',{initialValue:logo})}
          />
          <P>公司标志</P>
          <Img
            src={businessLicense}
            {...getFieldProps('businessLicense',{initialValue:businessLicense})}
          />
          <P>营业执照</P>
        </ImgGroup>
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

const companyDetailWapper = Form.create()(companyDetail);
export default withRoot(companyDetailWapper);
