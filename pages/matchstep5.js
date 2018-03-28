import React from 'react'
import Link from 'next/link'
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
  padding: 10px 0 20px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 12px;
`
const Sub = styled.div`
  padding: 0 13px;
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
const AddButton = styled.div`
    margin: 10px auto;
    border-radius: 26px;
    border: 1px solid #ee5648;
    color: #ee5648;
    width: 84px;
    padding: 3px 8px;
`
const Input = styled.input`
    border-color: #878787;
    border-style: solid;
    border-radius:0;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px
`
let uuid = 0;
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
      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  removeHouseProperty = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const houseProperty = form.getFieldValue('houseProperty');
    // We need at least one passenger
    if (houseProperty.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      houseProperty: houseProperty.filter(key => key !== k),
    });
  }

  addHouseProperty = () => {
    const { form } = this.props;
    // can use data-binding to get
    const houseProperty = form.getFieldValue('houseProperty');
    const nextKeys = houseProperty.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      houseProperty: nextKeys,
    });
  }
  render () {
    const { classes } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const isHousePropertyError = isFieldTouched('isHouseProperty') && getFieldError('isHouseProperty');
    const sumHousePropertyError = isFieldTouched('sumHouseProperty') && getFieldError('sumHouseProperty');

    getFieldDecorator('houseProperty', { initialValue: [] });
    const houseProperty = getFieldValue('houseProperty');
    const housePropertyFormItems = houseProperty.map((k, index) => {
      return (
        <Sub>
          <DoubleInput>
                <div>
                  <span>第{k+1}套房产情况</span>
                </div>
          </DoubleInput>
          <SubContain>
            <SubContainTitle>名下房产属地</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`housePropertyDependency[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>深房</RadioButton>
                  <RadioButton value={1}>省内房产</RadioButton>
                  <RadioButton value={2}>省内房产</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
            <SubContainTitle>产权归属</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`ownership[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>本人</RadioButton>
                  <RadioButton value={1}>配偶</RadioButton>
                  <RadioButton value={2}>子女</RadioButton>
                  <RadioButton value={3}>父母</RadioButton>
                  <RadioButton value={4}>联名房</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
              <FormItem
                required={false}
                >
                {getFieldDecorator(`propertyRightRatio[${k}]`, {
                })(
                  <div style={{verticalAlign:'bottom'}}>
                    <span>产权占比</span>
                    <Input   type="number"style={{width:35}}/>
                    <span>%</span>
                  </div>
                )}
              </FormItem>
          </SubContain>
          <SubContain>
            <SubContainTitle>房产类型</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`propertyType[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>住宅</RadioButton>
                  <RadioButton value={1}>公寓</RadioButton>
                  <RadioButton value={2}>商铺</RadioButton>
                  <RadioButton value={3}>写字楼</RadioButton>
                  <RadioButton value={4}>自建房</RadioButton>
                  <RadioButton value={5}>厂房</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
            <SubContainTitle>房产状态</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`propertyStatus[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>红本在手</RadioButton>
                  <RadioButton value={1}>银行按揭</RadioButton>
                  <RadioButton value={2}>银行抵押</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
            <SubContainTitle>还款方式</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`repaymentMethod[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>等额本息</RadioButton>
                  <RadioButton value={1}>先息后本</RadioButton>
                  <RadioButton value={2}>随借随还</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <DoubleInput>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`mortgageBalance[${k}]`, {
              })(
                <div >
                  <span>本笔抵押贷款余额 </span>
                  <Input   type="number" min={0} style={{width:40}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`mortgageMonthRepayment[${k}]`, {
              })(
                <div >
                  <span>每月还款金额</span>
                  <Input   type="number" min={0} style={{width:35}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`mortgageTerm[${k}]`, {
              })(
                <div >
                  <span>本笔抵押贷款期限 </span>
                  <Input   type="number" min={0} style={{width:40}}/>
                  <span>月</span>
                </div>
              )}
            </FormItem>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`returnedMonths[${k}]`, {
              })(
                <div >
                  <span>已还月份数</span>
                  <Input   type="number" min={0} style={{width:35}}/>
                  <span>月</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`propertyTotalArea[${k}]`, {
              })(
                <div >
                  <span>本房产总面积</span>
                  <Input   type="number" min={0} style={{width:40}}/>
                  <span>平</span>
                </div>
              )}
            </FormItem>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`returnedMonths[${k}]`, {
              })(
                <div >
                  <span>本房产总市值</span>
                  <Input   type="number" min={0} style={{width:35}}/>
                  <span>万元</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
        </Sub>
      );
    });
    return (
      <MuiThemeProvider theme={theme}>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout>
        <Topbar position="p3"/>
        <Title>房产状况</Title>
        <Wrapper>
          <Contain>
            <p>名下有无房产</p>
            <FormItem
              validateStatus={isHousePropertyError ? 'error' : ''}
              help={isHousePropertyError || ''}
              >
              {getFieldDecorator('isHouseProperty', {
                rules: [{ required: true}],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>有</RadioButton>
                  <RadioButton value={1}>无</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
          <DoubleInput>
            <FormItem
              validateStatus={sumHousePropertyError ? 'error' : ''}
              help={sumHousePropertyError || ''}
              >
              {getFieldDecorator('sumHouseProperty', {
                rules: [{ required: true}],
              })(
                <div style={{verticalAlign:'bottom'}}>
                  <span>名下房产数量</span>
                  <input   type="number"style={{width:35}}/>
                  <span>套</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          { housePropertyFormItems }
          <FormItem>
            <AddButton  onClick={this.addHouseProperty} >
              + 新增房产
            </AddButton>
          </FormItem>
        </Wrapper>
        <Title>商业保单</Title>
        <Wrapper>
          <DoubleInput>
            <FormItem
              validateStatus={sumHousePropertyError ? 'error' : ''}
              help={sumHousePropertyError || ''}
              >
              {getFieldDecorator('sumHouseProperty', {
                rules: [{ required: true}],
              })(
                <div style={{verticalAlign:'bottom'}}>
                  <span>保单份数</span>
                  <input   type="number"style={{width:35}}/>
                  <span>份</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
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

export default withStyles(styles)(WrappedMatchStep4);
