import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import withRoot from '../src/withRoot';
import { Radio, Form, Input } from 'antd';
import TextField from 'material-ui/TextField';
import {calculatorfetch} from '../services/calculatorfetch'
import styled from 'styled-components'
const FormItem = Form.Item;


// const SubmitButton = styled(Button)`
//   display:inline-block;
//   background-color: #ee5648;
//   width:160px;
//   height:40px;
//   border-radius:3px;
//   color: #fff;
//   background: ${props => props.main ? 'palevioletred' : 'white'};
// `
const SubmitButton = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? '#ee5648' : '#cacaca'};
  color:#fff;
    width:160px;
   height:40px;
  border: none;
  border-radius: 3px;
`;

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

class CalculatorResult extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    console.log(this.props.content)
    return (
      <table style={{width:'100%'}}>
        <tr>
          <td style={{textAlign:'left'}}>每月月供</td>
          <td style={{textAlign:'right'}}><span style={{color:'#ee5648'}}>{this.props.content.preLoan}</span>元</td>
        </tr>
        <tr>
          <td style={{textAlign:'left'}}>利息总共</td>
          <td style={{textAlign:'right',color:'#646464'}}>{this.props.content.interest}元</td>
        </tr>
        <tr>
          <td style={{textAlign:'left'}}>本息共计</td>
          <td style={{textAlign:'right',color:'#646464'}}>{this.props.content.totalMoney}元</td>
        </tr>
      </table>
    )
  }
}

class Reimbursement extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    // console.log(Object.keys(this.props.content.dataList));
    return (
      <tbody>
        {this.props.content.dataList.map(item => 
          <tr key={item.month}>
           <td>{item.month}</td>
           <td>{item.mreprincipal}</td>
           <td>{item.minterest}</td>
           <td>{item.resPrincipal}</td>
          </tr>        
        )}
      </tbody>
    )
  }
}



TabContainer.propTypes = {
  // children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

class Calculator extends React.Component {
  state = {
    loandata:{
      dataList:[]
    },
    cal:{
      loanmethod: 0,
      repaymentMethod:0
    }
  };

  handleChange = (event, value) => {
    this.state.loandata = {dataList:[]};    
    this.setState({ cal:{loanmethod: value,repaymentMethod:0 }});
  };

  handleChangeIndex = index => {
    this.state.loandata = {dataList:[]};
    this.setState({ cal:{loanmethod: index,repaymentMethod:0 }});
  };

  handleValueChange = name =>event =>{
    this.setState({
      cal:{
        ...this.state.cal,
      [name]: event.target.value,        
      }
    });
  }
  submit = data => e =>{
    var that = this;
    e.preventDefault();
    this.setState({
      cal:{
        ...this.state.cal,
        ...data
      }
    });
    // this.state.loandata = '';
    calculatorfetch({
      ...this.state.cal,
      ...data
    }).then(response => {
      const loandata = response.data;
      this.setState({
        loandata:loandata
      })
    });
  }
  render() {
    const { classes, theme } = this.props;
    console.log(this.state)
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.cal.loanmethod}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="商业贷款"/>
            <Tab label="公积金贷款"/>
            <Tab label="组合贷款"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.cal.loanmethod}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <form className="inputList">
              <div>
                <div className="forminput">
                  <label>商贷金额</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款金额" type="number" min={0} value={this.state.cal.CommercialPrincipal} onChange={this.handleValueChange('CommercialPrincipal')}/>
                    <span>万元</span>
                  </div>
                </div>
                <div className="forminput">
                  <label>商贷期限</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款期限" type="number" min={0} value={this.state.cal.months} onChange={this.handleValueChange('months')}/>
                    <span>月</span>
                  </div>
                </div>
                <div  className="forminput">
                  <label>贷款利率</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款利率" type="number"  min={0} max={3} value={this.state.cal.commercialRate} onChange={this.handleValueChange('commercialRate')}/>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <SubmitButton primary={this.state.cal.repaymentMethod==0?true:false}   onClick={this.submit({repaymentMethod:0})} style={{flex:1,marginRight:12.5}}>等额本息</SubmitButton>
                <SubmitButton   primary={this.state.cal.repaymentMethod==1?true:false}  onClick={this.submit({repaymentMethod:1})} style={{flex:1,marginLeft:12.5}}>等额本金</SubmitButton>
              </div>
            </form>
            {
              this.state.loandata.dataList.length > 0 ?
                <div className="details" >
                  <div className="listname">{this.state.cal.repaymentMethod === 0 ? "[等额本息]" : "[等额本金]"}计算结果</div>
                  <div className="calculatorresult">
                    <CalculatorResult content={this.state.loandata}/>
                  </div>
                  <div className="paydetails">
                    <div className="listname" style={{marginTop:'10px'}}>还款明细</div>
                    <div className="paydetaillist">
                      <table>
                        <thead>
                          <tr>
                            <td>期数</td>
                            <td>本金(元)</td>
                            <td>利息(元)</td>
                            <td>剩余本金(元)</td>
                          </tr>
                        </thead>
                        <Reimbursement content={this.state.loandata}/>
                      </table>
                    </div>

                  </div>
                </div>: null
            }
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <form onSubmit={this.submit} className="inputList">
              <div>
                <div className="forminput">
                  <label>公积金贷款金额</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款金额" min={0} value={this.state.publicPrincipal} onChange={this.handleValueChange('publicPrincipal')}/>
                    <span>万元</span>
                  </div>
                </div>
                <div className="forminput">
                  <label>公积金贷款期限</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款期限" min={0} onChange={this.handleValueChange('months')}/>
                    <span>月</span>
                  </div>
                </div>
                <div className="forminput">
                  <label>公积金贷款利率</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款利率"  min={0} max={3} onChange={this.handleValueChange('accumulationRate')}/>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <SubmitButton primary={this.state.cal.repaymentMethod==0?true:false} onClick={this.submit({repaymentMethod:0})} style={{flex:1,marginRight:12.5}}>等额本息</SubmitButton>
                <SubmitButton primary={this.state.cal.repaymentMethod==1?true:false} onClick={this.submit({repaymentMethod:1})} style={{flex:1,marginLeft:12.5}}>等额本金</SubmitButton>
              </div>  
            </form>
            {
              this.state.loandata.dataList.length > 0 ?
                <div className="details" >
                  <div className="listname">{this.state.cal.repaymentMethod === 0 ? "[等额本息]" : "[等额本金]"}计算结果</div>
                  <div className="calculatorresult">
                    <CalculatorResult content={this.state.loandata}/>
                  </div>
                  <div className="paydetails">
                    <div className="listname" style={{marginTop:'10px'}}>还款明细</div>
                    <div className="paydetaillist">
                      <table>
                        <thead>
                          <tr>
                            <td>期数</td>
                            <td>本金(元)</td>
                            <td>利息(元)</td>
                            <td>剩余本金(元)</td>
                          </tr>
                        </thead>
                        <Reimbursement content={this.state.loandata}/>
                      </table>
                    </div>

                  </div>
                </div>: null
            }
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <form onSubmit={this.submit} className="inputList">
              <div>
                <div className="forminput">
                  <label>商贷金额</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款金额" min={0} onChange={this.handleValueChange('CommercialPrincipal')}/>
                    <span>万元</span>
                  </div>
                </div>
                <div className="forminput">
                  <label>商业贷款利率</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款利率" min={0} max={3}  onChange={this.handleValueChange('commercialRate')}/>
                    <span>%</span>
                  </div>
                </div>
                <div className="forminput">
                  <label>公积金贷款金额</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款金额" min={0} onChange={this.handleValueChange('publicPrincipal')}/>
                    <span>万元</span>
                  </div>
                </div>
                <div className="forminput">
                  <label>公积金贷款利率</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款利率" min={0} max={3} onChange={this.handleValueChange('accumulationRate')}/>
                    <span>%</span>
                  </div>
                </div>
                <div className="forminput">
                  <label>贷款期限</label>
                  <div className="inputright">
                    <input placeholder="请输入贷款期限" min={0} onChange={this.handleValueChange('months')}/>
                    <span>月</span>
                  </div>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <SubmitButton primary={this.state.cal.repaymentMethod==0?true:false} onClick={this.submit({repaymentMethod:0})} style={{flex:1,marginRight:12.5}}>等额本息</SubmitButton>
                <SubmitButton primary={this.state.cal.repaymentMethod==1?true:false} onClick={this.submit({repaymentMethod:1})} style={{flex:1,marginLeft:12.5}}>等额本金</SubmitButton>
              </div>
            </form>
            {
              this.state.loandata.dataList.length > 0 ?
                <div className="details" >
                  <div className="listname">{this.state.cal.repaymentMethod === 0 ? "[等额本息]" : "[等额本金]"}计算结果</div>
                  <div className="calculatorresult">
                    <CalculatorResult content={this.state.loandata}/>
                  </div>
                  <div className="paydetails">
                    <div className="listname" style={{marginTop:'10px'}}>还款明细</div>
                    <div className="paydetaillist">
                      <table>
                        <thead>
                          <tr>
                            <td>期数</td>
                            <td>本金(元)</td>
                            <td>利息(元)</td>
                            <td>剩余本金(元)</td>
                          </tr>
                        </thead>
                        <Reimbursement content={this.state.loandata}/>
                      </table>
                    </div>

                  </div>
                </div>: null
            }
          </TabContainer>
        </SwipeableViews>

        <style jsx>{`
          .details {
            background:#fff;
            padding:10px 0 20px;
            
          }
          .calculatorresult {
            padding:0 17px;
          }
          .details .listname {
            width:100%;
            height:30px;
            font-size:13px;
            line-height:30px;
            border-left: 2px solid #ee5648;
            color: #646464;
            padding-left:15px;
            margin-bottom:10px;
          }
          .calculatorresult table {
            font-size: 12px;
            color: #3c3c3c;
          }
          .calculatorresult table tr {
            height: 31px;
            padding-bottom: 19px;
            border-bottom:1px solid #cacaca

          }
          .calculatorresult table tr:first-child {
            border-bottom: 1px solid #f2f2f2;
          }
          .paydetails .paydetaillist{
            font-size:11px;
            padding:0 17px;
            text-align:center;
          }
          .paydetails thead {
            border-bottom: 1px solid #ee5648;
            height:21px;
            line-height:21px;
            color:#ee5648;
            font-size:11px;
          }
          .paydetails tbody {
            color:#646464;
          }
          .paydetails tbody tr {
            height:24px;
            padding-bottom:15px;
          }
          .paydetaillist  tbody td {
            border-bottom:1px solid #cacaca;
          }
          .paydetails table {
            width:100%;
          }
          body,html {
            padding:0;
            margin:0;
          }
          div,p,ul,ol,li {
            margin:0;
            padding:0;
          }
          .inputList {
            padding: 19px 15px 35px 15px;
            background:#fff;
            margin-bottom:10px;
          }
          .forminput {
            border-bottom: 1px solid #f2f2f2;
            height: 31px;
            margin-bottom: 18px;
            font-size: 12px;
            color: #3c3c3c;
          }
          .forminput:last-child {
            margin-bottom:35px;
          }
          .forminput span {
            font-size:12px;
            line-height:15px;
            color:#646464;
          }
          .inputright {
            display: inline-block;
            text-align:right;
            float:right;
          }
          label {
            display:inline-block;
            font-size:12px;
            height:12px;
            line-height:15px;
            color:#3c3c3c;
          }
          input {
            outline:none;
            border:none;
            font-size:12px;
            width:167px;
            color:#cacaca;
            text-align:right;
            margin-right:10px
          }
        `}
        </style>
      </div>
    );
  }
}

Calculator.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(Calculator));
