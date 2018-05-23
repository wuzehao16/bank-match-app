import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Card, List, InputItem, WhiteSpace, WingBlank } from 'antd-mobile';
import { Form } from 'antd';

const FormItem = Form.Item;
const Item = List.Item;

const Button = styled.button`
  font-size: 14px;
  color: #fff;
  background: #ee5648;
  border-radius: 3px;
  height: 40px;
  width: 100%;
  margin: 50px 0 0 0;
  border: none;
`

const Span = styled.span`
  font-size: 14px;
  color: #666;
  padding-left: 10px;
`

class Educations extends React.PureComponent {
  add = () => {
    // dispatch
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Layout  title="教育经历">
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Link href='/educationExperience'>
            <Card>
              <Card.Header
                title="2018.01-2018.05"
                extra={<Link href='/educationExperience' style={{color:'#ee5648',fontSize:'14px'}}><i className="iconfont icon-edit" style={{marginRight:'5px'}}></i>编辑</Link>}
              />
              <Card.Body>
                <div className="school">西南民族大学</div>
                <div className="major">信息管理与信息系统</div>
              </Card.Body>
            </Card>
          </Link>
          <WhiteSpace size="lg" />
        </WingBlank>
        <WhiteSpace/>
        
        <WingBlank>
          <Button onClick={this.add}>新增教育经历</Button>
          <WhiteSpace />
        </WingBlank>
        <style jsx global>{`
          .am-list-item .am-input-label {
            color: #ee5648 !important;
            font-size: 14px !important;
          }   
          .am-list-item .am-input-control input {
            font-size: 14px !important;
          }
          .school {
            margin: 0 0 10px 0;
          }
          .major {
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

const EducationsWapper = Form.create()(Educations);
export default EducationsWapper;
