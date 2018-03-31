import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/layout';

const Pd = styled.div`
  padding: 0 15px;
  background: #fff;
  margin-bottom: 5px;
`
const Label= styled.span`
  color: #969696;
  background: #f2f2f2;
  font-size: 8px;
  border: 1px solid #e5e5e5;
  padding: 2px 4px;
  margin: 7px 12px 7px 0;
  display: inline-block;
`
const Title =styled.div`
  height: 28px;
  width: 60px;
  line-height: 28px;
  color: #646464;
  font-size: 12px;
  border-bottom: 1px solid #ee5648;
`
class ProductDetail extends React.PureComponent {
  constructor() {
    super()
  }
  render() {

    return (

      <Layout>
        <Pd>
          <div className="head">
            <div className="title-container">
              <div className="title">经营贷-寿险贷</div>
              <div className="sub-title">平人寿保单即可申请</div>
            </div>
            <div>
              <div className="logo"></div>
            </div>
          </div>
          <div className="tip">
            {
              ["流程简单","流程简单","流程简单"].map(v => {
                return (
                  <Label>{v}</Label>
                )
              })
            }
          </div>
        </Pd>
        <Pd>
          <div className="info">

          </div>
        </Pd>
        <Pd>
          <div>
            <Title>产品介绍</Title>
          </div>
        </Pd>
        <style jsx>{`
          .head{
            padding: 30px 0;
            display:flex;
            border-bottom:1px solid #f2f2f2;
          }
          .title-container{
            padding-left:45px;
          }
          .title{
            color:#3c3c3c;
            font-size:15px;
          }
          .sub-title{
            font-size:10px;
            color:#646464;
          }
          .logo{
            width:100px;
            height:35px;
            margin-left:80px;
            background: #000;
          }
          .info{
            height:170px;
          }
        `}
        </style>
      </Layout>

    )
  }
}

export default ProductDetail;
