import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Card, List, WhiteSpace} from 'antd-mobile';
import { Form } from 'antd';

const FormItem = Form.Item;
const Item = List.Item;


class jobList extends React.PureComponent {
  add = () => {
  }

  edit = () => {
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Layout>
        <List>
        <WhiteSpace size="lg" />
          <Card full style={{position:'relative'}}>
            <Card.Header
              title="客户经理"
              extra={<span>8-16k</span>}
            />
            <Card.Header
              title="深圳南山区|3-5年|本科"
              extra={<span>2018年05月23日 15:23</span>}
            />
            <Card.Header
              title="深圳众银云测有限责任公司"
              thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
            />
            <div className="companyInfo">5000人以上/金融机构</div>
          </Card>
        </List>
        <WhiteSpace/>
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
          .companyInfo {
            position: absolute;
            bottom: 15px;
            left: 85px;
          }
        `}
        </style>
      </Layout>
    )
  }
}

const jobListWapper = Form.create()(jobList);
export default jobListWapper;
