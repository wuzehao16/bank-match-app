import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <input
        className={classes.input}
        id="raised-button-file"
        type="radio"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={classes.button}>
          信用贷款
        </Button>
      </label>
      <input
        className={classes.input}
        id="raised-button-file"
        type="radio"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={classes.button}>
          抵押贷款
        </Button>
      </label>
    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);
