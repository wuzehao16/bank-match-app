import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import NProgress from 'nprogress'
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Router from 'next/router'
import { loadingStart,loadingEnd } from '../redux/actions'
import { configureStore } from '../redux/store'
import {withReduxSaga} from '../redux/store'
import withRoot from '../src/withRoot';
// Router.onRouteChangeStart = (url) => {
//   console.log(`Loading: ${url}`)
//   // NProgress.start()
//   debugger;
//   console.log(configureStore)
//   configureStore.dispatch(loadingStart())
// }
// Router.onRouteChangeComplete = () => {
//   // this.props.dispatch(loadingStart())
// }
// Router.onRouteChangeError = () => NProgress.done()

const linkStyle = {
  margin: '0 10px 0 0'
}

class NProgress extends React.Component {
  static async getInitialProps({store}) {
    console.log(store.getState())
    return {
      data: store.getState()
    }
  }
  state = {
     loading: false,
     query: 'idle',
   };
   componentWillMount(){
     Router.onRouteChangeStart = (url) => {
       console.log(`Loading1: ${url}`)
       this.setState({
         loading:true
       })
     }
     Router.onRouteChangeComplete = () => {
       this.setState({
         loading:false
       })
     }
   }
   componentWillUnmount (){

   }
  render () {
    const { loading } = this.state;
    return (
      <div className="mask"
        style={{
          display:loading?'block':'none',
        // transitionDelay: loading ? '800ms' : '0ms',
      }}>
        <div
          className="loading"
          >
          {/* <Head> */}
            {/* Import CSS for nprogress */}
            {/* <link rel='stylesheet' type='text/css' href='/static/nprogress.css' /> */}
            <Fade
            in={loading}
            unmountOnExit
            style={{marginTop:20}}
          >
            <CircularProgress />
          </Fade>
                    <div className="loading_name">loading...</div>
          {/* </Head> */}
        </div>
        <style jsx >{`
          .mask{
            position:absolute;
            top:0;
            left:0;
            z-index:100;
            width:100%;
            height:100%;
          }
          .loading{
            position:fixed;
            margin:auto;
            left:0;
            right:0;
            top:0;
            bottom:0;
            width:90px;
            height:100px;
            border-radius:6px;
            text-align:center;
            background: #000;
            opacity:0.7;
            color:#fff;
          }
          .loading_name{
            margin-top:10px;
            font-size:12px;
          }
        `}
        </style>
      </div>
    )
  }
}
export default withRoot(NProgress);
