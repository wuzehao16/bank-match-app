import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import fetch from '../lib/fetch';




const Wrapper = styled.div`
  height: 80px;
  background: url(/static/topbar.jpg);
  background-size: 100% 100%;
`
class Topbar extends React.Component {
  // static async getInitialProps({query}) {
	// 	return {
	// 		item: await fetch(`/item/${query.id}`)
	// 	}
	// }
	componentDidMount () {

  }


  render () {
    return (
        <Layout>
          <Wrapper >
            <div className={this.props.position + ' product'}>
              匹配产品数<span className="num">12</span>个
            </div>
          </Wrapper>

          <style jsx >{`
            .product{
              position:absolute;
              // left:12px;
              top:34px;
              width: 65px;
              height: 18px;
              line-height: 18px;
              background-image: linear-gradient(0deg,
                #ffd4d0 0%,
                #ffffff 100%),
              linear-gradient(
                #ffffff,
                #ffffff);
              background-blend-mode: normal,
                normal;
              box-shadow: 0px 3px 6px 0px
                rgba(238, 86, 72, 0.5);
              border-radius: 8px;
              font-size:8px;
              text-align: center;
              color:#969696;
            }
            .hidden{
              display:none;
            }
            .p1{
              left:22%;
            }
            .p2{
              left:42%;
            }
            .p3{
              left:62%;
            }
            .num{
              color:#ee5648;
            }
          `}
          </style>
        </Layout>
    )
  }
}



export default Topbar;
