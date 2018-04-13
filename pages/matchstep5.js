import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { Radio, Form } from 'antd';
import Layout from '../layout/layout';
import Topbar from '../components/Topbar';
import {withReduxSaga} from '../redux/store'
import { saveStep5 } from '../redux/actions'
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
  position: relative;
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
  @media (min-width:320px) {
    font-size: 10px;
  }
  @media(min-width: 375px) {
    font-size: 12px;
  }
  @media (min-width:360px) {
    font-size: 12px;
  }
`
const AddButton = styled.div`
    margin: 10px auto;
    border-radius: 26px;
    border: 1px solid #ee5648;
    color: #ee5648;
    width: 100px;
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
const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
let housePropertyUuid = 0;
let businessPolicyUuid = 0;
let carPropertyUuid = 0;
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
    const { getFieldsError } = this.props.form;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(saveStep5(values))
      }
    });
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => {
       return Array.isArray(fieldsError[field])?fieldsError[field][0]:fieldsError[field]
    });
  }
  removeHouseProperty = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const houseProperty = form.getFieldValue('houseProperty');
    // We need at least one passenger
    // if (houseProperty.length === 1) {
    //   return;
    // }
    housePropertyUuid--;
    // can use data-binding to set
    form.setFieldsValue({
      houseProperty: houseProperty.filter(key => key !== k),
    });
  }
  removeBusinessPolicy = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const businessPolicy = form.getFieldValue('businessPolicyArr');
    // We need at least one passenger
    // if (houseProperty.length === 1) {
    //   return;
    // }
    businessPolicyUuid--;
    // can use data-binding to set
    form.setFieldsValue({
      businessPolicyArr: businessPolicy.filter(key => key !== k),
    });
  }
  removeCarProperty = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const carProperty = form.getFieldValue('carProperty');
    // We need at least one passenger
    // if (houseProperty.length === 1) {
    //   return;
    // }
    carPropertyUuid--;
    // can use data-binding to set
    form.setFieldsValue({
      carProperty: carProperty.filter(key => key !== k),
    });
  }
  addHouseProperty = () => {
    const { form } = this.props;
    // can use data-binding to get
    const houseProperty = form.getFieldValue('houseProperty');
    const nextKeys = houseProperty.concat(housePropertyUuid);
    housePropertyUuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      houseProperty: nextKeys,
    });
  }
  addBusinessPolicy = () => {
    const { form } = this.props;
    // can use data-binding to get
    const businessPolicy = form.getFieldValue('businessPolicyArr');
    const nextKeys = businessPolicy.concat(businessPolicyUuid);
    businessPolicyUuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      businessPolicyArr: nextKeys,
    });
  }
  addCarProperty = () => {
    const { form } = this.props;
    // can use data-binding to get
    const carProperty = form.getFieldValue('carProperty');
    const nextKeys = carProperty.concat(carPropertyUuid);
    carPropertyUuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      carProperty: nextKeys,
    });
  }
  render () {
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const item = data.matchJson.assets || {};
    // Only show error after a field is touched.
    const isHousePropertyError = isFieldTouched('isHouseProperty') && getFieldError('isHouseProperty');
    const sumHousePropertyError = isFieldTouched('sumHouseProperty') && getFieldError('sumHouseProperty');
    const sumBusinessPolicyError = isFieldTouched('sumBusinessPolicy') && getFieldError('sumBusinessPolicy');
    const businessPolicyError = isFieldTouched('businessPolicy') && getFieldError('businessPolicy');
    const isFamilyCarError = isFieldTouched('isFamilyCar') && getFieldError('isFamilyCar');
    const sumFamilyCarError = isFieldTouched('sumFamilyCar') && getFieldError('sumFamilyCar');

    // 房产状况
    getFieldDecorator('houseProperty', { initialValue: item.houseProperty||[] });
    const houseProperty = getFieldValue('houseProperty');
    const housePropertyFormItems = houseProperty.map((k, index) => {
      return (
        <Sub
          key={k}
          >
          <DoubleInput>
                <SubTitle>
                  <span>第{k+1}套房产情况</span>
                  {houseProperty.length > 0 ? (
                  <Icon
                    color="primary"
                    disabled={houseProperty.length === 1}
                    onClick={() => this.removeHouseProperty(k)}
                  >
                  remove_circle_outline
                </Icon>
                ) : null}
                </SubTitle>
          </DoubleInput>
          <SubContain
            >
            <SubContainTitle>名下房产属地</SubContainTitle>
            <FormItem
              key={k}
              >
              {getFieldDecorator(`housePropertyDependency[${k}]`, {
                // initialValue:item.housePropertyDependency?item.housePropertyDependency[k]:""
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>深房</RadioButton>
                  <RadioButton value={1}>省内房产</RadioButton>
                  <RadioButton value={2}>省外房产</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain
            >
            <SubContainTitle>产权归属</SubContainTitle>
            <FormItem
              required={false}
              key={k+1}
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
          <SubContain
            >
              <FormItem
                key={k+2}
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
              key={k+4}
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
              key={k+5}
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
              key={k+6}
              >
              {getFieldDecorator(`mortgageBalance[${k}]`, {
              })(
                <div >
                  <span>本笔抵押贷款余额 </span>
                  <Input   type="number" min={0} style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
            <FormItem
              required={false}
              key={k+7}
              >
              {getFieldDecorator(`mortgageMonthRepayment[${k}]`, {
              })(
                <div >
                  <span>每月还款金额</span>
                  <Input   type="number" min={0} style={{width:45}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
          </DoubleInput>
          <DoubleInput>
            <FormItem
              required={false}
              key={k+8}
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
              key={k+9}
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
              key={k+10}
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
              key={k+11}
              >
              {getFieldDecorator(`propertyTotalMarketValue[${k}]`, {
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

    // 商业保单
    getFieldDecorator('businessPolicyArr', { initialValue: [] });
    const businessPolicy = getFieldValue('businessPolicyArr');
    const businessPolicyFormItems = businessPolicy.map((k, index) => {
      return (
        <Sub
          key={k}
          >
          <DoubleInput>
            <SubTitle>
              <span>第{k+1}份保单情况</span>
              {businessPolicy.length > 0 ? (
              <Icon
                color="primary"
                // disabled={businessPolicy.length === 1}
                onClick={() => this.removeBusinessPolicy(k)}
              >
              remove_circle_outline
            </Icon>
            ) : null}
            </SubTitle>
          </DoubleInput>
          <SubContain>
            <SubContainTitle>保单品牌</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`policyBrand[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>中国平安</RadioButton>
                  <RadioButton value={1}>中国人寿</RadioButton>
                  <RadioButton value={2}>新华保险</RadioButton>
                  <RadioButton value={3}>泰康人寿</RadioButton>
                  <RadioButton value={4}>太平保险</RadioButton>
                  <Br/>
                  <RadioButton value={5}>民生保险</RadioButton>
                  <RadioButton value={6}>天安保险</RadioButton>
                  <RadioButton value={7}>华夏人寿</RadioButton>
                  <RadioButton value={8}>中邮人寿</RadioButton>
                  <RadioButton value={9}>友邦保险</RadioButton>
                  <Br/>
                  <RadioButton value={10}>安邦人寿</RadioButton>
                  <RadioButton value={11}>招商信诺</RadioButton>
                  <RadioButton value={12}>工银安盛</RadioButton>
                  <RadioButton value={13}>安联保险</RadioButton>
                  <RadioButton value={14}>中英保险</RadioButton>
                  <Br/>
                  <RadioButton value={15}>阳光保险</RadioButton>
                  <RadioButton value={16}>太平洋保险</RadioButton>
                  <RadioButton value={17}>中国人民人寿</RadioButton>
                  <RadioButton value={18}>富德生命人寿</RadioButton>
                  <RadioButton value={19}>其他</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          {
            getFieldValue(`policyBrand[${k}]`)===19
            ?           <SubContain>
                          <FormItem
                            required={false}
                            >
                            {getFieldDecorator(`policyBrand[${k}]`, {
                            })(
                              <div style={{verticalAlign:'bottom'}}>
                                <span>保单品牌</span>
                                <Input   type="text"style={{width:50}}/>
                              </div>
                            )}
                          </FormItem>
                      </SubContain>:null
          }
          <SubContain>
            <SubContainTitle>保单缴费方式</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`policyBrandPaymentMethod[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>年缴</RadioButton>
                  <RadioButton value={1}>季缴</RadioButton>
                  <RadioButton value={2}>月缴</RadioButton>
                  <RadioButton value={3}>趸缴</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>

          <SubContain>
            <SubContainTitle>保单缴费时长</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`policyPaymentYears[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>1年以下</RadioButton>
                  <RadioButton value={1}>1-2年</RadioButton>
                  <RadioButton value={2}>2-3年</RadioButton>
                  <RadioButton value={3}>3年以上</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`policyPayment[${k}]`, {
              })(
                <div style={{verticalAlign:'bottom'}}>
                  <span>保单年缴费金额 </span>
                  <Input   type="number" min={0} style={{width:50}}/>
                  <span>元</span>
                </div>
              )}
            </FormItem>
            <Help><Red>*</Red>月缴或季缴的需折算成年缴填写金额</Help>
        </SubContain>
        </Sub>
      );
    });

    // 车辆状况
    getFieldDecorator('carProperty', { initialValue: [] });
    const carProperty = getFieldValue('carProperty');
    const carPropertyFormItems = carProperty.map((k, index) => {
      return (
        <Sub
          key={k}
          >
          <DoubleInput>
                <SubTitle>
                  <span>第{k+1}辆汽车状况</span>
                  {carProperty.length > 0 ? (
                  <Icon
                    color="primary"
                    // disabled={businessPolicy.length === 1}
                    onClick={() => this.removeCarProperty(k)}
                  >
                  remove_circle_outline
                </Icon>
                ) : null}
                </SubTitle>
          </DoubleInput>
          <SubContain>
            <SubContainTitle>车辆登记证状态</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`carRegistStatus[${k}]`, {
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>绿本在手</RadioButton>
                  <RadioButton value={1}>银行按揭</RadioButton>
                  <RadioButton value={2}>信用卡形式按揭</RadioButton>
                  <RadioButton value={3}>车贷机构抵押</RadioButton>
                  <Br />
                  <RadioButton value={4}>汽车金融按揭</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
              <FormItem
                required={false}
                >
                {getFieldDecorator(`carPotentialPrice[${k}]`, {
                })(
                  <div style={{verticalAlign:'bottom'}}>
                    <span>车辆残值评估</span>
                    <Input   type="number"style={{width:50}}/>
                    <span>元</span>
                  </div>
                )}
              </FormItem>
          </SubContain>
          {
            (getFieldValue(`carRegistStatus[${k}]`) === 1||getFieldValue(`carRegistStatus[${k}]`) === 2||getFieldValue(`carRegistStatus[${k}]`) === 3||getFieldValue(`carRegistStatus[${k}]`) === 4)
            ? <div>
                      <SubContain>
                          <FormItem
                            required={false}
                            >
                            {getFieldDecorator(`carLoanBalance[${k}]`, {
                            })(
                              <div style={{verticalAlign:'bottom'}}>
                                <span>车辆贷款余额</span>
                                <Input   type="number"style={{width:35}}/>
                                <span>元</span>
                              </div>
                            )}
                          </FormItem>
                      </SubContain>
                      <SubContain>
                          <FormItem
                            required={false}
                            >
                            {getFieldDecorator(`carRepayment[${k}]`, {
                            })(
                              <div style={{verticalAlign:'bottom'}}>
                                <span>车贷月还款金额</span>
                                <Input   type="number"style={{width:35}}/>
                                <span>元</span>
                              </div>
                            )}
                          </FormItem>
                      </SubContain>
                      <SubContain>
                          <FormItem
                            required={false}
                            >
                            {getFieldDecorator(`carrRepaymentMonths[${k}]`, {
                            })(
                              <div style={{verticalAlign:'bottom'}}>
                                <span>车贷已还款月份</span>
                                <Input   type="number"style={{width:35}}/>
                                <span>个月</span>
                              </div>
                            )}
                          </FormItem>
                      </SubContain>
                  </div>:null
          }
        </Sub>
      );
    });
    return (
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
                initialValue: item.isHouseProperty,
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
            getFieldValue('isHouseProperty')===1
            ? <div>
              <DoubleInput>
                <div style={{verticalAlign:'bottom'}}>
                  <span>名下房产数量</span>
                  <FormItem
                    style={{display:'inline-block'}}
                    validateStatus={sumHousePropertyError ? 'error' : ''}
                    help={sumHousePropertyError || ''}
                    >
                    {getFieldDecorator('sumHouseProperty', {
                      initialValue: item.sumHouseProperty,
                      rules: [{
                        required: true,
                        message: '请输入名下房产数量'
                      }],
                    })(
                      <input   type="number"style={{width:35}}/>
                    )}
                  </FormItem>
                  <span>套</span>
                </div>

              </DoubleInput>
              { housePropertyFormItems }
                <AddButton  onClick={this.addHouseProperty} >
                  +新增房产
                </AddButton>
            </div> :null
          }
        </Wrapper>
        <Title>商业保单</Title>
        <Wrapper>
          <Contain>
            <p>名下有无商业保单</p>
            <FormItem
              validateStatus={businessPolicyError ? 'error' : ''}
              help={businessPolicyError || ''}
              >
              {getFieldDecorator('businessPolicy', {
                initialValue: item.businessPolicy,
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
            getFieldValue('businessPolicy') === 1
            ? <div>
              <DoubleInput>
                <div style={{verticalAlign:'bottom'}}>
                  <span>名下保单份数</span>
                  <FormItem
                    style={{display:"inline-block"}}
                    validateStatus={sumBusinessPolicyError ? 'error' : ''}
                    help={sumBusinessPolicyError || ''}
                    >
                    {getFieldDecorator('sumBusinessPolicy', {
                      initialValue: item.sumBusinessPolicy,
                      rules: [{
                        required: true,
                        message: '请输入名下保单份数'
                      }],
                    })(
                      <input   type="number"style={{width:35}}/>
                    )}
                  </FormItem>
                  <span>份</span>
                </div>
              </DoubleInput>
              {businessPolicyFormItems}
              <AddButton  onClick={this.addBusinessPolicy} >
                +新增保单
              </AddButton>
            </div>: null
          }
        </Wrapper>
        <Title>车辆状况</Title>
        <Wrapper>
          <Contain>
            <p>名下有无家用汽车</p>
            <FormItem
              validateStatus={isFamilyCarError ? 'error' : ''}
              help={isFamilyCarError || ''}
              >
              {getFieldDecorator('isFamilyCar', {
                initialValue: item.isFamilyCar,
                rules: [{
                  required: true,
                  message: '请输入名下车辆数量'
                }],
              })(
                <RadioGroup  size="small">
                  <RadioButton value={1}>有</RadioButton>
                  <RadioButton value={0}>无</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Contain>
          {
            getFieldValue('isFamilyCar') ===1
            ? <div>
              <DoubleInput>
                <div style={{verticalAlign:'bottom'}}>
                  <span>名下车辆数量</span>
                  <FormItem
                    style={{display:"inline-block"}}
                    validateStatus={sumFamilyCarError ? 'error' : ''}
                    help={sumFamilyCarError || ''}
                    >
                    {getFieldDecorator('sumFamilyCar', {
                      initialValue: item.sumFamilyCar,
                      rules: [{ required: true}],
                    })(
                      <input   type="number"style={{width:35}}/>
                    )}
                  </FormItem>
                  <span>辆</span>
                </div>
              </DoubleInput>
              {carPropertyFormItems}
              <AddButton  onClick={this.addCarProperty} >
                +新增车产
              </AddButton>
            </div>: null
          }
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

const WrappedMatchStep4 = Form.create()(MatchStep4);

export default withReduxSaga(withRoot(WrappedMatchStep4));
