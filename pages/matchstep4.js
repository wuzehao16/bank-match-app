import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Radio, Form } from 'antd';
import Layout from '../layout/layout';
import Topbar from '../components/Topbar';
// import fetch from '../lib/fetch'
import {withReduxSaga} from '../redux/store'
import { saveStep4 } from '../redux/actions'
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
  font-size:16px;
  @media (min-width:320px) {
    font-size: 14px;
  }
  @media(min-width: 375px) {
    font-size: 16px;
  }
  @media (min-width:360px) {
    font-size: 16px;
  }
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
  padding-bottom: 30px;
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
  z-index: 10;
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
  font-size: 16px;
  color: #646464;
  ${'' /* display: flex;
  justify-content: space-between; */}
`
const NextButton = styled(Button)`
  width: 180px;
  height: 36px;
  border-radius: 4px;
`

const Relative = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`
class MatchStep4 extends React.Component {
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
        this.props.dispatch(saveStep4(values))
      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render () {
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const item = data.matchJson.income || {};

    // Only show error after a field is touched.
    const unitNameError = isFieldTouched('unitName') && getFieldError('unitName');
    const specificWorkTimeError = isFieldTouched('specificWorkTime') && getFieldError('specificWorkTime');
    const threeMonthsAvgSalaryError = isFieldTouched('threeMonthsAvgSalary') && getFieldError('threeMonthsAvgSalary');
    const SixMonthsAvgSalaryError = isFieldTouched('SixMonthsAvgSalary') && getFieldError('SixMonthsAvgSalary');
    const thisYearMonthsAvgSalaryError = isFieldTouched('thisYearMonthsAvgSalary') && getFieldError('thisYearMonthsAvgSalary');
    const specificInsuranceBaseError = isFieldTouched('specificInsuranceBase') && getFieldError('specificInsuranceBase');
    const specificInsurancePaymonthError = isFieldTouched('specificInsurancePaymonth') && getFieldError('specificInsurancePaymonth');
    const isEndowmentInsuranceError = isFieldTouched('isEndowmentInsurance') && getFieldError('isEndowmentInsurance');
    const lastYearMonthsAvgSalaryError = isFieldTouched('lastYearMonthsAvgSalary') && getFieldError('lastYearMonthsAvgSalary');
    const isInsuranceAdjustmentError = isFieldTouched('isInsuranceAdjustment') && getFieldError('isInsuranceAdjustment');
    const exInsuranceBaseError = isFieldTouched('exInsuranceBase') && getFieldError('exInsuranceBase');
    const specificProvidentFundBaseError = isFieldTouched('specificProvidentFundBase') && getFieldError('specificProvidentFundBase');
    const specificProvidentFundPaymonthError = isFieldTouched('specificProvidentFundPaymonth') && getFieldError('specificProvidentFundPaymonth');
    const isProvidentFundAdjustmentError = isFieldTouched('isProvidentFundAdjustment') && getFieldError('isProvidentFundAdjustment');
    const exProvidentFundBaseError = isFieldTouched('exProvidentFundBase') && getFieldError('exProvidentFundBase');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout title="智能匹配">
        <Topbar position="p3" num={data.productNum?data.productNum:0}/>
        <Title>工作收入状况</Title>
        <Wrapper>
          <DoubleInput>
            <div style={{verticalAlign:'bottom',position:'relative'}}>
              <span className="title">单位名称</span>
              <FormItem
                style={{display:"inline-block"}}
                validateStatus={unitNameError ? 'error' : ''}
                help={unitNameError || ''}
                >
                {getFieldDecorator('unitName', {
                  initialValue:item.unitName,
                  rules: [{
                    required: true,
                    message:'请输入单位名称'
                  }],
                })(
                  <input placeholder="请输入" placeholder="请填写社保缴纳单位或工资代发单位"  pattern='[\u4e00-\u9fa5|a-zA-Z]*' title="请输入正确的公司名称" type='string' maxlength={20} type="text"style={{width:260,border:'none'}}/>
                )}
              </FormItem>
            </div>
          </DoubleInput>
          <DoubleInput>
            <Relative >
              <span className="title">本单位连续上班</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={specificWorkTimeError ? 'error' : ''}
                  help={specificWorkTimeError || ''}
                  >
                  {getFieldDecorator('specificWorkTime', {
                    initialValue:item.specificWorkTime,
                    rules: [{
                      required: true,
                      message:'请输入本单位连续上班月份'
                    }],
                  })(
                    <input placeholder="请输入"   type="number" min={0} max={1000} style={{width:100}}/>
                  )}
                </FormItem>
                <span>月</span>
              </span>
            </Relative>
          </DoubleInput>
          <DoubleInput>
            <Relative >
              <span className="title">近3个月税前月均收入</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={threeMonthsAvgSalaryError ? 'error' : ''}
                  help={threeMonthsAvgSalaryError || ''}
                  >
                  {getFieldDecorator('threeMonthsAvgSalary',  {
                    initialValue:item.threeMonthsAvgSalary,
                    rules: [{
                      required: true,
                      message:'请输入近3个月税前月均收入'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </Relative>

          </DoubleInput>
          <DoubleInput>
            <Relative >
              <span className="title">近6个月税前月均收入</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={SixMonthsAvgSalaryError ? 'error' : ''}
                  help={SixMonthsAvgSalaryError || ''}
                  >
                  {getFieldDecorator('SixMonthsAvgSalary', {
                    initialValue:item.SixMonthsAvgSalary,
                    rules: [{
                      required: true,
                      message:'请输入近6个月税前月均收入'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </Relative>
          </DoubleInput>
          <DoubleInput>
            <Relative >
              <span className="title">近12个月税前月均收入</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={thisYearMonthsAvgSalaryError ? 'error' : ''}
                  help={thisYearMonthsAvgSalaryError || ''}
                  >
                  {getFieldDecorator('thisYearMonthsAvgSalary', {
                    initialValue:item.thisYearMonthsAvgSalary,
                    rules: [{
                      required: true,
                      message:'请输入近12个月税前月均收入'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </Relative>
          </DoubleInput>
          <DoubleInput style = {{padding: '20px 0 50px 0'}}>
            <Relative>
              <span className="title">上一年度税前月均收入</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={lastYearMonthsAvgSalaryError ? 'error' : ''}
                  help={lastYearMonthsAvgSalaryError || ''}
                  >
                  {getFieldDecorator('lastYearMonthsAvgSalary', {
                    initialValue:item.lastYearMonthsAvgSalary,
                    rules: [{
                      required: true,
                      message:'请输入上一年度税前月均收入'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </Relative>
            <Help><Red>*</Red>超过现单位上班时长的税前月均收入则填0，上一年度税前月均收入指自然年(如2017年)</Help>
          </DoubleInput>
          <DoubleInput>
            <Relative >
              <span className="title">社保缴纳基数</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={specificInsuranceBaseError ? 'error' : ''}
                  help={specificInsuranceBaseError || ''}
                  >
                  {getFieldDecorator('specificInsuranceBase', {
                    initialValue:item.specificInsuranceBase,
                    rules: [{
                      required: true,
                      message:'请输入社保缴纳基数'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </Relative>
          </DoubleInput>
          <DoubleInput  style = {{padding: '20px 0 30px 0'}}>
            <Relative >
              <span className="title">本单位连续缴纳</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={specificInsurancePaymonthError ? 'error' : ''}
                  help={specificInsurancePaymonthError || ''}
                  >
                  {getFieldDecorator('specificInsurancePaymonth', {
                    initialValue:item.specificInsurancePaymonth,
                    rules: [{
                      required: true,
                      message:'请输入本单位连续缴纳'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0} max={1000} style={{width:100}}/>
                  )}
                </FormItem>
                <span>月</span>
              </span>
            </Relative>
            <Help><Red>*</Red>若无社保则填0</Help>
          </DoubleInput>
          <SubContain>
            <SubContainTitle style={{color:'#646464'}}>有无养老保险</SubContainTitle>
            <FormItem
              validateStatus={isEndowmentInsuranceError ? 'error' : ''}
              help={isEndowmentInsuranceError || ''}
              >
              {getFieldDecorator('isEndowmentInsurance', {
                initialValue:item.isEndowmentInsurance,
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
            getFieldValue('isEndowmentInsurance')==1?
              <div>
                <SubContain>
                  <SubContainTitle  style={{color:'#646464'}}>本单位有无社保基数调整</SubContainTitle>
                  <FormItem
                    validateStatus={isInsuranceAdjustmentError ? 'error' : ''}
                    help={isInsuranceAdjustmentError || ''}
                    >
                    {getFieldDecorator('isInsuranceAdjustment', {
                      initialValue:item.isInsuranceAdjustment,
                      rules: [{ required: true}],
                    })(
                      <RadioGroup  size="small">
                        <RadioButton value={0}>无</RadioButton>
                        <RadioButton value={1}>半年内有</RadioButton>
                        <RadioButton value={2}>一年内有</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                </SubContain>
                {
                  (getFieldValue('isInsuranceAdjustment') == 1 || getFieldValue('isInsuranceAdjustment') == 2)
                    ? <SubContain style={{color:'#646464'}}>
                        <Relative>
                          <span>调整前社保缴纳基数</span>
                          <span>
                            <FormItem
                              style={{display:"inline-block"}}
                              validateStatus={exInsuranceBaseError ? 'error' : ''}
                              help={exInsuranceBaseError || ''}
                              >
                              {getFieldDecorator('exInsuranceBase', {
                                initialValue:item.exInsuranceBase,
                                rules: [{
                                  required: true,
                                  message:'请输入调整前社保缴纳基数'
                                }],
                              })(
                                <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                              )}
                            </FormItem>
                            <span>元</span>
                          </span>
                        </Relative>
                      </SubContain>: null
                }
              </div>
            :null
          }

          {/* 公积金 */}
          <DoubleInput>
            <Relative>
              <span className="title">公积金缴纳基数</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={specificProvidentFundBaseError ? 'error' : ''}
                  help={specificProvidentFundBaseError || ''}
                  >
                  {getFieldDecorator('specificProvidentFundBase', {
                    initialValue:item.specificProvidentFundBase,
                    rules: [{
                      required: true,
                      message:'请输入公积金缴纳基数'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </Relative>
          </DoubleInput>
          <DoubleInput style = {{padding: '20px 0 30px 0'}}>
            <Relative >
              <span className="title">本单位连续缴纳</span>
              <span>
                <FormItem
                  style={{display:"inline-block"}}
                  validateStatus={specificProvidentFundPaymonthError ? 'error' : ''}
                  help={specificProvidentFundPaymonthError || ''}
                  >
                  {getFieldDecorator('specificProvidentFundPaymonth', {
                    initialValue:item.specificProvidentFundPaymonth,
                    rules: [{
                      required: true,
                      message:'请输入本单位连续缴纳月份'
                    }],
                  })(
                    <input placeholder="请输入"  type="number" min={0}  max={1000} style={{width:100}}/>

                  )}
                </FormItem>
                <span>月</span>
              </span>
            </Relative>
            <Help><Red>*</Red>若无公积金则填0</Help>
          </DoubleInput>
          <SubContain>
            <SubContainTitle  style={{color:'#646464'}}>本单位有无公积金基数调整</SubContainTitle>
            <FormItem
              validateStatus={isProvidentFundAdjustmentError ? 'error' : ''}
              help={isProvidentFundAdjustmentError || ''}
              >
              {getFieldDecorator('isProvidentFundAdjustment', {
                initialValue:item.isProvidentFundAdjustment,
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>无</RadioButton>
                  <RadioButton value={1}>半年内有</RadioButton>
                  <RadioButton value={2}>一年内有</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          {
            (getFieldValue('isProvidentFundAdjustment') == 1 || getFieldValue('isProvidentFundAdjustment') == 2)
              ? <SubContain>
                  <Relative style={{color:'#646464'}}>
                    <span>调整前公积金缴纳基数</span>
                    <span>
                      <FormItem
                        style={{display:"inline-block"}}
                        validateStatus={exProvidentFundBaseError ? 'error' : ''}
                        help={exProvidentFundBaseError || ''}
                        >
                        {getFieldDecorator('exProvidentFundBase', {
                          initialValue:item.exProvidentFundBase,
                          rules: [{
                            required: true,
                            message:'请输入调整前公积金缴纳基数'
                          }],
                        })(
                          <input placeholder="请输入"  type="number" min={0}  style={{width:100}}/>
                        )}
                      </FormItem>
                      <span>元</span>
                    </span>
                  </Relative>
                </SubContain>: null
          }
        </Wrapper>
        <div className='btn' style={{marginTop:30}}>
          <FormItem>
              <NextButton variant="raised" color="primary" type="primary" htmltype="submit" disabled={this.hasErrors(getFieldsError())}>下一步</NextButton>
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
         border-bottom-width: 0px;
         border-left-width: 0px;
         font-size: 16px;
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

MatchStep4.propTypes = {
  classes: PropTypes.object.isRequired,
};
const WrappedMatchStep4 = Form.create()(MatchStep4);

export default withReduxSaga(withRoot(WrappedMatchStep4));
