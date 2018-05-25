import React from 'react';
import Layout from '../layout/RecruitLayout';
import styled from 'styled-components'
import { InputItem, List, Button, WingBlank, WhiteSpace, ImagePicker } from 'antd-mobile';
import { Form } from 'antd';
import fetch from '../lib/fetch';
import getCookie from '../lib/getCookie';
const FormItem = Form.Item;

const P = styled.p`
  font-size: 14px;
  color: #333;
  text-align: center;
  margin: 15px 0;
`

class CompanyInfo extends React.PureComponent {
  state = {
    files: [{
      url: '',
      id:''
    }],
    multiple: false,
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  render () {
    const { files } = this.state;
    const { getFieldProps, getFieldsError } = this.props.form;
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
        <ImagePicker
          // files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          // selectable={true}
          // multiple={false}
        />
        <P>上传营业执照</P>
        <ImagePicker
          // files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          // selectable={true}
          // multiple={false}
        />
        <P>上传公司logo</P>
        <style jsx global>{`
        .am-list-item .am-input-label {
          font-size: 14px !important;
        }
        .am-list-item .am-input-control input {
          font-size: 14px !important;
          color: #888 !important;
          text-align: right;
        }
        `}
        </style>
      </Layout>
    )
  }
}

const CompanyInfoWapper = Form.create()(CompanyInfo);
export default CompanyInfoWapper;