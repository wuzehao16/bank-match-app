import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from "material-ui/Dialog";
import Layout from '../layout/Blanklayout';
import withRoot from '../src/withRoot';
import Card, { CardActions, CardContent } from 'material-ui/Card';
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
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
const GetCaptcha = styled(Button)`
  ${'' /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%); */}
  ${'' /* border-radius: 3px; */}
  border: 0;
  color: white;
  height: 20px;
  ${'' /* box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30); */}
`;
const Title = styled.div`
  text-align: center;
  margin-top: 10px;
`
class Wanted extends React.PureComponent {
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
  submit = e =>{
    e.preventDefault();
    console.log(this.state)
    register(this.state).then(res => {
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
        <Card className={classes.card}>
        <Title>您的好友 {this.state.userName}</Title>
        <Title>诚挚邀请您成为正式经纪人</Title>
        <form className={classes.container} onSubmit={this.submit} autoComplete="off">

          <FormControl
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
           </Button>
        </form>
        </Card>
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
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(Wanted));
