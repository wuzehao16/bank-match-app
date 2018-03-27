import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Router from 'next/router'
import Button from 'material-ui/Button';
import { Radio, Form } from 'antd';
import Layout from '../components/layout';
import Topbar from '../components/Topbar';
import fetch from '../lib/fetch'
import { createMuiTheme, withStyles, MuiThemeProvider } from 'material-ui/styles';
import red from 'material-ui/colors/red';

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
        Router.push({
          pathname: '/matchstep3',
        })
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
    const ageError = isFieldTouched('age') && getFieldError('age');
    const maritalStatusError = isFieldTouched('maritalStatus') && getFieldError('maritalStatus');
    const specificAgeError = isFieldTouched('specificAge') && getFieldError('specificAge');
    const locationError = isFieldTouched('location') && getFieldError('location');
    const educationError = isFieldTouched('education') && getFieldError('education');
    const occupationError = isFieldTouched('occupation') && getFieldError('occupation');
    const unitPropertyError = isFieldTouched('unitProperty') && getFieldError('unitProperty');
    const salaryDistributionError = isFieldTouched('salaryDistribution') && getFieldError('salaryDistribution');
    const workTimeError = isFieldTouched('workTime') && getFieldError('workTime');
    const monthAvgSalaryError = isFieldTouched('monthAvgSalary') && getFieldError('monthAvgSalary');
    const isInsuranceError = isFieldTouched('isInsurance') && getFieldError('isInsurance');
    const insuranceBaseError = isFieldTouched('insuranceBase') && getFieldError('insuranceBase');
    const insurancePaymonthError = isFieldTouched('insurancePaymonth') && getFieldError('insurancePaymonth');
    const isProvidentFundError = isFieldTouched('isProvidentFund') && getFieldError('isProvidentFund');
    const providentFundBaseError = isFieldTouched('providentFundBase') && getFieldError('providentFundBase');
    const providentFundPaymonthError = isFieldTouched('providentFundPaymonth') && getFieldError('providentFundPaymonth');
    const licenseRegistTimeError = isFieldTouched('licenseRegistTime') && getFieldError('licenseRegistTime');
    const invoiceValueError = isFieldTouched('invoiceValue') && getFieldError('invoiceValue');
    const shareRatioError = isFieldTouched('shareRatio') && getFieldError('shareRatio');
    const isLegalPersonError = isFieldTouched('isLegalPerson') && getFieldError('isLegalPerson');
    const isPhoneCallError = isFieldTouched('isPhoneCall') && getFieldError('isPhoneCall');
    const isInvestigateError = isFieldTouched('isInvestigate') && getFieldError('isInvestigate');
    return (
      <MuiThemeProvider theme={theme}>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout>
        <Topbar position="p1"/>
        <Title>个人信息</Title>
        <Wrapper>
          <Contain>
            <p>年龄</p>
            <FormItem
              validateStatus={ageError ? 'error' : ''}
              help={ageError || ''}
              >
              {getFieldDecorator('age', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>18岁以下</RadioButton>
                  <RadioButton value={1}>18-24</RadioButton>
                  <RadioButton value={2}>25-55</RadioButton>
                  <RadioButton value={3}>55以上</RadioButton>
                </RadioGroup>
              )}
            </FormItem>

          </Contain>
          {
            (getFieldValue('age') ===0||getFieldValue('age') ===1||getFieldValue('age') ===3)
              ?           <SubContain>
                          <FormItem
                            validateStatus={specificAgeError ? 'error' : ''}
                            help={specificAgeError || ''}
                            >
                            {getFieldDecorator('specificAge', {
                              rules: [{ required: true}],
                            })(
                              <div >
                                <span>具体年龄</span>
                                <input  type="number" min={0} max={100} style={{width:30}}/>
                                <span>岁</span>
                              </div>
                            )}
                          </FormItem>
                        </SubContain> : null
          }

          <Contain>
            <p>婚姻状况</p>
            <FormItem
              validateStatus={maritalStatusError ? 'error' : ''}
              help={maritalStatusError || ''}
              >
              {getFieldDecorator('maritalStatus', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>已婚</RadioButton>
                  <RadioButton value={1}>未婚</RadioButton>
                  <RadioButton value={2}>离异</RadioButton>
                  <RadioButton value={3}>丧偶</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
          {
            getFieldValue('maritalStatus') === 0
              ?     <SubContain>
                      <SubContainTitle>配偶是否同意贷款</SubContainTitle>
                      <FormItem
                        validateStatus={maritalStatusError ? 'error' : ''}
                        help={maritalStatusError || ''}
                        >
                        {getFieldDecorator('isAgreeLoan', {
                          rules: [{ required: true}],
                        })(
                          <RadioGroup  size="small">
                            <RadioButton value={1}>是</RadioButton>
                            <RadioButton value={0}>否</RadioButton>
                          </RadioGroup>
                        )}
                      </FormItem>
                    </SubContain>: null
          }
          <Contain>
            <p>户籍所在地</p>
            <FormItem
              validateStatus={locationError ? 'error' : ''}
              help={locationError || ''}
              >
              {getFieldDecorator('location', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>深户</RadioButton>
                  <RadioButton value={1}>非深户</RadioButton>
                  <RadioButton value={2}>港澳台</RadioButton>
                  <RadioButton value={3}>外籍</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
          <Contain>
            <p>学历</p>
            <FormItem
              validateStatus={educationError ? 'error' : ''}
              help={educationError || ''}
              >
              {getFieldDecorator('education', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>全日制本科及以上</RadioButton>
                  <RadioButton value={1}>全日制大专</RadioButton>
                  <RadioButton value={2}>高中及以下</RadioButton>
                  <RadioButton value={3}>其他(自考/函授)</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
        </Wrapper>
        <Title>工作情况</Title>
        <Wrapper>
          <Contain>
            <p>职业类别（可多选）</p>
            <FormItem
              validateStatus={occupationError ? 'error' : ''}
              help={occupationError || ''}
              >
              {getFieldDecorator('occupation', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>工薪族</RadioButton>
                  <RadioButton value={1}>企业主</RadioButton>
                  <RadioButton value={2}>工薪族和企业主</RadioButton>
                  <RadioButton value={3}>自由职业</RadioButton>
                </RadioGroup>
              )}
            </FormItem>

          </Contain>
          {
            (getFieldValue("occupation") ===0||getFieldValue("occupation") ===2)
            ?  <div>
                <SubContain>
                  <SubContainTitle>单位性质</SubContainTitle>
                  <FormItem
                    validateStatus={unitPropertyError ? 'error' : ''}
                    help={unitPropertyError || ''}
                    >
                    {getFieldDecorator('unitProperty', {
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>教师医生(公立)</RadioButton>
                        <RadioButton value={1}>公务员</RadioButton>
                        <RadioButton value={2}>事业单位</RadioButton>
                        <RadioButton value={3}>高新企业</RadioButton>
                        <Br />
                        <RadioButton value={4}>主板上市公司</RadioButton>
                        <RadioButton value={5}>普通企业</RadioButton>
                        <RadioButton value={6}>上市公司</RadioButton>
                        <RadioButton value={7}>世界500强</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                <SubContain>
                  <SubContainTitle>工资发放方式</SubContainTitle>
                  <FormItem
                    validateStatus={salaryDistributionError ? 'error' : ''}
                    help={salaryDistributionError || ''}
                    >
                    {getFieldDecorator('salaryDistribution', {
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>扣税代发</RadioButton>
                        <RadioButton value={1}>固定转账</RadioButton>
                        <RadioButton value={2}>现金发放</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                <SubContain>
                  <SubContainTitle>现单位上班时长</SubContainTitle>
                  <FormItem
                    validateStatus={workTimeError ? 'error' : ''}
                    help={workTimeError || ''}
                    >
                    {getFieldDecorator('workTime', {
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>3个月以下</RadioButton>
                        <RadioButton value={1}>3-6个月</RadioButton>
                        <RadioButton value={2}>6-12个月</RadioButton>
                        <RadioButton value={3}>12-24个月</RadioButton>
                        <RadioButton value={4}>24个月以上</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                <SubContain>
                  <SubContainTitle>现单位月均工资</SubContainTitle>
                  <FormItem
                    validateStatus={monthAvgSalaryError ? 'error' : ''}
                    help={monthAvgSalaryError || ''}
                    >
                    {getFieldDecorator('monthAvgSalary', {
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>4千以下</RadioButton>
                        <RadioButton value={1}>4-5千</RadioButton>
                        <RadioButton value={2}>5-6千</RadioButton>
                        <RadioButton value={3}>6-8千</RadioButton>
                        <RadioButton value={4}>8千-1万</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                <SubContain>
                  <SubContainTitle>社保有无缴纳</SubContainTitle>
                  <FormItem
                    validateStatus={isInsuranceError ? 'error' : ''}
                    help={isInsuranceError || ''}
                    >
                    {getFieldDecorator('isInsurance', {
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={1}>有</RadioButton>
                        <RadioButton value={0}>无</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                {
                  getFieldValue('isInsurance') === 1
                    ? <div>
                        <SubContain>
                          <SubContainTitle>现单位社保连续缴纳时长</SubContainTitle>
                          <FormItem
                            validateStatus={insurancePaymonthError ? 'error' : ''}
                            help={insurancePaymonthError || ''}
                            >
                            {getFieldDecorator('insurancePaymonth', {
                              rules: [{ required: true}],
                            })(
                              <RadioGroup  size="small">
                                <RadioButton value={0}>3个月以下</RadioButton>
                                <RadioButton value={1}>3-6个月</RadioButton>
                                <RadioButton value={2}>6-12个月</RadioButton>
                                <RadioButton value={3}>12-24个月</RadioButton>
                                <RadioButton value={4}>24个月以上</RadioButton>
                              </RadioGroup>
                            )}
                          </FormItem>
                        </SubContain>
                        <SubContain>
                          <SubContainTitle>现单位社保缴纳基数</SubContainTitle>
                          <FormItem
                            validateStatus={insuranceBaseError ? 'error' : ''}
                            help={insuranceBaseError || ''}
                            >
                            {getFieldDecorator('insuranceBase', {
                              rules: [{ required: true}],
                            })(
                              <RadioGroup  size="small">
                                <RadioButton value={0}>4千以下</RadioButton>
                                <RadioButton value={1}>4-5千</RadioButton>
                                <RadioButton value={2}>5-6千</RadioButton>
                                <RadioButton value={3}>6-8千</RadioButton>
                                <RadioButton value={4}>8千-1万</RadioButton>
                              </RadioGroup>
                            )}
                          </FormItem>
                        </SubContain>
                      </div> : null
                }

                <SubContain>
                  <SubContainTitle>公积金有无缴纳</SubContainTitle>
                  <FormItem
                    validateStatus={isProvidentFundError ? 'error' : ''}
                    help={isProvidentFundError || ''}
                    >
                    {getFieldDecorator('isProvidentFund', {
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={1}>有</RadioButton>
                        <RadioButton value={0}>无</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                {
                  getFieldValue('isProvidentFund') === 1
                    ? <div>
                      <SubContain>
                        <SubContainTitle>现单位公积金缴纳基数</SubContainTitle>
                        <FormItem
                          validateStatus={providentFundBaseError ? 'error' : ''}
                          help={providentFundBaseError || ''}
                          >
                          {getFieldDecorator('providentFundBase', {
                            rules: [{ required: true}],
                          })(
                            <RadioGroup  size="small">
                              <RadioButton value={0}>4千以下</RadioButton>
                              <RadioButton value={1}>4-5千</RadioButton>
                              <RadioButton value={2}>5-6千</RadioButton>
                              <RadioButton value={3}>6-8千</RadioButton>
                              <RadioButton value={4}>8千-1万</RadioButton>
                            </RadioGroup>
                          )}
                        </FormItem>
                      </SubContain>
                      <SubContain>
                        <SubContainTitle>现单位公积金连续缴纳时长</SubContainTitle>
                        <FormItem
                          validateStatus={providentFundPaymonthError ? 'error' : ''}
                          help={providentFundPaymonthError || ''}
                          >
                          {getFieldDecorator('providentFundPaymonth', {
                            rules: [{ required: true}],
                          })(
                            <RadioGroup  size="small">
                              <RadioButton value={0}>3个月以下</RadioButton>
                              <RadioButton value={1}>3-6个月</RadioButton>
                              <RadioButton value={2}>6-12个月</RadioButton>
                              <RadioButton value={3}>12-24个月</RadioButton>
                              <RadioButton value={4}>24个月以上</RadioButton>
                            </RadioGroup>
                          )}
                        </FormItem>
                      </SubContain>
                    </div> :null
                }
                <SubContain>
                  <SubContainTitle>本地营业执照注册时长</SubContainTitle>
                  <FormItem
                    validateStatus={licenseRegistTimeError ? 'error' : ''}
                    help={licenseRegistTimeError || ''}
                    >
                    {getFieldDecorator('licenseRegistTime', {
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>暂未注册</RadioButton>
                        <RadioButton value={1}>3个月以下</RadioButton>
                        <RadioButton value={2}>3-6个月</RadioButton>
                        <RadioButton value={3}>6-12个月</RadioButton>
                        <Br />
                        <RadioButton value={4}>12-24个月</RadioButton>
                        <RadioButton value={5}>24个月以上</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
              </div>:null
          }
          {
            (getFieldValue("occupation")===1||getFieldValue("occupation") ===2)
            ?  <div>
                <SubContain>
                  <SubContainTitle>企业一年开票金额</SubContainTitle>
                 <FormItem
                   validateStatus={invoiceValueError ? 'error' : ''}
                   help={invoiceValueError || ''}
                   >
                   {getFieldDecorator('invoiceValue', {
                     rules: [{ required: true}],
                   })(
                     <RadioGroup  size="small">
                       <RadioButton value={0}>2万以下</RadioButton>
                       <RadioButton value={1}>2-10万</RadioButton>
                       <RadioButton value={2}>10-50万</RadioButton>
                       <RadioButton value={3}>100万以上</RadioButton>
                     </RadioGroup>
                   )}
                 </FormItem>
               </SubContain>
                <SubContain>
                  <SubContainTitle>股份占比</SubContainTitle>
                 <FormItem
                   validateStatus={shareRatioError ? 'error' : ''}
                   help={shareRatioError || ''}
                   >
                   {getFieldDecorator('shareRatio', {
                     rules: [{ required: true}],
                   })(
                     <RadioGroup  size="small">
                       <RadioButton value={0}>0%</RadioButton>
                       <RadioButton value={1}>0-10%</RadioButton>
                       <RadioButton value={2}>10-20%</RadioButton>
                       <RadioButton value={3}>20%以上</RadioButton>
                     </RadioGroup>
                   )}
                 </FormItem>
               </SubContain>
               <SubContain>
                 <SubContainTitle>是否法人</SubContainTitle>
                 <FormItem
                   validateStatus={isLegalPersonError ? 'error' : ''}
                   help={isLegalPersonError || ''}
                   >
                   {getFieldDecorator('isLegalPerson', {
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
                 <SubContainTitle>单位座机是否能正常接听</SubContainTitle>
                 <FormItem
                   validateStatus={isPhoneCallError ? 'error' : ''}
                   help={isPhoneCallError || ''}
                   >
                   {getFieldDecorator('isPhoneCall', {
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
                 <SubContainTitle>公司是否方便实地考察</SubContainTitle>
                 <FormItem
                   validateStatus={isInvestigateError ? 'error' : ''}
                   help={isInvestigateError || ''}
                   >
                   {getFieldDecorator('isInvestigate', {
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

MatchStep1.propTypes = {
  classes: PropTypes.object.isRequired,
};
const WrappedMatchStep1 = Form.create()(MatchStep1);

export default withStyles(styles)(WrappedMatchStep1);
