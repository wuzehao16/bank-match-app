import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';
import '../styles/recruit-iconfont.css';

class EducationExperience extends React.PureComponent {
  render() {
    return (
      <Layout  title="教育经历">
        <i className="icon-school">学校</i>
        <i className="icon-school">专业</i>
        <i className="icon-time">毕业年份</i>
        <i className="icon-school1">学历</i>
      </Layout>
    )
  }
}

export default EducationExperience;
