import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';
import ControlPoint from '@material-ui/icons/ControlPoint';
const Head = styled.div`
  height:111px;
  background-color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Avatar = styled.div`
  background: red;
  height: 60px;
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
  width: 115px;
  color:#ee5648;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  padding: 0 15px;
  padding-bottom: 50px;
`
class Resume extends React.PureComponent {
  static async getInitialProps ({query,req}) {
    // eslint-disable-next-line no-undef
    const token = getCookie('token', req)
    const education = await fetch(`/selectByType?type=education`, token)
    console.log(education)
    return { product: education }
  }
  render() {
    return (
      <Layout>
        <Head>
          <Avatar></Avatar>
        </Head>
        <Wrapper>
          <Title>基本信息</Title>
          <Link prefetch href="/baseinformation">
            <AddContainer>
              <Add ><ControlPoint/><span>添加基本信息</span></Add>
            </AddContainer>
          </Link>
          <Title>工作经历</Title>
          <Link prefetch href="/workExperienceList">
            <AddContainer>
              <Add ><ControlPoint/><span>添加工作经历</span></Add>
            </AddContainer>
          </Link>
          <Title>教育经历</Title>
          <Link prefetch href="/educationExperienceList">
            <AddContainer>
              <Add ><ControlPoint/><span>添加教育经历</span></Add>
            </AddContainer>
          </Link>
          <Title>期望工作</Title>
          <Link prefetch href="/expectedwork">
            <AddContainer>
              <Add ><ControlPoint/><span>添加期望工作</span></Add>
            </AddContainer>
          </Link>
        </Wrapper>
      </Layout>
    )
  }
}

export default Resume;
