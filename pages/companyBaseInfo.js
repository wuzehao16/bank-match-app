import React from 'react';
import Layout from '../layout/RecruitLayout';
import styled from 'styled-components'
import { InputItem, List, Button, WingBlank, WhiteSpace, ImagePicker } from 'antd-mobile';
import { Form } from 'antd';
import Router from 'next/router'
import fetch from '../lib/fetch';
import { getCookie } from '../lib/util';
import  Upload  from 'rc-upload';
import { uploadImage } from '../services/recruit'
import UploadImage from '../components/uploadImage'
const FormItem = Form.Item;

const P = styled.p`
  font-size: 14px;
  color: #333;
  text-align: center;
  margin: 15px 0;
`
const IDCard = styled.div`
  position: relative;
  width: 280px;
  height: 150px;
  background-color: #e4e4e4;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  overflow: hidden;
`
class CompanyBaseInfo extends React.PureComponent {

  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const companyInfo = await fetch(`/getCompanyDetail`,token)
    console.log('companyInfo',companyInfo)
    return {
             companyInfo: companyInfo
            }
  }
  state = {
    multiple: false,
  }

  componentDidMount () {
    this.props.form.validateFields();
    this.setState({
      ...this.props.companyInfo
    })
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  async sendData(value) {
    const res = await updateBaseInformation(value);
    if (res.code != 0) {
      Toast.fail(res.msg);
    }
  }
  saveCompanyInfo = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        console.log(value)
        value = {
          ...this.props.companyInfo,
          ...value
        }
        sessionStorage.setItem('companyInfo', JSON.stringify(value));
        Router.push('/companyInformation')
      } else {
        alert('Validation failed');
      }
    });
  }
  handleChange = (res) => {
    this.setState({
      businessLicense:res.data
    })
    this.props.form.setFieldsValue({
      businessLicense:res.data
    })
  }
  handleChange2 = (res) => {
    this.setState({
      logo:res.data
    })
    this.props.form.setFieldsValue({
      logo:res.data
    })
  }
  render () {
    const { companyName, businessLicense, logo } = this.props.companyInfo;
    const { files, files2 } = this.state;
    const { getFieldProps, getFieldsError, getFieldDecorator } = this.props.form;
    const Img =(
      <img className="img" src={this.state.businessLicense} alt="" height={150} width={280}/>
    )
    const Img2 =(
      <img className="img" src={this.state.logo} alt="" height={150} width={280}/>
    )
    const uploadButton = (
      <div>
        {/* <Icon type={this.state.loading ? 'loading' : 'plus'} /> */}
        <div className="ant-upload-text"><i className="iconfont icon-add2" style={{fontSize:'40px',fontWeight:700,color:'#aeaeae'}}></i></div>
      </div>
    );
    return (
      <Layout title="公司信息">
        <WhiteSpace />
        <InputItem
            {...getFieldProps('companyName',{
              initialValue:companyName,
              rules:[
              {
                required: true,
              }
            ]
          })}
            placeholder="请与营业执照保持一致"
          >
            <div className="itemTitle">公司名称</div>
          </InputItem>
          {
            getFieldDecorator('businessLicense',{
              initialValue:businessLicense,
              rules:[
                {
                  required: true,
                }
            ]
          })(
            <Upload
              action="http://localhost:3000/app/uploadImage"
              onSuccess={this.handleChange}
               >
               <IDCard>
                 {this.state.businessLicense
                   ?Img
                  : uploadButton
                }
               </IDCard>
             </Upload>
            )
          }
        <P>上传营业执照</P>
        <Upload
          action="http://localhost:3000/app/uploadImage"
          onSuccess={this.handleChange2}
           >
           <IDCard
             {...getFieldProps('logo',{
               initialValue:logo,
               rules:[
                 // {
                 //   required: true,
                 // }
             ]
           })}
             >

             {this.state.logo
               ?Img2
              : uploadButton
            }
           </IDCard>
         </Upload>

        <P>上传公司标志</P>

        <WingBlank style={{padding:'0 17px'}}>
          <Button type="primary" style={{fontSize:'14px',marginTop:'50px'}} disabled={this.hasErrors(getFieldsError())} onClick={this.saveCompanyInfo}>{this.props.companyInfo?"下一步":"保存"}</Button>
        </WingBlank>
        <style jsx global>{`
        .am-list-item .am-input-label {
          font-size: 14px !important;
        }
        .am-list-item .am-input-control input {
          font-size: 14px !important;
          color: #888 !important;
          text-align: right;
        }
        .am-image-picker-list{
          background:#fff;
        }
        `}
        </style>
      </Layout>
    )
  }
}

const CompanyBaseInfoWapper = Form.create()(CompanyBaseInfo);
export default CompanyBaseInfoWapper;
