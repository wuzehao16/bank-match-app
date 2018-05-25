import React from 'react';
import Layout from '../layout/RecruitLayout';
import { List, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { Form } from 'antd';
import fetch from '../lib/fetch';
import getCookie from '../lib/getCookie';

class JobDescribe extends React.PureComponent {
  componentDidMount () {
    this.props.form.validateFields();
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  saveDescribe = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        value = formatData(value)
        this.sendData(value);
      } else {
        alert('Validation failed');
      }
    });
  }

  render () {
    const { getFieldProps, getFieldsError } = this.props.form;
    return (
      <Layout title="职位描述">
        <List renderHeader={() => '职位描述'}>
          <TextareaItem
            {...getFieldProps('jobDesribe',{
              rules:[
                {
                  required: true
                }
              ]
            })}
            rows={8}
            count={500}
            placeholder='请输入该职位描述…'
            style={{background:'#f2f2f2',padding:'3px 3px'}}
          />
        </List>
        <WhiteSpace size="xl" style={{background:'#fff'}}/>
        {/* <WhiteSpace/> */}
        <WingBlank style={{padding:'0 17px'}}>
          <Button type="primary" style={{fontSize:'14px',marginTop:'50px'}} disabled={this.hasErrors(getFieldsError())} onClick={this.saveDescribe}>保存</Button>
        </WingBlank>
        <style jsx global>{`
          .am-list-header {
            background: #fff;
          }
          .am-list-body::before {
            height: 0px !important;
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

const JobDescribeWapper = Form.create()(JobDescribe);
export default JobDescribeWapper;