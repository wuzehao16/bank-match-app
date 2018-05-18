import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';

class ProductDetail extends React.PureComponent {
  static async getInitialProps ({query}) {
    return {info:query}
  }
  render() {
    return (
      <Layout>
        <h2>char with user:{this.props.info.userName}</h2>

      </Layout>
    )
  }
}

export default ProductDetail;
