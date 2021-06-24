import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import Logo from './assets/img/icon-des.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  AppBar: {
    boxShadow: 'none',
  },
});

function Header() {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <AppBar className={classes.AppBar} position="fixed">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <img src={Logo} alt="Portal" />
          </IconButton>

          <Typography variant="h6" color="inherit">
            DES Science Portal Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
