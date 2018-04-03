import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/layout';

const Wrapper = styled.div`
  padding: 15px;
  background: #fff;
`
const Title = styled.div`
  font-size: 16px;
  color: #3c3c3c;
  line-height: 30px;
  font-weight: 600;
`
class Financialnformation extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Wrapper>
          <Title>金融科技：互联网+金融，2017金融发展高峰论坛成功举行！</Title>
        </Wrapper>
      </Layout>
    )
  }
}

export default Financialnformation;
