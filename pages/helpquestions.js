import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Icon from 'material-ui/Icon';
import Layout from '../layout/contentLayout';
import fetch from '../lib/fetch'
import getCookie from '../lib/getCookie'

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  padding-top: 20px;
  list-style-type: none;
`
const Li = styled.li`
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  line-height: 50px;
  height: 50px;
  padding:0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
class HelpInformation extends React.PureComponent {
  static async getInitialProps () {
    const res = await fetch(`/getHelpList`)
    return { data: res }
  }
  render() {
    const contents = this.props.data[0].contents;
    console.log(contents)
    const listItems = contents.map((item) =>
     <Link href={{ pathname: '/helpdetail', query: { content: item.content } }}>
      <Li key={item.channelId}>
        <span>{item.contentTitle}</span>
        <Icon>chevron_right</Icon>
      </Li>
    </Link>

    );
    return (
      <Layout title="帮助中心">
          <Ul>
            {listItems}
          </Ul>
      </Layout>
    )
  }
}

export default HelpInformation;
