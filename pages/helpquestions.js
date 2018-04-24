import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/contentLayout';
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'

const iconStyles = {
  color: 'red',
  fontSize:'13px',
  position: 'absolute',
  right: '15px',
  lineHeight: '45px'
}
const ulStyles = {
  listStyle: 'none',
  backgroundColor: '#fff',
  width:'100%',
  marginTop:'15px',
  padding:'0 15px'
}

class ListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
      <Link href='/helpdetail'>
              <li>
                {this.props.contentTitle}
                <i class="material-icons" style={iconStyles}>chevron right</i>
              </li>
      </Link>
    )
  }
}

class HelpInformation extends React.PureComponent {
  static async getInitialProps ({req}) {
    const token = getCookie('token', req)
    const res = await fetch(`/getHelpList`, token)
    console.log(res);
    return { contents: res }
  }
  componentDidMount(){

  }
  render() {
    const contents = this.props.contents;
    return (
      <Layout title="帮助中心">
        <Wrapper>
          <ListItem contents={contents}/>
        </Wrapper>
        {/* <style jsx>{`
          span{
            margin-left:4px;
          }
          i{
            height:10px;
            width:10px;
            display:inline-block;
            background-size:100% 100%;
          }
          .source{
            width:12px;
            background-image:url(/static/source.png);
          }
          .read{
            width:12px;
            background-image:url(/static/read.png);
          }
          .time{
            background-image:url(/static/time.png);
          }
        `}
        </style> */}
      </Layout>
    )
  }
}

export default HelpInformation;