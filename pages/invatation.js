import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import md5 from 'blueimp-md5'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Layout from '../layout/Blanklayout';
import withRoot from '../src/withRoot';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { getCaptcha, register } from '../services/invatation'
import SimpleSnackbar from '../components/Snackbars'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 3 * theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  card: {
    minWidth: 275,
    marginTop: 30 * theme.spacing.unit,
    marginLeft: 3 * theme.spacing.unit,
    marginRight:3 * theme.spacing.unit,

  },
  menu: {
    width: 200,
  },
  button:{
    width: '40%',
    margin: '50px auto',
  },
  dialogButton:{
    margin:'0 auto',
  }
});
const Wrapper = styled.div`
  background: url(static/invatation.jpg);
  background-size: cover;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`
const Content = styled.div`
  margin: 0 auto;
  margin-top:80%;
  width:270px;
  height:330px;
  background:#ff6600;
  border-radius:20px;
  position: relative;
`
const Header = styled.div`
  height: 65px;
  width: 65px;
  background-image: url(static/invitation_avatar.png);
  background-size: 100% 100%;
  margin-top: -32px;
`
const GetCaptcha = styled(Button)`
  border: 0;
  color: white;
  height: 20px;
`;
const Title = styled.div`
  text-align: center;
  margin-top: 10px;
`
class Invatation extends React.PureComponent {
  static async getInitialProps ({ query }) {
    // eslint-disable-next-line no-undef
    return { query: query }
  }
  state = {
    phone:'',
    loginPassord:'',
    count: 0,
    showPassword: false,
    open: false,
    error:'',
    dialogOpen:false
  }
  componentDidMount () {
    this.setState({
      userId: this.props.query.userId,
      userName: this.props.query.userName
    })
  }
  handleChange = name => event =>{
    this.setState({
      [name]:event.target.value
    })
  }
  getCaptcha = () => {
    var regex = /^1\d{10}$/;
    if (regex.test(this.state.phone)) {
    } else {
      this.setState({
        error:'请输入正确的手机号码！',
        open:true
      });
      console.log("zq")
      return
    }
    getCaptcha({
      method:2,
      phone:this.state.phone,
    }).then(res => {
      if(res.code ==0){

      } else{
        this.setState({
          error:res.msg,
          open:true
        });
      }
    })
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }
  handleClick = () => {
    this.setState({ open: true });
  };
  handleDialogClick = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };
  handleDialogClose = (event, reason) => {
    this.setState({ dialogOpen: false });
  };
  toDownload = () => {
    Router.push({
      pathname:'/download',
    })
  }
  checkPass = (s) => {
    if (s.length < 6 ||s.length > 24) {
      return 0;
    }
    let ls = 0;
    if (s.match(/([a-z])+/)) {
      ls += 1;
    }
    if (s.match(/([0-9])+/)) {
      ls += 1;
    }
    if (s.match(/([A-Z])+/)) {
      ls += 1;
    }
    if (s.match(/[^a-zA-Z0-9]+/)) {
      ls += 1;
    }
    return ls
  }
  submit = e =>{
    e.preventDefault();
    console.log(this.state)
    if (this.checkPass(this.state.loginPassord) < 2) {
      this.setState({
        error:'请输入6-24位数字与字母组合',
        open:true
      });
      return
    }
    const data = {
      ...this.state,
      loginPassord: md5(this.state.loginPassord + 'leoansReview')
    }
    register(data).then(res => {
      if(res.code ==0){
        this.handleDialogClick();

      } else{

        this.setState({
          error:res.msg,
          open:true
        });
      }
    })
  }
  render() {
    const {classes} = this.props;
    const { count } = this.state;
    return (
      <Layout title="邀请好友">
        <Wrapper>
          <div className="inv-top-detail">
    				<div className="inv-top-poster text-center font-white">
    					<img className="inv-top-deil--avart" src="/static/invitation_avatar.png"/>
    					<p style={{color:'#fff',fontSize:'15px'}}>您的好友&nbsp;<span>{this.state.userName}</span></p>
    					<p style={{color:'#fff',fontSize:'15px'}}>诚挚邀请您成为正式经纪人</p>
    				</div>
    				<form onSubmit={this.submit} className="inv-bottom-form">
    					<div className="form-item">
    						<div className="form-item-prepend">
    							<img className="inv-bottom-form--icon" src="static/main_icon_phone.png" />
    						</div>
    						<input value={this.state.phone}
                              onChange={this.handleChange('phone')}  name="mobile" placeholder="请输入您的手机号码" type="number" />
    					</div>
    					<div className="form-item">
    						<div className="form-item-prepend">
    							<img className="inv-bottom-form--icon" src="static/main_icon_passwd.png"/>
    						</div>
    						<input
                  value={this.state.loginPassord}
                  onChange={this.handleChange('loginPassord')}
                   id="passWord" name="passWord" placeholder="请输入您的密码" type="password" />
    					</div>
    					<div className="sl-table">
    						<div className="sl-table-cell cell-left">
    							<div className="form-item">
    								<input               value={this.state.checkCode}
                                  onChange={this.handleChange('checkCode')} id="verifyCode"  name="verifyCode" className="text-center" placeholder="请输入您的短信验证码" type="number"/>
    							</div>
    						</div>
    						<div className="sl-table-cell cell-right">
    							<div className="inv-bottom-form--code">
    								<a id="GetCode" className="form-item-code sl-btn"
                      disabled={Boolean(count)}
                       onClick={this.getCaptcha}
                       >
                      {count ? `${count} s` : '获取验证码'}
                      </a>
    							</div>
    						</div>
    					</div>
    					<div className="form-item inv-bottom-form--btn">
    						<button className="sl-btn inv-bottom-form--submit" type="submit">立即加入</button>
    					</div>
    					<input name="invitationCode" type="hidden" value="IrIjy" />
    					<input name="nickName" type="hidden" value="" />
    					<input name="cover" type="hidden" value="" />
    					<input name="openId" type="hidden" value="" />
    				</form>
    			</div>

        {/* <Card className={classes.card}> */}
        {/* <Title>您的好友 {this.state.userName}</Title> */}
        {/* <Title>诚挚邀请您成为正式经纪人</Title> */}
        {/* <form className={classes.container} onSubmit={this.submit} autoComplete="off" style={{margin:'0 24px'}}> */}
          {/* <FormControl
            style={{width:'100%'}}
            required
             >
            <InputLabel htmlFor="adornment-phone">手机</InputLabel>
            <Input
              type="number"
              id="adornment-phone"
              value={this.state.phone}
              onChange={this.handleChange('phone')}
              placeholder="请输入您的手机"
            />
          </FormControl>
          <FormControl
            style={{width:'100%'}}
            required
             >
            <InputLabel htmlFor="adornment-password">密码</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'Password'}
              value={this.state.loginPassord}
              onChange={this.handleChange('loginPassord')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            style={{width:'100%'}}
            required
             >
            <InputLabel htmlFor="adornment-checkCode">验证码</InputLabel>
            <Input
              type="number"
              id="adornment-checkCode"
              value={this.state.checkCode}
              onChange={this.handleChange('checkCode')}
              placeholder="请输入您的验证码"
              endAdornment={
                <InputAdornment position="end">
                  <GetCaptcha
                    style={{padding:'8px 0'}}
                    disabled={Boolean(count)}
                     onClick={this.getCaptcha}>
                    {count ? `${count} s` : '获取验证码'}
                  </GetCaptcha>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button color="primary"  variant="raised"  className={classes.button} type="submit">
             提交
           </Button> */}
        {/* </form> */}
        {/* </Card> */}
        <div>
          {/* 弹框 */}
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText style={{textAlign:'center'}} id="alert-dialog-description">
                恭喜你注册成功，请直接下载APP吧
                现在下载APP，全渠道产品等你
                <div>还有更多惊喜等你</div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className={classes.dialogButton} onClick={this.toDownload} color="primary" autoFocus>
                下载APP
              </Button>
            </DialogActions>
          </Dialog>
          {/* snackbar */}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.error}</span>}
            action={[
              // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              //   UNDO
              // </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                // className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
        </Wrapper>
        <style jsx>{`
          .sl-table{
          	display:table;
          	width:100%;
          }
          .sl-table-cell{
          	display:table-cell;
          	float:none;
          	vertical-align:middle;
          }
          .sl-btn{
            display:inline-block;
            width:100%;
            text-decoration:none;
            color:#fff;
            font-size:1.2em;
            background:#f85032;
            padding:10px 0;
            text-align:center;
            border: 0;
            outline: 0;
            background:-webkit-linear-gradient(left, #f85032 0%, #e73827 100%);
            background:-moz-linear-gradient(left, #f85032 0%, #e73827 100%);
            background:-ms-linear-gradient(left, #f85032 0%, #e73827 100%);
            background:-o-linear-gradient(left, #f85032 0%, #e73827 100%);
            background:linear-gradient(to right, #f85032 0%, #e73827 100%);
          }
          .form-item{
          	width:100%;
          	position:relative;
          	/*overflow:hidden;*/
          	display:table;
          	/*line-height:40px;*/
          	margin-bottom:15px;
          	background-color:#fff;
          	border-radius:20px;
          	border:1px solid #cdcdcd;
          }
          .form-item input{
          	display:table-cell;
          	vertical-align:middle;
          	width:100%;
          	/*line-height:30px;*/
          	height:40px;
          	padding-right:8px;
          	border:none;
          	outline:none;
          	-webkit-appearance:none;
          	background-color:transparent;
          	padding:10px 0;
          }
          .form-item .form-item-prepend,
          .form-item .form-item-append{
          	display:table-cell;
          	vertical-align:middle;
          	white-space:nowrap;
          }
          .form-item .form-item-prepend{
          	padding:0 10px;
          	width:40px;
          }
          .form-item .form-item-code{
          	width:120px;
          	font-size:1em;
          	text-align:center;
          	background:none;
          	background-color:#fff;
          	color:#f85032;
          }
          .form-item .form-item-code.active{
          	color:#bbbbbb;
          }
          .form-item input[type="number"]+.form-item-append{
          	position:absolute;
          	top:-1px;
          	bottom:-1px;
          	right:0;
          	overflow:hidden;
          }
          .img-full{
          	width: 100%;
          }
          /*common end*/

          /* home page*/
          .inv-top{
          	position: relative;
          }
          .inv-top-logo{
          	position: absolute;
          	top: 0;
          	left: 0;
          	right: 0;
          }
          .inv-top-logo img{
          	width: 30%;
          	padding: 10px;
          	min-width: 130px;
          }
          .inv-top-detail{
          	position: absolute;
          	bottom: -10px;
          	left:0;
          	right:0;
          	width:100%;
          }
          .inv-top-deil--font{
          	margin-bottom: 2em;
          	line-height: 24px;
          }
          .inv-top-deil--font p{
          	margin-bottom: 0px;
          }
          .inv-top-deil--avart{
          	display: block;
          	margin: 0 auto 10px;
          	width: 50px;
          	height: 50px;
          	padding: 2px;
          	border-radius: 50%;
          	background-color: #fff;
          }
          .inv-top-deil--box{
          	position: relative;
          	width: 100%;
          }
          .inv-top-deil--box--bg{
          	width: 85%;
          	display: block;
          	margin: 0 auto;
          }
          .inv-top-deil--box--btn{
          	position: absolute;
          	left: 0;
          	right: 0;
          	top: 50%;
          	-webkit-transform: translate(0, 50%);
          	-moz-transform: translate(0, 50%);
          	-o-transform: translate(0, 50%);
          	transform: translate(0, 50%);
          }
          .inv-top-deil--box--btn a{
          	display: block;
          	width: 80%;
          	margin: 0 auto;
          	padding: 0;
          	color: #7b4c30;
          	padding-bottom: 10px;
          	line-height: 45px;
          	background-image: url(../images/main_btn_bg.png);
          	background-repeat: no-repeat;
          	background-size: 100% 100%;
          	background-position: center;
          }
          .inv-bottom{
          	position: relative;
          	width: 100%;
          	margin-top: -80px;
          }
          .inv-bottom-box{
          	position: absolute;
          	bottom: 20px;
          	left: 0;
          	right: 0;
          	width: 100%;
          }
          .inv-bottom-form{
          	width: 85%;
          	margin: 20px auto 0;
          }
          .inv-bottom-form .form-item{
          	border-radius: 7px;
          	border: 0;
          }
          .inv-bottom-form .form-item input{
          	height: 40px;
          	/*padding-left: 5px;*/
          }
          .inv-bottom-form .form-item .form-item-prepend{
          	width: 50px;
          	text-align: center;
          }
          .inv-bottom-form--icon{
          	width: 15px;
          }
          .inv-bottom-form--code{
          	padding-left: 10px;
          	margin-bottom: 15px;
          	width: 100%;
          }
          .inv-bottom-form--code a.active{
          	background: #f1f1f1;
          	color: #7b4c30;
          }
          .inv-bottom-form--code a,
          .inv-bottom-form--submit,
          .inv-layer-btn{
          	height: 40px;
          	border-radius: 7px;
          	background: #ff643a;
          	font-size: 1em;
          	color: #fff;
          }
          .inv-bottom-form .cell-right{
          	width: 43%;
          }
          .inv-bottom-form--eye{
          	width: 30px;
          	text-align: center;
          }
          .inv-bottom-form--eye img:last-child{
          	display: none;
          }
          .inv-layer-title{
          	margin-bottom: 1em;
          }
          .inv-layer-btn{
          	border-radius: 0 0 5px 5px;
          	height: auto;
          	letter-spacing: 1px;
          	padding: 5px 0;
          }
          .inv-layer-logo{
          	width: 30%;
          	margin: -4em auto 1em;
          }

          /* v2.1.0 */
          .inv-top-logo img{
          	width: 32%;
          	min-width: 110px;
          }
          .inv-top-detail{
          	width: 90%;
          	margin: 0 auto;
          	padding-bottom: 2.5em;
            background-color: #ff6600;
          	background-size: 100%;
          	background-repeat: no-repeat;
            border-radius:15px;
          }
          .inv-top-deil--avart{
          	margin-top: -25px;
          }
          .inv-top-poster{
          	margin-bottom: 20px;
          }
          .inv-bottom{
          	margin-top: -60px;
          }
          .inv-bottom-form{
          	width: 95%;
          }
          .inv-bottom-form--code a{
          	color: #7b4c30;
          	background-color: #ffc955;
          }
          .inv-bottom-form--btn{
          	background-color: transparent;
          	border-radius: 0;
          }
          .inv-bottom-form .form-item,
          .inv-bottom-form--submit{
          	border-radius: 5px;
          }
          .inv-bottom-form--submit{
          	color: #7b4c30;
          	height: auto;
          	font-weight: 600;
          	font-size: 1.1em;
          	/*border: 1px solid #f49b3f;*/
          	box-shadow: 0 5px 5px -2px #e2513c, 2px 0 2px #e2513c, -2px 0 2px #e2513c;
          	background:-webkit-linear-gradient(top, #ffd767 0%, #ffcc59 50%, #ffbb42 100%);
          	background:-moz-linear-gradient(top, #ffd767 0%, #ffcc59 50%, #ffbb42 100%);
          	background:-ms-linear-gradient(top, #ffd767 0%, #ffcc59 50%, #ffbb42 100%);
          	background:-o-linear-gradient(top, #ffd767 0%, #ffcc59 50%, #ffbb42 100%);
          	background:linear-gradient(to bottom, #ffd767 0%, #ffcc59 50%, #ffbb42 100%);
          }

          .sl-table-cell{
          	display:table-cell;
          	float:none;
          	vertical-align:middle;
          }
          .text-center{
            text-align:center;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(Invatation));
