import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
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
  padding: 0 15px 3px 15px;
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
  color:#646464;
  position: relative;
  background-color: #fff;
  padding: 10px 0 20px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 16x;
`
const Sub = styled.div`
  padding: 0 0 0 5px;
  color: #646464;
`
const SubContainTitle = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
  color:#646464;
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
  font-size: 16px;
  color：#646464;
  ${'' /* display: flex;
  justify-content: space-between; */}
  @media (min-width:320px) {
    font-size: 12px;
  }
  @media(min-width: 375px) {
    font-size: 16px;
  }
  @media (min-width:360px) {
    font-size: 16px;
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
  color: #3c3c3c;
`

const Relative = styled.div`
  position: relative;
`

const NextButton = styled(Button)`
  width: 100%;
  height: 36px;
  border-radius: 4px;
`
const Two = styled.div`
  vertical-align:bottom;
  position:relative;
  color: #3c3c3c;
  display:flex;
  justify-content: space-between;
`
const One = styled.div`
  position:relative;
  display:flex;
  justify-content: space-between;
  input{
   border-color: #878787;
   border-style: solid;
   border-radius:0;
   border-top-width: 0px;
   border-right-width: 0px;
   border-bottom-width: 0px;
   border-left-width: 0px;
   font-size:16px;
   text-align: right;
  }
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
    // this.addHouseProperty();
    // this.addBusinessPolicy();
    // this.addCarProperty();
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
    const total = form.getFieldValue('sumHouseProperty');
    //小于总量
    if(!total || houseProperty.length>= total) return
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
    const total = form.getFieldValue('sumBusinessPolicy');
    if(!total || businessPolicy.length>= total) return
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
    const total = form.getFieldValue('sumFamilyCar');
    if(!total || carProperty.length>= total) return
    const nextKeys = carProperty.concat(carPropertyUuid);
    carPropertyUuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      carProperty: nextKeys,
    });
  }
  // showHouse = (v) =>{
  //   if(v.target.value>0) {
  //     this.addHouseProperty();
  //   }
  // }
  // showBusiness = (v) =>{
  //   if(v.target.value>0) {
  //     this.addBusinessPolicy();
  //   }
  // }
  // showCar = (v) =>{
  //   if(v.target.value>0) {
  //     this.addCarProperty();
  //   }
  // }
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
            <SubContainTitle style={{color: '#646464'}}>名下房产属地</SubContainTitle>
            <FormItem
              key={k}
              >
              {getFieldDecorator(`housePropertyDependency[${k}]`, {
                initialValue:item.housePropertyDependency?item.housePropertyDependency[k]:"",
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
            <SubContainTitle style={{color: '#646464'}}>产权归属</SubContainTitle>
            <FormItem
              required={false}
              key={k+1}
              >
              {getFieldDecorator(`ownership[${k}]`, {
                initialValue:item.ownership?item.ownership[k]:""
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
              <One>
                <span>产权占比</span>
                <span>
                  <FormItem
                    style={{
                      display:"inline-block"
                    }}
                    key={k+2}
                    required={false}
                    >
                    {getFieldDecorator(`propertyRightRatio[${k}]`, {
                      initialValue:item.propertyRightRatio?item.propertyRightRatio[k]:""
                    })(
                        <input placeholder="请输入" type="number" min={0} max={100} style={{width:100,fontSize:'16px'}}/>
                    )}
                  </FormItem>
                  <span>%</span>
                </span>
              </One>
          </SubContain>
          <SubContain>
            <SubContainTitle style={{color: '#646464'}}>房产类型</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`propertyType[${k}]`, {
                initialValue:item.propertyType?item.propertyType[k]:""
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
            <SubContainTitle style={{color: '#646464'}}>房产状态</SubContainTitle>
            <FormItem
              required={false}
              key={k+4}
              >
              {getFieldDecorator(`propertyStatus[${k}]`, {
                initialValue:item.propertyStatus?item.propertyStatus[k]:""
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>红本在手</RadioButton>
                  <RadioButton value={1}>银行按揭</RadioButton>
                  <RadioButton value={2}>银行抵押</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          {
            getFieldValue(`propertyStatus[${k}]`) == 0 ?
              null :<div>
                <SubContain>
                  <SubContainTitle style={{color: '#646464'}}>还款方式</SubContainTitle>
                  <FormItem
                    required={false}
                    key={k+5}
                    >
                    {getFieldDecorator(`repaymentMethod[${k}]`, {
                      initialValue:item.repaymentMethod?item.repaymentMethod[k]:""
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
                  <One>
                    <span>本笔抵押贷款余额 </span>
                    <span>
                      <FormItem
                        required={false}
                        key={k+6}
                        style={{
                          display:"inline-block",
                          color:'#646464'
                        }}
                        >
                          {getFieldDecorator(`mortgageBalance[${k}]`, {
                            initialValue:item.mortgageBalance?item.mortgageBalance[k]:""
                          })(
                            <input placeholder="请输入" type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                          )}
                        </FormItem>
                        <span>元</span>
                    </span>
                  </One>

                </DoubleInput>
                <DoubleInput>
                  <One>
                    <span>每月还款金额</span>
                    <span>
                      <FormItem
                        required={false}
                        key={k+7}
                        style={{
                          display:"inline-block",
                          color:'#646464'
                        }}
                        >
                          {getFieldDecorator(`mortgageMonthRepayment[${k}]`, {
                            initialValue:item.mortgageMonthRepayment?item.mortgageMonthRepayment[k]:""
                          })(
                            <input placeholder="请输入" type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                          )}
                        </FormItem>
                        <span>元</span>
                    </span>
                  </One>
                </DoubleInput>
                <DoubleInput>
                  <One>
                    <span>本笔抵押贷款期限 </span>
                    <span>
                      <FormItem
                        required={false}
                        key={k+8}
                        style={{
                          display:"inline-block",
                          color:'#646464'
                        }}
                        >
                        {getFieldDecorator(`mortgageTerm[${k}]`, {
                          initialValue:item.mortgageTerm?item.mortgageTerm[k]:""

                        })(
                          <input placeholder="请输入" type="number" min={0} max={1000} style={{width:100,fontSize:'16px'}}/>
                        )}
                      </FormItem>
                      <span>月</span>
                    </span>
                  </One>
                </DoubleInput>
                <DoubleInput>
                  <One>
                    <span>已还月份数</span>
                    <span>
                      <FormItem
                        required={false}
                        key={k+9}
                        style={{
                          display:"inline-block",
                          color:'#646464'
                        }}
                        >
                        {getFieldDecorator(`returnedMonths[${k}]`, {
                          initialValue:item.returnedMonths?item.returnedMonths[k]:""
                        })(
                            <input placeholder="请输入" type="number" min={0} max={1000} style={{width:100,fontSize:'16px'}}/>
                        )}
                      </FormItem>
                      <span>月</span>
                    </span>
                  </One>
                </DoubleInput>
              </div>
          }
          <DoubleInput>
            <One>
              <span>本房产总面积</span>
              <span>
                <FormItem
                  required={false}
                  key={k+10}
                  style={{
                    display:"inline-block",
                    color:'#646464'
                  }}
                  >
                  {getFieldDecorator(`propertyTotalArea[${k}]`, {
                    initialValue:item.propertyTotalArea?item.propertyTotalArea[k]:""
                  })(
                      <input placeholder="请输入" type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                  )}
                </FormItem>
                <span>平</span>
              </span>
            </One>
          </DoubleInput>
          <DoubleInput>
            <One>
              <span>本房产总市值</span>
              <span>
                <FormItem
                  required={false}
                  key={k+11}
                  style={{
                    display:"inline-block",
                    color:'#646464'
                  }}
                  >
                  {getFieldDecorator(`propertyTotalMarketValue[${k}]`, {
                    initialValue:item.propertyTotalMarketValue?item.propertyTotalMarketValue[k]:""
                  })(
                      <input placeholder="请输入" type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </One>
          </DoubleInput>
        </Sub>
      );
    });

    // 商业保单
    getFieldDecorator('businessPolicyArr', { initialValue: item.businessPolicyArr||[] } );
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
            <SubContainTitle style={{color: '#646464'}}>保单品牌</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`policyBrand[${k}]`, {
                initialValue:item.policyBrand?item.policyBrand[k]:""
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>中国平安</RadioButton>
                  <RadioButton value={1}>中国人寿</RadioButton>
                  <RadioButton value={2}>新华保险</RadioButton>
                  <RadioButton value={3}>泰康人寿</RadioButton>
                  <RadioButton value={4}>太平保险</RadioButton>
                  <RadioButton value={5}>民生保险</RadioButton>
                  <RadioButton value={6}>天安保险</RadioButton>
                  <RadioButton value={7}>华夏人寿</RadioButton>
                  <RadioButton value={8}>中邮人寿</RadioButton>
                  <RadioButton value={9}>友邦保险</RadioButton>
                  <RadioButton value={10}>安邦人寿</RadioButton>
                  <RadioButton value={11}>招商信诺</RadioButton>
                  <RadioButton value={12}>工银安盛</RadioButton>
                  <RadioButton value={13}>安联保险</RadioButton>
                  <RadioButton value={14}>中英保险</RadioButton>
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
                          <span>保单品牌</span>
                          <FormItem
                            style={{display:'inline-block'}}
                            required={false}
                            >
                            {getFieldDecorator(`otherPolicyBrand[${k}]`, {
                              initialValue:item.otherPolicyBrand?item.otherPolicyBrand[k]:""
                            })(
                                <input placeholder="请输入" maxlength={20} type="text"style={{width:200,fontSize:'16px'}}/>
                            )}
                          </FormItem>
                      </SubContain>:null
          }
          <SubContain>
            <SubContainTitle style={{color: '#646464'}}>保单缴费方式</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`policyBrandPaymentMethod[${k}]`, {
                initialValue:item.policyBrandPaymentMethod?item.policyBrandPaymentMethod[k]:""
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
            <SubContainTitle style={{color: '#646464'}}>保单缴费时长</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`policyPaymentYears[${k}]`, {
                initialValue:item.policyPaymentYears?item.policyPaymentYears[k]:""
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
            <One >
              <span>保单年缴费金额 </span>
              <span>
                <FormItem
                  required={false}
                  style={{color:'#646464',display:'inline-block'}}
                  >
                  {getFieldDecorator(`policyPayment[${k}]`, {
                    initialValue:item.policyPayment?item.policyPayment[k]:""
                  })(

                      <input placeholder="请输入"  type="number" min={0} style={{width:100,fontSize:'16px'}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>
            </One>
            <Help><Red>*</Red>月缴或季缴的需折算成年缴填写金额</Help>
        </SubContain>
        </Sub>
      );
    });

    // 车辆状况
    getFieldDecorator('carProperty', { initialValue: item.carProperty||[] } );
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
            <SubContainTitle style={{color: '#646464'}}>车辆登记证状态</SubContainTitle>
            <FormItem
              required={false}
              >
              {getFieldDecorator(`carRegistStatus[${k}]`, {
                initialValue:item.carRegistStatus?item.carRegistStatus[k]:""
              })(
                <RadioGroup  size="small">
                  <RadioButton value={0}>绿本在手</RadioButton>
                  <RadioButton value={1}>银行按揭</RadioButton>
                  <RadioButton value={2}>信用卡按揭</RadioButton>
                  <RadioButton value={3}>车贷机构抵押</RadioButton>
                  <RadioButton value={4}>汽车金融按揭</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </SubContain>
          <SubContain>
            <One>
              <span>车辆残值评估</span>
              <span>
                <FormItem
                  required={false}
                  style={{color:'#646464',display:'inline-block'}}
                  >
                  {getFieldDecorator(`carPotentialPrice[${k}]`, {
                    initialValue:item.carPotentialPrice?item.carPotentialPrice[k]:""
                  })(
                      <input placeholder="请输入" min={0}type="number"style={{width:100,fontSize:'16px'}}/>
                  )}
                </FormItem>
                <span>元</span>
              </span>

            </One>
          </SubContain>
          {
            (getFieldValue(`carRegistStatus[${k}]`) === 1||getFieldValue(`carRegistStatus[${k}]`) === 2||getFieldValue(`carRegistStatus[${k}]`) === 3||getFieldValue(`carRegistStatus[${k}]`) === 4)
            ? <div>
                      <SubContain>
                        <One>
                          <span>车辆贷款余额</span>
                          <span>

                            <FormItem
                              required={false}
                              style={{color:'#646464',display:'inline-block'}}
                              >
                                {getFieldDecorator(`carLoanBalance[${k}]`, {
                                  initialValue:item.carLoanBalance?item.carLoanBalance[k]:""
                                })(
                                  <input placeholder="请输入" min={0} type="number"style={{width:100,fontSize:'16px'}}/>
                                )}
                              </FormItem>
                              <span>元</span>
                          </span>
                        </One>


                      </SubContain>
                      <SubContain>
                        <One>
                          <span>车贷月还款金额</span>
                          <span>
                            <FormItem
                              required={false}
                              style={{color:'#646464',display:'inline-block'}}
                              >
                                {getFieldDecorator(`carRepayment[${k}]`, {
                                  initialValue:item.carRepayment?item.carRepayment[k]:""
                                })(
                                  <input placeholder="请输入" type="number"  min={0} style={{width:100,fontSize:'16px'}}/>
                                )}
                              </FormItem>
                              <span>元</span>
                          </span>
                        </One>
                      </SubContain>
                      <SubContain>
                        <One>
                          <span>车贷已还款月份</span>
                          <span>
                            <FormItem
                              required={false}
                              style={{color:'#646464',display:'inline-block'}}
                              >
                              {getFieldDecorator(`carrRepaymentMonths[${k}]`, {
                                initialValue:item.carrRepaymentMonths?item.carrRepaymentMonths[k]:""
                              })(
                                  <input placeholder="请输入"   type="number" min={0} max={1000} style={{width:100,fontSize:'16px'}}/>
                              )}
                            </FormItem>
                            <span>月</span>
                          </span>
                        </One>
                      </SubContain>
                  </div>:null
          }
        </Sub>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Layout title="智能匹配">
        <Topbar position="p3" num={data.productNum?data.productNum:0}/>
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
                <Two>
                  <span>名下房产数量</span>
                  <span>
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
                        <input placeholder="请输入"   type="number" min={0} style={{width:100,fontSize:'16px'}} />
                      )}
                    </FormItem>
                    <span>套</span>
                  </span>
                </Two>

              </DoubleInput>
              { housePropertyFormItems }
                <AddButton  onClick={this.addHouseProperty} >
                  + 新增房产
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
                <Two>
                  <span>名下保单份数</span>
                  <span>
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
                        <input placeholder="请输入"   type="number" min={0} style={{width:100,fontSize:'16px'}} />
                      )}
                    </FormItem>
                    <span>份</span>
                  </span>
                </Two>
              </DoubleInput>
              {businessPolicyFormItems}
              <AddButton  onClick={this.addBusinessPolicy} >
                + 新增保单
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
                <Two>
                  <span>名下车辆数量</span>
                  <span>
                    <FormItem
                      style={{display:"inline-block"}}
                      validateStatus={sumFamilyCarError ? 'error' : ''}
                      help={sumFamilyCarError || ''}
                      >
                      {getFieldDecorator('sumFamilyCar', {
                        initialValue: item.sumFamilyCar,
                        rules: [{
                          required: true,
                          message: '请输入名下车辆数量'
                        }],
                      })(
                        <input placeholder="请输入" type="number" min={0} style={{width:100,fontSize:'16px'}} />
                      )}
                    </FormItem>
                    <span>辆</span>
                  </span>
                </Two>
              </DoubleInput>
              {carPropertyFormItems}
              <AddButton  onClick={this.addCarProperty} >
                + 新增车产
              </AddButton>
            </div>: null
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
         outline:none;
         border-color: #878787;
         border-style: solid;
         border-radius:0;
         border-top-width: 0px;
         border-right-width: 0px;
         border-bottom-width: 0px;
         border-left-width: 0px;
         font-size:16px;
        }
        .second-level{
          color: #646464;
        }
      `}
      </style>
      </Form>
    )
  }
}

const WrappedMatchStep4 = Form.create()(MatchStep4);

export default withReduxSaga(withRoot(WrappedMatchStep4));
