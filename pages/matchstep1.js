import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Radio, Form } from 'antd';
import Layout from '../components/layout';
import Topbar from '../components/Topbar';
import fetch from '../lib/fetch'
import { createMuiTheme, withStyles, MuiThemeProvider } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import {withReduxSaga} from '../redux/store'
import { saveStep1 } from '../redux/actions'
const FormItem = Form.Item;

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
  padding-top: 1px;
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
    this.props.form.validateFields();
  }
  state = {
    name: '',
    disabled: 'true',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(saveStep1(values))
        Router.push({
          pathname: '/matchstep2',
        })
      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render () {
    const { classes } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name');
    const loanTypeError = isFieldTouched('loanType') && getFieldError('loanType');
    const exLoanAmountError = isFieldTouched('exLoanAmount') && getFieldError('exLoanAmount');
    const cityError = isFieldTouched('city') && getFieldError('city');
    return (
      <MuiThemeProvider theme={theme}>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout>
        <Topbar position="hidden"/>
        <Wrapper>

          <Container>
            <div className={classes.lable}>姓名</div>
            <FormItem
              validateStatus={nameError ? 'error' : ''}
              help={nameError || ''}
              >
              {getFieldDecorator('name', {
                rules: [{
                   required: true,
                   message: '请输入姓名',
                }],
              })(
                <TextField
                  id="name"
                  // label="客户名称"
                  className={classes.textField}
                  // value={this.state.name}
                  // onChange={this.handleChange('name')}
                  // margin="normal"
                  placeholder="请输入姓名"
                />
              )}
            </FormItem>

          </Container>
          <Container>
            <div className={classes.lable}>期望贷款金额</div>
            <FormItem
              validateStatus={exLoanAmountError ? 'error' : ''}
              help={exLoanAmountError || ''}
              >
              {getFieldDecorator('exLoanAmount', {
                rules: [{ required: true,
                     message: '请输入期望贷款金额',
                }],
              })(
                <TextField
                  id="name"
                  // label="客户名称"
                  className={classes.textField}
                  // value={this.state.name}
                  // onChange={this.handleChange('name')}
                  // margin="normal"
                  placeholder="请输入金额"
                />
              )}
            </FormItem>
          </Container>
          <Contain>
            <p>贷款类型</p>
            <FormItem
              validateStatus={loanTypeError ? 'error' : ''}
              help={loanTypeError || ''}
              >
              {getFieldDecorator('loanType', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value="0">信用贷款</RadioButton>
                  <RadioButton value="1">抵押贷款</RadioButton>
                </RadioGroup>
              )}
            </FormItem>

          </Contain>
          <Contain>
            <p>地区</p>
            <FormItem
              validateStatus={cityError ? 'error' : ''}
              help={cityError || ''}
              >
              {getFieldDecorator('city', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value="0">深圳</RadioButton>
                  <RadioButton value="1">广州</RadioButton>
                  <RadioButton value="2">东莞</RadioButton>
                  <RadioButton value="3">珠海</RadioButton>
                  <RadioButton value="4">惠州</RadioButton>
                  <RadioButton value="5">中山</RadioButton>
                </RadioGroup>
              )}
            </FormItem>

          </Contain>
        </Wrapper>
        <div className='btn'>
          <FormItem>
              <Button variant="raised" color="primary" type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>下一步</Button>
          </FormItem>
        </div>
      </Layout>
      </Form>
      <style jsx>{`
        .btn{
          margin-top: 75px;
          text-align: center;
          color: #fff,
        }
      `}
      </style>
      </MuiThemeProvider>
    )
  }
}

MatchStep1.propTypes = {
  classes: PropTypes.object.isRequired,
};
const WrappedMatchStep1 = Form.create()(MatchStep1);

export default withReduxSaga(withStyles(styles)(WrappedMatchStep1));
