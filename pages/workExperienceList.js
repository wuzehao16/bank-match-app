import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Card, List, InputItem, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { Form } from 'antd';

const FormItem = Form.Item;
const Item = List.Item;

class WorkExperienceList extends React.PureComponent {
  add = () => {
  }

  edit = () => {
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Layout  title="工作经历">
        <List>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Link href='/workExperience'>
            <Card>
              <Card.Header
                title="2018.01-2018.05"
                extra={<div onClick={this.edit} style={{color:'#ee5648',fontSize:'14px'}}><i className="iconfont icon-edit" style={{marginRight:'5px'}}></i>编辑</div>}
              />
              <Card.Body>
                <div className="company">众银云测有限公司</div>
                <div className="job">销售主管</div>
              </Card.Body>
            </Card>
          </Link>
          <WhiteSpace size="lg" />
        </WingBlank>
        </List>
        <WhiteSpace/>
        
        <WingBlank>
          <Button type="primary" style={{marginTop:'100px',fontSize:'14px'}} onClick={this.add}>新增工作经历</Button><WhiteSpace />
        </WingBlank>
        <style jsx global>{`
          .am-list-item .am-input-label {
            color: #ee5648 !important;
            font-size: 14px !important;
          }   
          .am-list-item .am-input-control input {
            font-size: 14px !important;
          }
          .company {
            margin: 0 0 10px 0;
          }
          .job {
            color: #999;
          }
          .am-card-header {
            font-size: 14px !important;
          }
        `}
        </style>
      </Layout>
    )
  }
}

const WorkExperienceListWapper = Form.create()(WorkExperienceList);
export default WorkExperienceListWapper;
