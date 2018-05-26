import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import ControlPoint from '@material-ui/icons/ControlPoint';
import Avatar from '@material-ui/core/Avatar';
import fetch from '../lib/fetch';
import getCookie from '../lib/getCookie'
const Head = styled.div`
  height:111px;
  background-color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  height: 57px;
  font-size: 15px;
  color: #333;
  line-height: 57px;
`
const AddContainer = styled.div`
  height: 80px;
  width: 100%;
  background-color: #fff2f1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ee5648;
`
const Add = styled.div`
  height: 14px;
  width: 130px;
  color:#ee5648;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  padding: 0 15px;
  padding-bottom: 50px;
`
const Card = styled.div`
  position: relative;
  background-color: #fff;
  padding: 15px;
  color: #6d6d6d;
  border: solid 1px #d5d5d5;
`
const Edit = styled.div`
  position: absolute;
  top: 5px;
  right: 12px;
  font-size: 13px;
  line-height: 30px;
  color: #ee5749;
`
class Resume extends React.PureComponent {
  static async getInitialProps ({req}) {
    // eslint-disable-next-line no-undef
    // const token = getCookie('token', req)
    const userInfo = await fetch(`/getUserInfo`)
    return {
      resume:{
        a1:{},
        a2:{},
        a3:{},
        a4:{}
      },
      userInfo: userInfo
     }
  }
  render() {
    const { userInfo, resume } = this.props
    console.log('resume',resume)
    return (
      <Layout>
        <Head>
            <Avatar
            alt="Adelle Charles"
            src={userInfo.userHead}
            style={{height:60,width:60}}
          />
        </Head>
        <Wrapper>
          <Title>基本信息</Title>
          {
            resume.a1
              ? <Card>
                <Link href="/baseinformation?type=1">
                  <Edit>
                    <i className="iconfont icon-school"/>
                    <span>编辑</span>
                  </Edit>
                </Link>
                  <ul className="ul">
                    <li>姓名：幅度萨芬</li>
                    <li>性别：幅度萨芬</li>
                    <li>出生年月：幅度萨芬</li>
                    <li>最高学历：幅度萨芬</li>
                    <li>工作年限：幅度萨芬</li>
                    <li>电话号码：幅度萨芬</li>
                    <li>邮箱：幅度萨芬</li>
                    <li>所在城市：幅度萨芬</li>
                    <li>在职状态：幅度萨芬</li>
                  </ul>
                </Card>
              : <Link prefetch="prefetch" href="/baseinformation">
                  <AddContainer>
                    <Add ><ControlPoint/>
                      <span>添加基本信息</span>
                    </Add>
                  </AddContainer>
                </Link>
          }
          <Title>工作经历</Title>
          <Link prefetch href="/workExperienceList">
            <AddContainer>
              <Add ><ControlPoint/><span>添加工作经历</span></Add>
            </AddContainer>
          </Link>
          <Title>教育经历</Title>
          <Link prefetch href="/educations">
            <AddContainer>
              <Add ><ControlPoint/><span>添加教育经历</span></Add>
            </AddContainer>
          </Link>
          <Title>期望工作</Title>
          {
            resume.a4
            ? <Card>
              <Link href="/expectedwork?type=1">
                <Edit>
                  <i className="iconfont icon-school"/>
                  <span>编辑</span>
                </Edit>
              </Link>
                <ul className="ul">
                  <li>期望岗位：幅度萨芬</li>
                  <li>期望商区：幅度萨芬</li>
                  <li>期望月薪：幅度萨芬</li>
                </ul>
              </Card>
              : <Link prefetch="prefetch" href="/expectedwork">
                  <AddContainer>
                    <Add ><ControlPoint/>
                      <span>添加期望工作</span>
                    </Add>
                  </AddContainer>
                </Link>
          }

        </Wrapper>
        <style jsx>{`
          .ul{
            margin:0;
            padding:0;
            list-style:none;
            font-size: 13px;
            line-height: 30px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Resume;
