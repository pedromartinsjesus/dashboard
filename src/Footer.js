import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';
import logo from './assets/img/linea-logo-mini.png';

function Footer() {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      float: 'right',
      height: 64,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    toolbar: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    versionLink: {
      color: '#d2cf00',
      textDecoration: 'none',
      fontSize: '0.9rem',
      cursor: 'pointer',
    },
    logoLink: {
      lineHeight: 0,
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    poweredBy: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  });

  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar} variant="dense">
          <Typography color="inherit">
            <span style={{ marginRight: 6 }}>
              Dashboard:
            </span>
            <span
              className={classes.versionLink}
            >
              1.0.0
            </span>
          </Typography>
          <Typography color="inherit">
            <span className={classes.poweredBy}>Powered by</span>
            <a href="http://www.linea.gov.br/" target="blank" className={classes.logoLink}>
              <img
                src={logo}
                title="LIneA"
                alt="LineA"
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
}

export default Footer;
