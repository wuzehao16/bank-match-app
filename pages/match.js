import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Radio } from 'antd';
import Layout from '../components/layout'
import fetch from '../lib/fetch'
import { createMuiTheme, withStyles, MuiThemeProvider } from 'material-ui/styles';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red,
  },
  status: {
    danger: 'orange',
  },
});
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  label:{
    verticalAlign: 'bottom',
  },
  btn:{
    marginTop:'75px',
    textAlign:'center',
    color: '#fff',
  }
});
const Wrapper = styled.div`
  padding: 0 15px;
  background: #fff;
`
const Container = styled.div`
  padding: 19px 0;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
`
const Contain = styled.div`
  background-color: #fff;
  padding-top: 16px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 20px;
`
// const Button = styled.a`
//   /* This renders the buttons above... Edit me! */
//   display: inline-block;
//   border-radius: 5px;
//   padding: 0.5rem 0;
//   margin: 0.5rem 1rem;
//   width: 11rem;
//   background: transparent;
//   color: white;
//   border: 2px solid white;
// `
class MatchStep1 extends React.Component {
  // static async getInitialProps({query}) {
	// 	return {
	// 		item: await fetch(`/item/${query.id}`)
	// 	}
	// }
	componentDidMount () {

  }
  state = {
    name: '',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render () {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <Layout>
        <Wrapper>
        <Container>
          <div className={classes.lable}>姓名</div>
          <TextField
            id="name"
            // label="客户名称"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            // margin="normal"
            placeholder="请输入姓名"
          />
        </Container>
        <Container>
          <div className={classes.lable}>期望贷款金额</div>
          <TextField
            id="name"
            // label="客户名称"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            // margin="normal"
            placeholder="请输入金额"
          />
        </Container>
        <Contain>
          <p>贷款类型</p>
          <RadioGroup defaultValue="a" size="small">
            <RadioButton value="a">信用贷款</RadioButton>
            <RadioButton value="b">抵押贷款</RadioButton>
          </RadioGroup>
        </Contain>
        <Contain>
          <p>地区</p>
          <RadioGroup defaultValue="a" size="small">
            <RadioButton value="a">深圳</RadioButton>
            <RadioButton value="b">广州</RadioButton>
            <RadioButton value="c">东莞</RadioButton>
            <RadioButton value="d">珠海</RadioButton>
            <RadioButton value="e">惠州</RadioButton>
            <RadioButton value="f">中山</RadioButton>
          </RadioGroup>
        </Contain>
        </Wrapper>
        <div className={classes.btn}>
          <Button variant="raised" color="primary" >下一步</Button>
        </div>
      </Layout>
      </MuiThemeProvider>
    )
  }
}

MatchStep1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchStep1);
