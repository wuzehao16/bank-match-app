import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Layout from '../layout/Blanklayout';
import withRoot from '../src/withRoot'

const styles = theme => ({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
});

const Wrapper = styled.div`
  background:#fff;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`
class Download extends React.PureComponent {
  render() {
    const {classes} = this.props;
    return (
      <Layout>
        <Wrapper>
          <img src="/static/logo.png" style={{width:100,height:100,display:'block',margin:'60px auto 15px'}}/>
          <h1 style={{color:'#646464',fontSize:'13px',textAlign:'center'}}>众银云测</h1>
          <h2 style={{color:'#646464',fontSize:'9px',textAlign:'center',marginTop:5}}>V1.0.0</h2>
          <a style={{  textDecoration: 'none',display:'block',width:'100px',margin:'150px auto'}} href="itms-services://?action=download-manifest&amp;url=https://back.ibankmatch.com/manifest.plist">
          <Button className={classes.button}>下载</Button>
          </a>
        </Wrapper>
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(Download));
