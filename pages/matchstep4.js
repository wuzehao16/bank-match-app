import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Radio, Form } from 'antd';
import Layout from '../components/layout';
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
  ${'' /* font-size: 16px; */}
`
const Br = styled.div`
  height: 10px;
`
const Help = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0px;
  z-index: 10;
  font-size: 8px;
`
const Red = styled.span`
  color: #ff2b2b;
`
const DoubleInput = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding: 20px 0 20px 0;
  position: relative;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
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
        this.props.dispatch(saveStep4(values))
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
      <Layout>
        <Topbar position="p3"/>
        <Title>工作收入状况</Title>
        <Wrapper>
          <DoubleInput>
            <FormItem
              validateStatus={unitNameError ? 'error' : ''}
              help={unitNameError || ''}
              >
              {getFieldDecorator('unitName', {
                rules: [{
                  required: true,
                  message:'请输入单位名称'
                }],
              })(
                <div style={{verticalAlign:'bottom'}}>
                  <span>单位名称</span>
                  <input placeholder="请填写社保缴纳单位或工资代发单位"  type="text"style={{width:200,border:'none'}}/>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              validateStatus={specificWorkTimeError ? 'error' : ''}
              help={specificWorkTimeError || ''}
              >
              {getFieldDecorator('specificWorkTime', {
                rules: [{
                  required: true,
                  message:'请输入本单位连续上班月份'
                }],
              })(
                <div >
                  <span>本单位连续上班</span>
                  <input  type="number" min={0} max={1000} style={{width:25}}/>
                  <span>月</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              validateStatus={threeMonthsAvgSalaryError ? 'error' : ''}
              help={threeMonthsAvgSalaryError || ''}
              >
              {getFieldDecorator('threeMonthsAvgSalary',  {
                rules: [{
                  required: true,
                  message:'请输入近3个月税前月均收入'
                }],
              })(
                <div >
                  <span>近3个月税前月均收入</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              validateStatus={SixMonthsAvgSalaryError ? 'error' : ''}
              help={SixMonthsAvgSalaryError || ''}
              >
              {getFieldDecorator('SixMonthsAvgSalary', {
                rules: [{
                  required: true,
                  message:'请输入近6个月税前月均收入'
                }],
              })(
                <div >
                  <span>近6个月税前月均收入</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              validateStatus={thisYearMonthsAvgSalaryError ? 'error' : ''}
              help={thisYearMonthsAvgSalaryError || ''}
              >
              {getFieldDecorator('thisYearMonthsAvgSalary', {
                rules: [{
                  required: true,
                  message:'请输入近12个月税前月均收入'
                }],
              })(
                <div >
                  <span>近12个月税前月均收入</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              validateStatus={lastYearMonthsAvgSalaryError ? 'error' : ''}
              help={lastYearMonthsAvgSalaryError || ''}
              >
              {getFieldDecorator('lastYearMonthsAvgSalary', {
                rules: [{
                  required: true,
                  message:'请输入上一年度税前月均收入'
                }],
              })(
                <div >
                  <span>上一年度税前月均收入</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
            <Help><Red>*</Red>超过现单位上班时长的税前月均收入无需填写，上一年度税前月均收入指自然年(如2017年)</Help>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              validateStatus={specificInsuranceBaseError ? 'error' : ''}
              help={specificInsuranceBaseError || ''}
              >
              {getFieldDecorator('specificInsuranceBase', {
                rules: [{
                  required: true,
                  message:'请输入社保缴纳基数'
                }],
              })(
                <div >
                  <span>社保缴纳基数</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
            <FormItem
              validateStatus={specificInsurancePaymonthError ? 'error' : ''}
              help={specificInsurancePaymonthError || ''}
              >
              {getFieldDecorator('specificInsurancePaymonth', {
                rules: [{
                  required: true,
                  message:'请输入本单位连续缴纳'
                }],
              })(
                <div >
                  <span>本单位连续缴纳</span>
                  <input  type="number" min={0}  style={{width:25}}/>
                  <span>月</span>
                </div>
              )}
            </FormItem>
            <Help><Red>*</Red>若无社保则填0</Help>
          </DoubleInput>
          <SubContain>
            <SubContainTitle>有无养老保险</SubContainTitle>
            <FormItem
              validateStatus={isEndowmentInsuranceError ? 'error' : ''}
              help={isEndowmentInsuranceError || ''}
              >
              {getFieldDecorator('isEndowmentInsurance', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={1}>有</RadioButton>
                  <RadioButton value={0}>无</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
            <SubContainTitle>本单位有无社保基数调整</SubContainTitle>
            <FormItem
              validateStatus={isInsuranceAdjustmentError ? 'error' : ''}
              help={isInsuranceAdjustmentError || ''}
              >
              {getFieldDecorator('isInsuranceAdjustment', {
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
          <SubContain>
            <FormItem
              validateStatus={exInsuranceBaseError ? 'error' : ''}
              help={exInsuranceBaseError || ''}
              >
              {getFieldDecorator('exInsuranceBase', {
                rules: [{
                  required: true,
                  message:'请输入调整前社保缴纳基数'
                }],
              })(
                <div >
                  <span>调整前社保缴纳基数</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
          </SubContain>
          {/* 公积金 */}
          <DoubleInput>
            <FormItem
              validateStatus={specificProvidentFundBaseError ? 'error' : ''}
              help={specificProvidentFundBaseError || ''}
              >
              {getFieldDecorator('specificProvidentFundBase', {
                rules: [{
                  required: true,
                  message:'请输入公积金缴纳基数'
                }],
              })(
                <div >
                  <span>公积金缴纳基数</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
            <FormItem
              validateStatus={specificProvidentFundPaymonthError ? 'error' : ''}
              help={specificProvidentFundPaymonthError || ''}
              >
              {getFieldDecorator('specificProvidentFundPaymonth', {
                rules: [{
                  required: true,
                  message:'请输入本单位连续缴纳月份'
                }],
              })(
                <div >
                  <span>本单位连续缴纳</span>
                  <input  type="number" min={0}  style={{width:25}}/>
                  <span>月</span>
                </div>
              )}
            </FormItem>
            <Help><Red>*</Red>若无公积金则填0</Help>
          </DoubleInput>
          <SubContain>
            <SubContainTitle>本单位有无公积金基数调整</SubContainTitle>
            <FormItem
              validateStatus={isProvidentFundAdjustmentError ? 'error' : ''}
              help={isProvidentFundAdjustmentError || ''}
              >
              {getFieldDecorator('isProvidentFundAdjustment', {
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
          <SubContain>
            <FormItem
              validateStatus={exProvidentFundBaseError ? 'error' : ''}
              help={exProvidentFundBaseError || ''}
              >
              {getFieldDecorator('exProvidentFundBase', {
                rules: [{
                  required: true,
                  message:'请输入调整前公积金缴纳基数'
                }],
              })(
                <div >
                  <span>调整前公积金缴纳基数</span>
                  <input  type="number" min={0}  style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
          </SubContain>
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

MatchStep4.propTypes = {
  classes: PropTypes.object.isRequired,
};
const WrappedMatchStep4 = Form.create()(MatchStep4);

export default withReduxSaga(withRoot(WrappedMatchStep4));
