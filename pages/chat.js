import React from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';

const socket = io('ws://localhost:3000')

class ProductDetail extends React.PureComponent {
  static async getInitialProps ({query}) {
    return {info:query}
  }
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg:[]
    }
  }
  componentDidMount () {
    socket.on('message', data => {
      console.log(data,"接受的消息")
      this.setState({
        msg:[...this.state.msg, data.text]
      })
    })
  }

  send = e => {
    e.preventDefault();
    console.log('emit')
    socket.emit('sendmsg',{
      text: this.state.text
    })
    this.setState({
      text: ''
    })
  }
  handleChange = e => {
    this.setState({
      text: e.target.value
    })
  }
  render() {
    return (
      <Layout>
        {
          this.state.msg.map((v,index) => {
            return <p key={index}>{v}</p>
          })
        }
        <form onSubmit={this.send}>
          <h2>char with user:{this.props.info.userName}</h2>
          <input type="text" value={this.state.text} onChange={this.handleChange}/>
          <button disabled={!this.state.text} type="submit">send</button>
        </form>
      </Layout>
    )
  }
}

export default ProductDetail;
