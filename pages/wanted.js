import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from 'next/router'
import Layout from '../layout/Blanklayout';
import withRoot from '../src/withRoot';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  button:{
    width: '40%',
    margin: '50px auto',
  }
});

class Wanted extends React.PureComponent {
  state = {
    name:'',
    job:'',
    phone:'',
    email:''
  }
  handleChange = name => event =>{
    this.setState({
      [name]:event.target.value
    })
  }
  submit = e =>{
    e.preventDefault();
    console.log(this.state)
    setTimeout(()=>{
      Router.push({
        pathname:'/wantedDetail',
        query: { ...this.state }
      })
    },500)
  }
  render() {
    const {classes} = this.props;
    return (
      <Layout title="我要求职">
        <form className={classes.container} onSubmit={this.submit} autoComplete="off">
          <TextField
            id="job"
            label="职位"
            required
            className={classes.textField}
            value={this.state.job}
            onChange={this.handleChange('job')}
            margin="normal"
            placeholder="请输入您的职位"
          />
          <TextField
            id="name"
            label="姓名"
            required
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            placeholder="请输入您的姓名"
          />
          <TextField
            id="phone"
            label="联系电话"
            required
            className={classes.textField}
            value={this.state.phone}
            onChange={this.handleChange('phone')}
            margin="normal"
            placeholder="请输入您的电话"
          />
          <TextField
            id="email"
            label="邮箱"
            required
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            placeholder="请输入您的邮箱"
          />
          <Button color="primary"  variant="raised"  className={classes.button} type="submit">
             提交
           </Button>
        </form>
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(Wanted));
