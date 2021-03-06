import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Icon from '@material-ui/core/Icon';
import Layout from '../layout/contentLayout';
import fetch from '../lib/fetch'
import { getCookie } from '../lib/util'

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  padding-top: 20px;
  list-style-type: none;
`
const Li = styled.li`
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  color: #646464;
  line-height: 50px;
  height: 50px;
  padding:0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
class HelpInformation extends React.PureComponent {
  static async getInitialProps ({ query }) {
    const helpType = query.helpType
    let res;
    if (helpType) {
      res = await fetch(`/getHelpList?helpType=${helpType}`)
    } else {
      res = await fetch(`/getHelpList`)
    }
    return { data: res }
  }
  render() {
    const contents = this.props.data[0].contents;
    console.log(contents)
    const listItems = contents.map((item) =>
     <Link href={{ pathname: '/helpdetail', query: { content: item.content } }} key={item.contentId}>
      <Li >
        <span>{item.contentTitle}</span>
        <Icon>chevron_right</Icon>
      </Li>
    </Link>

    );
    return (
      <Layout title="常见问题">
          <Ul>
            {listItems}
          </Ul>
      </Layout>
    )
  }
}

export default HelpInformation;
