import React from 'react';
import Layout from '../layout/RecruitLayout';
import styled from 'styled-components'
import { InputItem, List, Button, WingBlank, WhiteSpace, ImagePicker } from 'antd-mobile';
import { Form } from 'antd';
import fetch from '../lib/fetch';
import getCookie from '../lib/getCookie';
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
  state = {
    files: [],
    files2: [],
    multiple: false,
  }

  componentDidMount () {
    this.props.form.validateFields();
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
        this.sendData(value);
      } else {
        alert('Validation failed');
      }
    });
  }
  handleChange = (res) => {
    console.log(res)
    this.setState({
      businessLicense:res.data
    })
    this.props.form.setFieldsValue({
      businessLicense:res.data
    })
  }
  handleChange2 = (res) => {
    console.log(res)
    this.setState({
      logo:res.data
    })
  }
  render () {
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
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Layout title="公司信息">
        <WhiteSpace />
        <InputItem
            {...getFieldProps('companyName',{rules:[
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
              // initialValue:"1234",
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
               // initialValue:"1234",
               rules:[
                 // {
                 //   required: true,
                 // }
             ]
           })}
             >

             {this.state.businessLicense
               ?Img2
              : uploadButton
            }
           </IDCard>
         </Upload>

        <P>上传公司标志</P>

        <WingBlank style={{padding:'0 17px'}}>
          <Button type="primary" style={{fontSize:'14px',marginTop:'50px'}} disabled={this.hasErrors(getFieldsError())} onClick={this.saveCompanyInfo}>保存-下一步</Button>
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
