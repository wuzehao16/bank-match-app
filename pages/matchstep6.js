import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types';
// import TextField from 'material-ui/TextField';
import Router from 'next/router';
import Button from 'material-ui/Button';
import { Radio, Form } from 'antd';
import Layout from '../components/layout';
import Topbar from '../components/Topbar';
import fetch from '../lib/fetch'
import { createMuiTheme, withStyles, MuiThemeProvider } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import {withReduxSaga} from '../redux/store'
import { saveStep6 } from '../redux/actions'

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
  position: relative;
  font-size: 12px;
`
const Title = styled.div`
  font-size: 11px;
  line-height: 35px;
  color: #969696;
  padding: 0 15px;
`
const SubContain = styled.div`
  background-color: #fff;
  padding: 10px 13px 20px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 12px;
`
const SubContainTitle = styled.div`
  padding-bottom: 10px;
  font-size: 12px;
`
const Br = styled.div`
  height: 10px;
`
const Help = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0px;
  z-index: 10;
  font-size: 7px;
`
const Red = styled.span`
  color: #ff2b2b;
`
const DoubleInput = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding: 20px 0 20px 0;
  position: relative;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`
const Sub = styled.div`
  padding: 0 13px;
`
class MatchStep4 extends React.Component {
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
        this.props.dispatch(saveStep6(values))
      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render () {
    const { classes } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const sumCreditLoanError = isFieldTouched('sumCreditLoan') && getFieldError('sumCreditLoan');
    const sumEqualInterestError = isFieldTouched('sumEqualInterest') && getFieldError('sumEqualInterest');
    const sumAlongLoanError = isFieldTouched('sumAlongLoan') && getFieldError('sumAlongLoan');
    const equalInterestTotalBalanceError = isFieldTouched('equalInterestTotalBalance') && getFieldError('equalInterestTotalBalance');
    const equalInteresMonthPaymentError = isFieldTouched('equalInteresMonthPayment') && getFieldError('equalInteresMonthPayment');
    const firstInterestTotalBalanceError = isFieldTouched('firstInterestTotalBalance') && getFieldError('firstInterestTotalBalance');
    const firstInterestMonthPaymentError = isFieldTouched('firstInterestMonthPayment') && getFieldError('firstInterestMonthPayment');
    const alongLoanTotalBalanceError = isFieldTouched('alongLoanTotalBalance') && getFieldError('alongLoanTotalBalance');
    const alongLoanMonthPaymentError = isFieldTouched('alongLoanMonthPayment') && getFieldError('alongLoanMonthPayment');
    const sumCreditCardError = isFieldTouched('sumCreditCard') && getFieldError('sumCreditCard');
    const creditCardTotalLimitError = isFieldTouched('creditCardTotalLimit') && getFieldError('creditCardTotalLimit');
    const creditCardUsedLimitError = isFieldTouched('creditCardUsedLimit') && getFieldError('creditCardUsedLimit');
    const creditCardSixMonthsAvgUsedLimitError = isFieldTouched('creditCardSixMonthsAvgUsedLimit') && getFieldError('creditCardSixMonthsAvgUsedLimit');
    const sumStagesCreditCardError = isFieldTouched('sumStagesCreditCard') && getFieldError('sumStagesCreditCard');

    return (
      <MuiThemeProvider theme={theme}>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout>
        <Topbar position="p3"/>
        <Title>名下负债状况</Title>
        <Wrapper>
          <DoubleInput>
            <FormItem
              validateStatus={sumCreditLoanError ? 'error' : ''}
              help={sumCreditLoanError || ''}
              >
              {getFieldDecorator('sumCreditLoan', {
                rules: [{ required: true}],
              })(
                <div >
                  <span>等额本息贷款</span>
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                  <span>笔</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              >
              {getFieldDecorator('sumEqualInterest', {
              })(
                <span >
                  <span>先息后本贷款</span>
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                  <span>笔,</span>
                </span>
              )}
              {getFieldDecorator('sumFirstInterest', {
                rules: [{ required: true}],
              })(
                <span >
                  <span>信用类贷款</span>
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                  <span>笔，</span>
                </span>
              )}
              {getFieldDecorator('sumAlongLoan', {
                rules: [{ required: true}],
              })(
                <span >
                  <span>随借随还类</span>
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                  <span>笔</span>
                </span>
              )}
            </FormItem>
          </DoubleInput>
          <Sub>
            {
              getFieldValue("sumEqualInterest") > 0
              ?            <DoubleInput>
                            <FormItem
                              validateStatus={equalInterestTotalBalanceError ? 'error' : ''}
                              help={equalInterestTotalBalanceError || ''}
                              >
                              {getFieldDecorator('equalInterestTotalBalance', {
                                rules: [{ required: true}],
                              })(
                                <span >
                                  <span>等额本息类贷款总余额 </span>
                                  <input  type="number" min={0}  style={{width:25}}/>
                                  <span>元</span>
                                </span>
                              )}
                            </FormItem>
                            <FormItem
                              validateStatus={equalInteresMonthPaymentError ? 'error' : ''}
                              help={equalInteresMonthPaymentError || ''}
                              >
                              {getFieldDecorator('equalInteresMonthPayment', {
                                rules: [{ required: true}],
                              })(
                                <span >
                                  <span>每月还款总额</span>
                                  <input  type="number" min={0} style={{width:25}}/>
                                  <span>元</span>
                                </span>
                              )}
                            </FormItem>
                          </DoubleInput>:null

            }
            {
              getFieldValue('sumFirstInterest') > 0
              ?            <DoubleInput>
                            <FormItem
                              validateStatus={firstInterestTotalBalanceError ? 'error' : ''}
                              help={firstInterestTotalBalanceError || ''}
                              >
                              {getFieldDecorator('firstInterestTotalBalance', {
                                rules: [{ required: true}],
                              })(
                                <span >
                                  <span>先息后本类贷款总余额 </span>
                                  <input  type="number" min={0}  style={{width:25}}/> <span>元</span>
                                </span>
                              )}
                            </FormItem>
                            <FormItem
                              validateStatus={firstInterestMonthPaymentError ? 'error' : ''}
                              help={firstInterestMonthPaymentError || ''}
                              >
                              {getFieldDecorator('firstInterestMonthPayment', {
                                rules: [{ required: true}],
                              })(
                                <span >
                                  <span>每月还利息</span>
                                  <input  type="number" min={0} style={{width:25}}/>
                                  <span>元</span>
                                </span>
                              )}
                            </FormItem>
                          </DoubleInput>:null
            }
            {
              getFieldValue('sumAlongLoan') > 0
              ? <DoubleInput>
                <FormItem
                  validateStatus={firstInterestTotalBalanceError ? 'error' : ''}
                  help={firstInterestTotalBalanceError || ''}
                  >
                  {getFieldDecorator('firstInterestTotalBalance', {
                    rules: [{ required: true}],
                  })(
                    <span >
                      <span>随借随还类贷款总余额 </span>
                      <input  type="number" min={0}  style={{width:25}}/> <span>元</span>
                    </span>
                  )}
                </FormItem>
                <FormItem
                  validateStatus={alongLoanMonthPaymentError ? 'error' : ''}
                  help={alongLoanMonthPaymentError || ''}
                  >
                  {getFieldDecorator('alongLoanMonthPayment', {
                    rules: [{ required: true}],
                  })(
                    <span >
                      <span>每月还利息</span>
                      <input  type="number" min={0} style={{width:25}}/>
                      <span>元</span>
                    </span>
                  )}
                </FormItem>
              </DoubleInput>: null
            }
          </Sub>
          <DoubleInput>
            <FormItem
              validateStatus={sumCreditCardError ? 'error' : ''}
              help={sumCreditCardError || ''}
              >
              {getFieldDecorator('sumCreditCard', {
                rules: [{ required: true,
                  message: '请输入信用卡张数'
                }],
              })(
                <span >
                  <span>信用卡 </span>
                  <input  type="number" min={0}  style={{width:25}}/>
                  <span>张</span>
                </span>
              )}
            </FormItem>
          </DoubleInput>
          {
            getFieldValue('sumCreditCard') > 0
            ?          <Sub>
                        <DoubleInput>
                          <FormItem
                            validateStatus={creditCardTotalLimitError ? 'error' : ''}
                            help={creditCardTotalLimitError || ''}
                            >
                            {getFieldDecorator('creditCardTotalLimit', {
                              rules: [{ required: true}],
                            })(
                              <span >
                                <span>信用卡总额度</span>
                                <input  type="number" min={0}  style={{width:25}}/>
                                <span>元</span>
                              </span>
                            )}
                          </FormItem>
                        </DoubleInput>
                        <DoubleInput>
                          <FormItem
                            validateStatus={creditCardUsedLimitError ? 'error' : ''}
                            help={creditCardUsedLimitError || ''}
                            >
                            {getFieldDecorator('creditCardUsedLimit', {
                              rules: [{ required: true}],
                            })(
                              <span >
                                <span>信用卡当月已使用额度</span>
                                <input  type="number" min={0}  style={{width:25}}/>
                                <span>元</span>
                              </span>
                            )}
                          </FormItem>
                        </DoubleInput>
                        <DoubleInput>
                          <FormItem
                            validateStatus={creditCardSixMonthsAvgUsedLimitError ? 'error' : ''}
                            help={creditCardSixMonthsAvgUsedLimitError || ''}
                            >
                            {getFieldDecorator('creditCardSixMonthsAvgUsedLimit', {
                              rules: [{ required: true}],
                            })(
                              <span >
                                <span>信用卡近六个月平均使用额度</span>
                                <input  type="number" min={0}  style={{width:25}}/>
                                <span>元</span>
                              </span>
                            )}
                          </FormItem>
                        </DoubleInput>
                        <DoubleInput>
                          <FormItem
                            validateStatus={sumStagesCreditCardError ? 'error' : ''}
                            help={sumStagesCreditCardError || ''}
                            >
                            {getFieldDecorator('sumStagesCreditCard', {
                              rules: [{ required: true}],
                            })(
                              <span >
                                <span>信用卡办理了分期还款张数</span>
                                <input  type="number" min={0}  style={{width:25}}/>
                                <span>张</span>
                              </span>
                            )}
                          </FormItem>
                        </DoubleInput>
                      </Sub> : null
          }
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
        input{
         border-color: #878787;
         border-style: solid;
         border-radius:0;
         border-top-width: 0px;
         border-right-width: 0px;
         border-bottom-width: 1px;
         border-left-width: 0px
        }
      `}
      </style>
      </MuiThemeProvider>
    )
  }
}

MatchStep4.propTypes = {
  classes: PropTypes.object.isRequired,
};
const WrappedMatchStep4 = Form.create()(MatchStep4);

export default withReduxSaga(withStyles(styles)(WrappedMatchStep4));