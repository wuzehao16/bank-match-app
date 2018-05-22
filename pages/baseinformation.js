import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Nolayout';
import { Picker, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { Form } from 'antd';

const FormItem = Form.Item;
const Item = List.Item;
const sex =[
  {
    label:'男',
    value:'0'
  },
  {
    label:'女',
    value:'1'
  },
]
class BaseInformation extends React.PureComponent {
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Layout>
        <WhiteSpace/>
        <List >
          {/* <Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            > */}
          <InputItem
            {...getFieldProps('name')}
            clear
            placeholder="最好使用真实姓名"
          >
            姓名
          </InputItem>
          {/* </Item> */}

          <Picker data={sex} cols={1} {...getFieldProps('sex')} className="forss">
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
          <Picker data={sex} cols={1} {...getFieldProps('birthYear')} className="forss">
            <List.Item arrow="horizontal">出生年份</List.Item>
          </Picker>
        </List>
        <WhiteSpace/>

        <List>
         <InputItem
           {...getFieldProps('education')}
           clear
           placeholder="请填入最高学历"
         >
           最高学历
         </InputItem>
         <InputItem
           {...getFieldProps('autofocus')}
           clear
           placeholder="请填入工作年限"
         >
           工作年限
         </InputItem>
       </List>
       <WhiteSpace/>
       <List>
        <InputItem
          {...getFieldProps('phone')}
          clear
          placeholder="请填入电话号码"
        >
          电话号码
        </InputItem>
        <InputItem
          {...getFieldProps('mail')}
          clear
          placeholder="请填入邮箱"
        >
          邮箱
        </InputItem>
      </List>
      <WhiteSpace/>
      <List>
        <Picker data={sex} cols={1} {...getFieldProps('birthday')} className="forss">
          <List.Item arrow="horizontal">所在城市</List.Item>
        </Picker>
        <Picker data={sex} cols={1} {...getFieldProps('birthday')} className="forss">
          <List.Item arrow="horizontal">在职状态</List.Item>
        </Picker>
      </List>
       <List.Item>
         <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
       </List.Item>
      </Layout>
    )
  }
}
const WrappedBaseInformation = Form.create()(BaseInformation);
export default WrappedBaseInformation;
