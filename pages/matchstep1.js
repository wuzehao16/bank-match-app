import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Radio, Form } from 'antd';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {  withStyles } from '@material-ui/core/styles';
import Layout from '../layout/layout';
import Topbar from '../components/Topbar';
import {withReduxSaga} from '../redux/store'
import { saveStep1, saveModel } from '../redux/actions'
import withRoot from '../src/withRoot';
import fetch from '../lib/fetch';
import { getCookie } from '../lib/util'
const FormItem = Form.Item;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
    border:'none'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
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
const NextButton = styled(Button)`
  width: 100%;
  height: 36px;
  border-radius: 4px;
`

class MatchStep1 extends React.Component {
  static async getInitialProps ({store,query,req}) {
    // eslint-disable-next-line no-undef
    if (query.matchNo && req) {
      const token = getCookie('token', req)
      const res = await fetch(`/selectModelUserDetail?matchNo=${query.matchNo}`, token)
      // console.log(res.json())
      //总利息
      return { data: {matchJson:res,matchNo:query.matchNo} }
    }
    return {
      data: store.getState()
    }
  }
	componentDidMount () {
    this.props.dispatch(saveModel(this.props.data))
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
        this.props.dispatch(saveStep1(values))
      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render () {
    const { classes, data } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const item = data.matchJson.loanDemand || {};
    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name');
    const loanTypeError = isFieldTouched('loanType') && getFieldError('loanType');
    const exLoanAmountError = isFieldTouched('exLoanAmount') && getFieldError('exLoanAmount');
    const cityError = isFieldTouched('city') && getFieldError('city');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout title="智能匹配">
        <Topbar position="hidden"/>
        <Wrapper>
          <Container>
            <div className={classes.lable} style={{fontSize:'16px',lineHeight: '32px',color:'#3c3c3c'}}>姓名</div>
            <FormItem
              style={{position:'relative'}}
              validateStatus={nameError ? 'error' : ''}
              help={nameError || ''}
              >
              {getFieldDecorator('name', {
                initialValue:item.name,
                rules: [{
                  required: true,
                  message:'请输入姓名'
                }],
              })(
                // <TextField
                //   required
                //   id="name"
                //   className={classes.textField}
                //   inputProps={{
                //     maxLength: '10',
                //     pattern:'[\u4e00-\u9fa5|a-zA-Z]*',
                //     title:"请输入中文或英文字符"
                //   }}
                //   placeholder="请输入姓名"
                // />
                <input placeholder="请输入姓名" maxLength="10" pattern='[\u4e00-\u9fa5|a-zA-Z]*' style={{width:116}}/>
              )}
            </FormItem>

          </Container>
          <Container>
            <div className={classes.lable} style={{fontSize:'16px',lineHeight: '32px',color:'#3c3c3c'}}>期望贷款金额</div>
            <div>
              <FormItem
                style={{position:'relative',display:'inline-block'}}
                validateStatus={exLoanAmountError ? 'error' : ''}
                help={exLoanAmountError || ''}
                >
                {getFieldDecorator('exLoanAmount', {
                  initialValue: item.exLoanAmount,
                  rules: [{
                    required: true,
                    message:'请输入贷款金额'
                  }],
                })(
                  // <TextField
                  //   required
                  //   // label="期望贷款金额"
                  //    className={classes.textField}
                  //   InputProps={{
                  //     endAdornment: <InputAdornment position="end">元</InputAdornment>
                  //   }}
                  //   inputProps={{
                  //     type:'number',
                  //     min: 1,
                  //     max: 99999999,
                  //   }}
                  //   placeholder="请输入金额"
                  // />
                  <input placeholder="请输入金额" type="number" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )' min={1} max={99999999} style={{width:100}}/>
                )}
              </FormItem>
              <span>元</span>
            </div>
          </Container>
          <Contain>
            <p>贷款类型</p>
            <FormItem
              validateStatus={loanTypeError ? 'error' : ''}
              help={loanTypeError || ''}
              >
              {getFieldDecorator('loanType', {
                initialValue:item.loanType,
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
                initialValue: item.city,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value="20">深圳</RadioButton>
                  <RadioButton value="30">广州</RadioButton>
                  <RadioButton value="50">东莞</RadioButton>
                  <RadioButton value="40">珠海</RadioButton>
                  <RadioButton value="60">惠州</RadioButton>
                  <RadioButton value="70">中山</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
        </Wrapper>
        <div className='btn' >
          <FormItem>
              <NextButton variant="raised" color="primary" type="primary" htmltype="submit" disabled={this.hasErrors(getFieldsError())}>下一步</NextButton>
          </FormItem>
        </div>
      </Layout>
      <style jsx>{`
        input{
         outline:none;
         border-color: #878787;
         border-style: solid;
         border-radius:0;
         border-top-width: 0px;
         border-right-width: 0px;
         border-bottom-width: 0px;
         border-left-width: 0px;
         font-size: 16px;
        }
      `}
      </style>
      </Form>
    )
  }
}

MatchStep1.propTypes = {
  classes: PropTypes.object.isRequired,
};
const WrappedMatchStep1 = Form.create()(MatchStep1);

export default withReduxSaga(withRoot(withStyles(styles)(WrappedMatchStep1)));
