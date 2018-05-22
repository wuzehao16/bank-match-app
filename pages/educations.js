import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout'
class Educations extends React.PureComponent {
  render() {
    return (
      <Layout title="教育经历">
        <i className="iconfont icon-school">学校</i>
        <i className="iconfont icon-school">专业</i>
        <i className="iconfont icon-time">毕业年份</i>
        <i className="iconfont icon-school1">学历</i>
        <style jsx>{`
        `}
        </style>
      </Layout>
    )
  }
}

export default Educations;
