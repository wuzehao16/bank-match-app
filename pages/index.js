import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/layout'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`
const SomeContext = React.createContext()

class Thing extends React.Component {
  state = {
    context: {
      val: "default",
      changeVal: this.changeVal
    }
  };
  changeVal = newVal =>{
    this.setState({
      context: {
        val: newVal,
        changeVal: this.changeVal
      }
    })
  };
  async componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/static/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful");
        })
        .catch(err => {
          console.warn("service worker registration failed");
        });
    }
  }
  render() {
    return (
      <SomeContext.Provider value={this.state.context}>
        {this.props.children}
      </SomeContext.Provider>
    )
  }
}
export default Thing
