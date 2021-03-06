import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import { Radio, Form } from 'antd';
import Layout from '../layout/layout';
import Topbar from '../components/Topbar';
import {withReduxSaga} from '../redux/store'
import { saveStep6 } from '../redux/actions'
import withRoot from '../src/withRoot';

const FormItem = Form.Item;
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
  padding-bottom: 50px;
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
  font-size: 13px;
  line-height: 35px;
  color: #969696;
  padding: 0 15px;
`
const SubContain = styled.div`
  color: #646464;
  background-color: #fff;
  padding: 10px 13px 20px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 16px;
`
const SubContainTitle = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
  color: #646464;
`
const Br = styled.div`
  height: 10px;
`
const Help = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0px;
  font-size: 10px;
`
const Red = styled.span`
  color: #ff2b2b;
`
const DoubleInput = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding: 20px 0 20px 0;
  position: relative;
  font-size: 15px;
  color: #646464;
  ${'' /* display: flex; */}
  ${'' /* justify-content: space-between; */}
`
const Sub = styled.div`
  padding: 0 13px;
  color: #646464;
`
const Relative = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`
const NextButton = styled(Button)`
  width: 100%;
  height: 36px;
  border-radius: 4px;
`
class MatchStep6 extends React.Component {
  static async getInitialProps({store}) {
		return {
			data: store.getState()
		}
	}
	componentDidMount () {
    this.props.form.validateFields();
  }
  state = {
    name: '',
    disabled: false,
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
        this.setState({
          disabled: true
        })
        this.props.dispatch(saveStep6(values))

      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render () {
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const item = data.matchJson.capitalDebtSituation || {};
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
    console.log(this.state)
    console.log(this.state.disabled && this.hasErrors(getFieldsError()) )
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout title="智能匹配">
        <Topbar position="p3" num={data.productNum?data.productNum:0}/>
        <Title>名下负债状况</Title>
        <Wrapper>
          <DoubleInput>
            <Relative>
              <span className="title">信用类贷款</span>
              <span>
                <FormItem
                  style={{display:'inline-block'}}
                  validateStatus={sumCreditLoanError ? 'error' : ''}
                  help={sumCreditLoanError || ''}
                  >
                  {getFieldDecorator('sumCreditLoan', {
                    initialValue:item.sumCreditLoan,
                    rules: [{
                      required: true,
                      message: '请输入信用类贷款'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                  )}
                </FormItem>
                <span>笔</span>
              </span>
            </Relative>
          </DoubleInput>
          {
            getFieldValue('sumCreditLoan') >0 ?
              <div>
                <DoubleInput>
                  <Relative>
                    <span className="title">等额本息类贷款</span>
                    <span>
                      <FormItem
                        style={{display:'inline-block'}}
                        >
                        {getFieldDecorator('sumEqualInterest', {
                          initialValue:item.sumEqualInterest,
                        })(
                            <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                        )}
                      </FormItem>
                      <span>笔</span>
                    </span>
                  </Relative>
                </DoubleInput>
                <Sub>
                  {
                      getFieldValue("sumEqualInterest") > 0
                      ? <div>
                          <DoubleInput>
                            <Relative>
                              <span>等额本息类贷款总余额 </span>
                              <span>
                                <FormItem
                                  style={{display:'inline-block'}}
                                  validateStatus={equalInterestTotalBalanceError ? 'error' : ''}
                                  help={equalInterestTotalBalanceError || ''}
                                  >
                                  {getFieldDecorator('equalInterestTotalBalance', {
                                    initialValue:item.equalInterestTotalBalance,
                                    rules: [{
                                      required: true,
                                      message: '请输入等额本息类贷款总余额'
                                    }],
                                  })(
                                      <input placeholder="请输入"  type="number" min={0}  style={{width:100,fontSize:'16px'}}/>
                                  )}
                                </FormItem>
                                <span>元</span>
                              </span>
                            </Relative>
                          </DoubleInput>
                          <DoubleInput>
                            <Relative>
                              <span>每月还款总额</span>
                              <span>
                                <FormItem
                                  style={{display:'inline-block'}}
                                  validateStatus={equalInteresMonthPaymentError ? 'error' : ''}
                                  help={equalInteresMonthPaymentError || ''}
                                  >
                                  {getFieldDecorator('equalInteresMonthPayment', {
                                    initialValue:item.equalInteresMonthPayment,
                                    rules: [{
                                      required: true,
                                      message: '请输入每月还款总额'
                                    }],
                                  })(
                                    <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                                  )}
                                </FormItem>
                                <span>元</span>
                              </span>
                            </Relative>
                          </DoubleInput>
                        </div>:null
                    }
                  </Sub>
                <DoubleInput>
                  <Relative>
                  <span className="title">先息后本类贷款</span>
                  <span>
                    <span>
                      <FormItem
                        style={{display:'inline-block'}}
                        validateStatus={sumEqualInterestError ? 'error' : ''}
                        help={sumEqualInterestError || ''}
                      >
                        {getFieldDecorator('sumFirstInterest', {
                          initialValue:item.sumFirstInterest,
                          rules: [{ required: true}],
                        })(

                            <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>

                        )}
                      </FormItem>
                    </span>
                    <span>笔</span>
                  </span>
                  </Relative>
                </DoubleInput>
                <Sub>
                  {
                    getFieldValue('sumFirstInterest') > 0
                    ? <div>
                        <DoubleInput>
                          <Relative>
                            <span>先息后本类贷款总余额 </span>
                            <span>
                              <FormItem
                                style={{display:'inline-block'}}
                                validateStatus={firstInterestTotalBalanceError ? 'error' : ''}
                                help={firstInterestTotalBalanceError || ''}
                                >
                                {getFieldDecorator('firstInterestTotalBalance', {
                                  initialValue:item.firstInterestTotalBalance,
                                  rules: [{
                                    required: true,
                                    message:'请输入随借随还类贷款总余额'
                                  }],
                                })(
                                    <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                                )}
                              </FormItem>
                              <span>元</span>
                            </span>
                          </Relative>
                        </DoubleInput>
                        <DoubleInput>
                          <Relative>
                            <span>每月还利息</span>
                            <span>
                              <FormItem
                                style={{display:'inline-block'}}
                                validateStatus={firstInterestMonthPaymentError ? 'error' : ''}
                                help={firstInterestMonthPaymentError || ''}
                                >
                                {getFieldDecorator('firstInterestMonthPayment', {
                                  initialValue:item.firstInterestMonthPayment,
                                  rules: [{
                                    required: true,
                                    message:'每月还利息'
                                  }],
                                })(
                                    <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                                )}
                              </FormItem>
                              <span>元</span>
                            </span>
                          </Relative>
                        </DoubleInput>
                      </div>:null
                  }
                </Sub>
                <DoubleInput>
                  <Relative>
                  <span className="title">随借随还类</span>
                  <span>
                    <FormItem
                      style={{display:'inline-block'}}
                      validateStatus={sumEqualInterestError ? 'error' : ''}
                      help={sumEqualInterestError || ''}
                    >
                        {getFieldDecorator('sumAlongLoan', {
                          initialValue:item.sumAlongLoan,
                          rules: [{ required: true}],
                        })(
                            <input placeholder="请输入"  type="number" min={0}  style={{width:100,fontSize:'16px'}}/>
                        )}
                      </FormItem>
                      <span>笔</span>
                  </span>
                  </Relative>
                </DoubleInput>
                <Sub>
                  {
                    getFieldValue('sumAlongLoan') > 0
                    ? <div>
                        <DoubleInput>
                        <Relative>
                          <span>随借随还类贷款总余额 </span>
                          <span>
                            <FormItem
                              style={{display:'inline-block'}}
                              validateStatus={alongLoanTotalBalanceError ? 'error' : ''}
                              help={alongLoanTotalBalanceError || ''}
                              >
                              {getFieldDecorator('alongLoanTotalBalance', {
                                initialValue:item.alongLoanTotalBalance,
                                rules: [{
                                  required: true,
                                  message:'请输入随借随还类贷款总余额'
                                }],
                              })(
                                  <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                              )}
                            </FormItem>
                            <span>元</span>
                          </span>
                        </Relative>
                        </DoubleInput>
                        <DoubleInput>
                        <Relative>
                          <span>每月还利息</span>
                          <span>
                            <FormItem
                              style={{display:'inline-block'}}
                              validateStatus={alongLoanMonthPaymentError ? 'error' : ''}
                              help={alongLoanMonthPaymentError || ''}
                              >
                              {getFieldDecorator('alongLoanMonthPayment', {
                                initialValue:item.alongLoanMonthPayment,
                                rules: [{
                                  required: true,
                                  message:'请输入每月还利息'
                                }],
                              })(
                                  <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                              )}
                            </FormItem>
                            <span>元</span>
                          </span>
                        </Relative>
                      </DoubleInput>
                    </div>: null
                  }
                </Sub>
              </div>: null
          }
          <DoubleInput>
            <Relative>
              <span className="title">信用卡</span>
              <span>
                <FormItem
                  style={{display:'inline-block'}}
                  validateStatus={sumCreditCardError ? 'error' : ''}
                  help={sumCreditCardError || ''}
                  >
                  {getFieldDecorator('sumCreditCard', {
                    initialValue:item.sumCreditCard,
                    rules: [{
                      required: true,
                      message: '请输入信用卡张数'
                    }],
                  })(
                      <input placeholder="请输入"  type="number" min={0}  style={{width:100,fontSize:'16px'}}/>
                  )}
                </FormItem>
                <span>张</span>
              </span>
            </Relative>

          </DoubleInput>
          {
            getFieldValue('sumCreditCard') > 0
            ?          <Sub>
                        <DoubleInput>
                          <Relative>
                            <span>信用卡总额度</span>
                            <span>
                              <FormItem
                                style={{display:'inline-block'}}
                                validateStatus={creditCardTotalLimitError ? 'error' : ''}
                                help={creditCardTotalLimitError || ''}
                                >
                                {getFieldDecorator('creditCardTotalLimit', {
                                  initialValue:item.creditCardTotalLimit,
                                  rules: [{
                                    required: true,
                                    message: '请输入信用卡总额度'
                                  }],
                                })(
                                    <input placeholder="请输入"  type="number" min={0}  style={{width:100,fontSize:'16px'}}/>
                                )}
                              </FormItem>
                              <span>元</span>
                            </span>
                          </Relative>
                        </DoubleInput>
                        <DoubleInput>
                          <Relative>
                            <span>信用卡当月已使用额度</span>
                            <span>
                              <FormItem
                                style={{display:'inline-block'}}
                                validateStatus={creditCardUsedLimitError ? 'error' : ''}
                                help={creditCardUsedLimitError || ''}
                                >
                                {getFieldDecorator('creditCardUsedLimit', {
                                  initialValue:item.creditCardUsedLimit,
                                  rules: [{
                                    required: true,
                                    message: '请输入信用卡当月已使用额度'
                                  }],
                                })(
                                    <input placeholder="请输入"  type="number" min={0}  style={{width:100,fontSize:'16px'}}/>
                                )}
                              </FormItem>
                              <span>元</span>
                            </span>
                          </Relative>
                        </DoubleInput>
                        <DoubleInput>
                          <Relative>
                            <span>信用卡近六个月平均使用额度</span>
                            <span>
                              <FormItem
                                style={{display:'inline-block'}}
                                validateStatus={creditCardSixMonthsAvgUsedLimitError ? 'error' : ''}
                                help={creditCardSixMonthsAvgUsedLimitError || ''}
                                >
                                {getFieldDecorator('creditCardSixMonthsAvgUsedLimit', {
                                  initialValue:item.creditCardSixMonthsAvgUsedLimit,
                                  rules: [{
                                    required: true,
                                    message: '请输入信用卡近六个月平均使用额度'
                                  }],
                                })(
                                    <input placeholder="请输入"  type="number" min={0}  style={{width:80,fontSize:'16px'}}/>
                                )}
                              </FormItem>
                              <span>元</span>
                            </span>
                          </Relative>
                        </DoubleInput>
                        <DoubleInput>
                         <Relative>
                           <span>信用卡办理分期还款的张数</span>
                           <span>
                             <FormItem
                               style={{display:'inline-block'}}
                               validateStatus={sumStagesCreditCardError ? 'error' : ''}
                               help={sumStagesCreditCardError || ''}
                               >
                               {getFieldDecorator('sumStagesCreditCard', {
                                 initialValue:item.sumStagesCreditCard,
                                 rules: [{
                                   required: true,
                                   message: '请输入信用卡办理分期还款的张数'
                                 }],
                               })(
                                   <input placeholder="请输入"  type="number" min={0} max={getFieldValue('sumCreditCard')}  style={{width:100,fontSize:'16px'}}/>
                               )}
                             </FormItem>
                             <span>张</span>
                           </span>
                          </Relative>
                        </DoubleInput>
                      </Sub> : null
          }
        </Wrapper>
        <div className='btn' style={{marginTop:30}}>
          <FormItem>
              <NextButton variant="raised" color="primary" type="primary"  disabled={this.state.disabled || this.hasErrors(getFieldsError()) }>生成报告</NextButton>
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
         text-align: right;
        }
        .title{
          color: #3c3c3c;
        }
      `}
      </style>
      </Form>
    )
  }
}


const WrappedMatchStep6 = Form.create()(MatchStep6);

export default withReduxSaga(withRoot(WrappedMatchStep6));
