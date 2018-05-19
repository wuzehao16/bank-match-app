import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 20,
        border: 0,
        color: 'white',
        height: 32,
        padding: '0 30px',
        // borderRadius: '5px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

function OverridesTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>下一步</Button>
    </MuiThemeProvider>
  );
}

export default OverridesTheme;
