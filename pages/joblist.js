import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/RecruitLayout';
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
        <Link href='/jobDetail'>
          <Card full>
            <Card.Header
              className="jobdesc"
              title="客户经理"
              extra={<span className="salary">8-16k</span>}
            />
            <Card.Header
             className="jobInfo"
              title="深圳南山区|3-5年|本科"
              extra={<span className="publishedTime">2018年05月23日 15:23</span>}
            />
            <Card.Header
              title={<div><p className="companyName">众银云测有限公司</p><p className="companyInfo">5000人以上/金融机构</p></div>}
              // title="深圳众银云测有限责任公司"
              thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
              thumbStyle={{width:'64px',height:'64px'}}
            />
          </Card>
        </Link>
        <WhiteSpace size="lg" />
        {/* <Link href='/jobDetail'>
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
        </Link>   */}
        {/* <WhiteSpace/> */}
        <style jsx global>{`
          .am-list-item .am-input-label {
            color: #ee5648 !important;
            font-size: 14px !important;
          }   
          .am-list-item .am-input-control input {
            font-size: 14px !important;
          }
          .am-card {
            padding: 15px 0;
          }
          .am-card-header {
            padding: 0px 15px !important;
            margin: 0 0 5px 0;
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
          .jobdesc {
            font-weight: 700;
          }
          .jobInfo .am-card-header-content{
            font-size: 13px;
            color: #999;
          }
          .salary {
            color: #ee5648;
            font-size: 13px;
          }
          .publishedTime {
            color: #999;
            font-size: 13px;
          }
          .companyName {
            color: #404040;
            font-size: 14px;
          }
          .companyInfo {
            color: #999;
            font-size: 13px;
          }
        `}
        </style>
      </Layout>
    )
  }
}

const jobListWapper = Form.create()(jobList);
export default jobListWapper;
