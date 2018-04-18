import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from 'material-ui/Button';
import { Radio, Form } from 'antd';
import Layout from '../layout/layout';
import Topbar from '../components/Topbar';
// import fetch from '../lib/fetch'
import {withReduxSaga} from '../redux/store'
import { saveStep3 } from '../redux/actions'
import withRoot from '../src/withRoot';


const FormItem = Form.Item;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
  padding: 20px 30px 20px 0;
  position: relative;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`
const Relative = styled.div`
  position: relative;
`
class MatchStep3 extends React.Component {
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
        this.props.dispatch(saveStep3(values))
      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render () {
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const item = data.matchJson.creditInformation || {};
    // Only show error after a field is touched.
    const recordTimeError = isFieldTouched('recordTime') && getFieldError('recordTime');
    const sumPettyLoanError = isFieldTouched('sumPettyLoan') && getFieldError('sumPettyLoan');
    const sumConsumerFinanceLoanError = isFieldTouched('sumConsumerFinanceLoan') && getFieldError('sumConsumerFinanceLoan');
    const isParticleLoanError = isFieldTouched('isParticleLoan') && getFieldError('isParticleLoan');
    const particleLoanLimitError = isFieldTouched('particleLoanLimit') && getFieldError('particleLoanLimit');
    const isLoanCloseError = isFieldTouched('isLoanClose') && getFieldError('isLoanClose');
    const isLoanLossError = isFieldTouched('isLoanLoss') && getFieldError('isLoanLoss');
    const isOverdueError = isFieldTouched('isOverdue') && getFieldError('isOverdue');
    const overdueCategoryError = isFieldTouched('overdueCategory') && getFieldError('overdueCategory');
    const creditCardOverdueMoneyError = isFieldTouched('creditCardOverdueMoney') && getFieldError('creditCardOverdueMoney');
    const loanOverdueMoneyError = isFieldTouched('loanOverdueMoney') && getFieldError('loanOverdueMoney');
    const isOverdueBalanceError = isFieldTouched('isOverdueBalance') && getFieldError('isOverdueBalance');
    const isTwoMonthsOverdueError = isFieldTouched('isTwoMonthsOverdue') && getFieldError('isTwoMonthsOverdue');
    const overdueDaysError = isFieldTouched('overdueDays') && getFieldError('overdueDays');
    const isThreeMonthsOverdueError = isFieldTouched('isThreeMonthsOverdue') && getFieldError('isThreeMonthsOverdue');
    const isSixMonthsOverdueError = isFieldTouched('isSixMonthsOverdue') && getFieldError('isSixMonthsOverdue');
    const isOneYearOverdueError = isFieldTouched('isOneYearOverdue') && getFieldError('isOneYearOverdue');
    const isTwoYearsOverdueError = isFieldTouched('isTwoYearsOverdue') && getFieldError('isTwoYearsOverdue');
    const isFiveYearsOverdueError = isFieldTouched('isFiveYearsOverdue') && getFieldError('isFiveYearsOverdue');
    const sumOneMonthQueriesError = isFieldTouched('sumOneMonthQueries') && getFieldError('sumOneMonthQueries');
    const sumTwoMonthsQueriesError = isFieldTouched('sumTwoMonthsQueries') && getFieldError('sumTwoMonthsQueries');
    const sumThreeMonthsQueriesError = isFieldTouched('sumThreeMonthsQueries') && getFieldError('sumThreeMonthsQueries');
    const sumSixMonthsQueriesError = isFieldTouched('sumSixMonthsQueries') && getFieldError('sumSixMonthsQueries');
    const sumOneYearQueriesError = isFieldTouched('sumOneYearQueries') && getFieldError('sumOneYearQueries');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout title="智能匹配">
        <Topbar position="p2" num={data.productNum?data.productNum:0}/>
        <Title>征信基本情况</Title>
        <Wrapper>
          <Contain>
            <p>征信记录时长</p>
            <FormItem
              validateStatus={recordTimeError ? 'error' : ''}
              help={recordTimeError || ''}
              >
              {getFieldDecorator('recordTime', {
                initialValue:item.recordTime,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>无</RadioButton>
                  <RadioButton value={1}>1-3个月</RadioButton>
                  <RadioButton value={2}>3-6个月</RadioButton>
                  <RadioButton value={3}>6-12个月</RadioButton>
                  <RadioButton value={4}>12个月以上</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <Help><Red>*</Red>征信记录时长指开始使用信用卡到现在的时长(办卡未使用期间不算)或贷款已还款多少期数.</Help>
          </Contain>
          <Contain>
            <p>名下上征信小额类贷款笔数</p>
            <FormItem
              validateStatus={sumPettyLoanError ? 'error' : ''}
              help={sumPettyLoanError || ''}
              >
              {getFieldDecorator('sumPettyLoan', {
                initialValue:item.sumPettyLoan,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>无</RadioButton>
                  <RadioButton value={1}>1笔</RadioButton>
                  <RadioButton value={2}>2笔</RadioButton>
                  <RadioButton value={3}>3笔</RadioButton>
                  <RadioButton value={4}>3笔以上</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <Help>
              <Red>*</Red>小额指P2P机构发放的贷款.
            </Help>
          </Contain>
          <Contain>
            <p>名下上征信消费金融类贷款笔数 </p>
            <FormItem
              validateStatus={sumConsumerFinanceLoanError ? 'error' : ''}
              help={sumConsumerFinanceLoanError || ''}
              >
              {getFieldDecorator('sumConsumerFinanceLoan', {
                initialValue:item.sumConsumerFinanceLoan,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>无</RadioButton>
                  <RadioButton value={1}>1笔</RadioButton>
                  <RadioButton value={2}>2笔</RadioButton>
                  <RadioButton value={3}>3笔</RadioButton>
                  <RadioButton value={4}>3笔以上</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <Help>
              <Red>*</Red>消费金融指有消费金融牌照的机构发放的贷款.
            </Help>
          </Contain>
          <Contain>
            <p>是否使用过微粒贷 </p>
            <FormItem
              validateStatus={isParticleLoanError ? 'error' : ''}
              help={isParticleLoanError || ''}
              >
              {getFieldDecorator('isParticleLoan', {
                initialValue:item.isParticleLoan,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={1}>是</RadioButton>
                  <RadioButton value={0}>否</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
          {
            getFieldValue('isParticleLoan') === 1
              ?           <SubContain>
                          <SubContainTitle>使用额度</SubContainTitle>
                          <FormItem
                            validateStatus={particleLoanLimitError ? 'error' : ''}
                            help={particleLoanLimitError || ''}
                            >
                            {getFieldDecorator('particleLoanLimit', {
                              initialValue:item.particleLoanLimit,
                              rules: [{ required: true}],
                            })(
                              <RadioGroup  size="small">
                                <RadioButton value={0}>3千以下</RadioButton>
                                <RadioButton value={1}>3-5千</RadioButton>
                                <RadioButton value={2}>5千-1万</RadioButton>
                                <RadioButton value={3}>1万以上</RadioButton>
                              </RadioGroup>
                            )}
                          </FormItem>
                        </SubContain> :null
          }
          <Contain>
            <p>名下贷款/信用卡账户状态是否有冻结/呆账/止付/挂失/收卡/作废 </p>
            <FormItem
              validateStatus={isLoanCloseError ? 'error' : ''}
              help={isLoanCloseError || ''}
              >
              {getFieldDecorator('isLoanClose', {
                initialValue:item.isLoanClose,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={1}>有</RadioButton>
                  <RadioButton value={0}>无</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
          <Contain>
            <p>名下贷款/信用卡五级分类是否有关注/次级/可疑/损失 </p>
            <FormItem
              validateStatus={isLoanLossError ? 'error' : ''}
              help={isLoanLossError || ''}
              >
              {getFieldDecorator('isLoanLoss', {
                initialValue:item.isLoanLoss,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={1}>有</RadioButton>
                  <RadioButton value={0}>无</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
        </Wrapper>
        <Title>征信逾期情况</Title>
        <Wrapper>
          <Contain>
            <p>当前是否有逾期</p>
            <FormItem
              validateStatus={isOverdueError ? 'error' : ''}
              help={isOverdueError || ''}
              >
              {getFieldDecorator('isOverdue', {
                initialValue:item.isOverdue,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={1}>有</RadioButton>
                  <RadioButton value={0}>无</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
          {
            getFieldValue('isOverdue') ===1
              ? <div>
                <SubContain>
                  <SubContainTitle>当前逾期类别</SubContainTitle>
                  <FormItem
                    validateStatus={overdueCategoryError ? 'error' : ''}
                    help={overdueCategoryError || ''}
                    >
                    {getFieldDecorator('overdueCategory', {
                      initialValue:item.overdueCategory,
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>信用卡逾期</RadioButton>
                        <RadioButton value={1}>贷款逾期</RadioButton>
                        <RadioButton value={2}>信用卡和贷款逾期</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                <SubContain>
                  <SubContainTitle>当前逾期天数</SubContainTitle>
                  <FormItem
                    validateStatus={overdueDaysError ? 'error' : ''}
                    help={overdueDaysError || ''}
                    >
                    {getFieldDecorator('overdueDays', {
                      initialValue:item.overdueDays,
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>3天以下</RadioButton>
                        <RadioButton value={1}>3-7天</RadioButton>
                        <RadioButton value={2}>7-15天</RadioButton>
                        <RadioButton value={3}>15天以上</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                {
                  (getFieldValue('overdueCategory') ===0 || getFieldValue('overdueCategory')===2)
                    ?  <SubContain>
                        <SubContainTitle>当前信用卡逾期金额</SubContainTitle>
                        <FormItem
                          validateStatus={creditCardOverdueMoneyError ? 'error' : ''}
                          help={creditCardOverdueMoneyError || ''}
                          >
                          {getFieldDecorator('creditCardOverdueMoney', {
                            initialValue:item.creditCardOverdueMoney,
                            rules: [{ required: true}],
                          })(
                            <RadioGroup  size="small">
                              <RadioButton value={0}>5百以下</RadioButton>
                              <RadioButton value={1}>5百-1千</RadioButton>
                              <RadioButton value={2}>1-2千</RadioButton>
                              <RadioButton value={3}>2千以上</RadioButton>
                            </RadioGroup>
                          )}
                        </FormItem>
                      </SubContain> : null
                }
                {
                  (getFieldValue('overdueCategory') ===1 || getFieldValue('overdueCategory')===2)
                    ?  <SubContain>
                        <SubContainTitle>当前贷款逾期金额</SubContainTitle>
                        <FormItem
                          validateStatus={loanOverdueMoneyError ? 'error' : ''}
                          help={loanOverdueMoneyError || ''}
                          >
                          {getFieldDecorator('loanOverdueMoney', {
                            initialValue:item.loanOverdueMoney,
                            rules: [{ required: true}],
                          })(
                            <RadioGroup  size="small">
                              <RadioButton value={0}>5百以下</RadioButton>
                              <RadioButton value={1}>5百-1千</RadioButton>
                              <RadioButton value={2}>1-2千</RadioButton>
                              <RadioButton value={3}>2千以上</RadioButton>
                            </RadioGroup>
                          )}
                        </FormItem>
                      </SubContain> : null
                }
                <SubContain>
                  <SubContainTitle>当前逾期是否已经结清</SubContainTitle>
                  <FormItem
                    validateStatus={isOverdueBalanceError ? 'error' : ''}
                    help={isOverdueBalanceError || ''}
                    >
                    {getFieldDecorator('isOverdueBalance', {
                      initialValue:item.isOverdueBalance,
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={1}>是</RadioButton>
                        <RadioButton value={0}>否</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                <SubContain>
                  <SubContainTitle>近2个月内逾期的情况</SubContainTitle>
                  <FormItem
                    validateStatus={isTwoMonthsOverdueError ? 'error' : ''}
                    help={isTwoMonthsOverdueError || ''}
                    >
                    {getFieldDecorator('isTwoMonthsOverdue', {
                      initialValue:item.isTwoMonthsOverdue,
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={1}>是</RadioButton>
                        <RadioButton value={0}>否</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                <SubContain>
                    <SubContainTitle>近3个月内逾期的情况</SubContainTitle>
                    <FormItem
                      validateStatus={isThreeMonthsOverdueError ? 'error' : ''}
                      help={isThreeMonthsOverdueError || ''}
                      >
                      {getFieldDecorator('isThreeMonthsOverdue', {
                        initialValue:item.isThreeMonthsOverdue,
                        rules: [{ required: true}],
                      })(
                        <RadioGroup  size="small">
                          <RadioButton value={1}>是</RadioButton>
                          <RadioButton value={0}>否</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </SubContain>
                <SubContain>
                    <SubContainTitle>近6个月内是否有逾期30天以上的情况</SubContainTitle>
                    <FormItem
                      validateStatus={isSixMonthsOverdueError ? 'error' : ''}
                      help={isSixMonthsOverdueError || ''}
                      >
                      {getFieldDecorator('isSixMonthsOverdue', {
                        initialValue:item.isSixMonthsOverdue,
                        rules: [{ required: true}],
                      })(
                        <RadioGroup  size="small">
                          <RadioButton value={1}>是</RadioButton>
                          <RadioButton value={0}>否</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </SubContain>
                <SubContain>
                    <SubContainTitle>近1年内是否有逾期60天以上的情况</SubContainTitle>
                    <FormItem
                      validateStatus={isOneYearOverdueError ? 'error' : ''}
                      help={isOneYearOverdueError || ''}
                      >
                      {getFieldDecorator('isOneYearOverdue', {
                        initialValue:item.isOneYearOverdue,
                        rules: [{ required: true}],
                      })(
                        <RadioGroup  size="small">
                          <RadioButton value={1}>是</RadioButton>
                          <RadioButton value={0}>否</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </SubContain>
                <SubContain>
                    <SubContainTitle>近2年内是否有逾期90天以上的情况</SubContainTitle>
                    <FormItem
                      validateStatus={isTwoYearsOverdueError ? 'error' : ''}
                      help={isTwoYearsOverdueError || ''}
                      >
                      {getFieldDecorator('isTwoYearsOverdue', {
                        initialValue:item.isTwoYearsOverdue,
                        rules: [{ required: true}],
                      })(
                        <RadioGroup  size="small">
                          <RadioButton value={1}>是</RadioButton>
                          <RadioButton value={0}>否</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </SubContain>
                <SubContain>
                    <SubContainTitle>近5年内是否有逾期120天以上的情况</SubContainTitle>
                    <FormItem
                      validateStatus={isFiveYearsOverdueError ? 'error' : ''}
                      help={isFiveYearsOverdueError || ''}
                      >
                      {getFieldDecorator('isFiveYearsOverdue', {
                        initialValue:item.isFiveYearsOverdue,
                        rules: [{ required: true}],
                      })(
                        <RadioGroup  size="small">
                          <RadioButton value={1}>是</RadioButton>
                          <RadioButton value={0}>否</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </SubContain>
              </div> : null
          }
        </Wrapper>
        <Title>征信查询情况</Title>
        <Wrapper>
          <DoubleInput>
            <Relative >
              <span>近1个月查询次数</span>
              <FormItem
                style={{display:"inline-block"}}
                validateStatus={sumOneMonthQueriesError ? 'error' : ''}
                help={sumOneMonthQueriesError || ''}
                >
                {getFieldDecorator('sumOneMonthQueries', {
                  initialValue:item.sumOneMonthQueries,
                  rules: [{
                     required: true,
                     message:'请输入近1个月查询次数'
                }],
                })(
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                )}
              </FormItem>
              <span>次</span>
            </Relative>
            <Relative >
              <span>近2个月查询次数</span>
              <FormItem
                style={{display:"inline-block"}}
                validateStatus={sumTwoMonthsQueriesError ? 'error' : ''}
                help={sumTwoMonthsQueriesError || ''}
                >
                {getFieldDecorator('sumTwoMonthsQueries', {
                  initialValue:item.sumTwoMonthsQueries,
                  rules: [{
                    required: true,
                    message:'请输入近2个月查询次数'
                  }],
                })(
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                )}
              </FormItem>
              <span>次</span>
            </Relative>
          </DoubleInput>
          <DoubleInput>
            <Relative >
              <span>近3个月查询次数</span>
              <FormItem
                style={{display:"inline-block"}}
                validateStatus={sumThreeMonthsQueriesError ? 'error' : ''}
                help={sumThreeMonthsQueriesError || ''}
                >
                {getFieldDecorator('sumThreeMonthsQueries', {
                  initialValue:item.sumThreeMonthsQueries,
                  rules: [{
                    required: true,
                    message:'请输入近3个月查询次数'
                  }],
                })(
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                )}
              </FormItem>
              <span>次</span>
            </Relative>
            <Relative>
              <span>近6个月查询次数</span>
              <FormItem
                style={{display:"inline-block"}}
                validateStatus={sumSixMonthsQueriesError ? 'error' : ''}
                help={sumSixMonthsQueriesError || ''}
                >
                {getFieldDecorator('sumSixMonthsQueries', {
                  initialValue:item.sumSixMonthsQueries,
                  rules: [{
                    required: true,
                    message:'请输入近6个月查询次数'
                  }],
                })(
                    <input  type="number" min={0} max={1000} style={{width:25}}/>
                )}
              </FormItem>
              <span>次</span>
            </Relative>
          </DoubleInput>
          <DoubleInput>
            <Relative>
              <span>近12个月查询次数</span>
            <FormItem
              style={{display:"inline-block"}}
              validateStatus={sumOneYearQueriesError ? 'error' : ''}
              help={sumOneYearQueriesError || ''}
              >
              {getFieldDecorator('sumOneYearQueries', {
                initialValue:item.sumOneYearQueries,
                rules: [{
                  required: true,
                  message:'请输入近12个月查询次数'
                }],
              })(
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
              )}
            </FormItem>
            <span>次</span>
            </Relative>
            <Help>
              <Red>*</Red>征信查询次数仅计算贷款审批和信用卡审批的查询之和.
            </Help>
          </DoubleInput>
        </Wrapper>
        <div className='btn'>
          <FormItem>
              <Button variant="raised" color="primary" type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>下一步</Button>
          </FormItem>
        </div>
      </Layout>
      <style jsx>{`
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
      </Form>
    )
  }
}


const WrappedMatchStep3 = Form.create()(MatchStep3);

export default withReduxSaga(withRoot(WrappedMatchStep3));
