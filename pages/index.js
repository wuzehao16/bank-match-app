import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/layout'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default () => (
  <Layout>
    <Title>My page</Title>
  </Layout>
)
