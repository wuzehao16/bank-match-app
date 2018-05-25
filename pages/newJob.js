import React from 'react'
import Link from 'next/link'
import Layout from '../layout/RecruitLayout'
import { WhiteSpace, WingBlank, Button } from 'antd-mobile'
import { Form } from 'antd';

class NewJob extends React.PureComponent {

  // publishJob = () => {

  // }

  render() {
    return (
      <Layout  title="发布职位">
        <WhiteSpace/>
        <WingBlank style={{padding:'0 17px'}}>
          <Link href="/publishJob">
          <Button type="primary" style={{fontSize:'14px',marginTop:'50px'}}><i className="iconfont icon-zhifeiji"></i>去发布新职位</Button>
          </Link>
        </WingBlank>
        <WhiteSpace/>
      </Layout>
    )
  }
}    

const NewJobWapper = Form.create()(NewJob);
export default NewJobWapper;