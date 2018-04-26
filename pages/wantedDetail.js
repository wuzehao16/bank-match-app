import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class WantedDetail extends React.PureComponent {
  static async getInitialProps({query}) {
    return {
      data: query
    }
  }
  render(){
  const { classes,data } = this.props;
  console.log(this.props)
  return (
    <Layout>
      <div>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="headline" component="h3">
            职位
          </Typography>
          <Typography component="p">
            {data.job}
          </Typography>

        </Paper>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="headline" component="h3">
            姓名
          </Typography>
          <Typography component="p">
            {data.name}
          </Typography>


        </Paper>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="headline" component="h3">
            联系电话
          </Typography>
          <Typography component="p">
          {data.phone}
          </Typography>
        </Paper>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="headline" component="h3">
            邮箱
          </Typography>
          <Typography component="p">
            {data.email}
          </Typography>
        </Paper>
      </div>

    </Layout>

  );
  }
}

export default withStyles(styles)(WantedDetail);
