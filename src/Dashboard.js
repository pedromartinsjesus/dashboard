import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Footer from './Footer';
import Centaurus from './api/Centaurus'

const useStyles = makeStyles({
  main: {
    marginTop: 53,
  },
});

function Dashboard() {
  const classes = useStyles();

  useEffect(() => {
    Centaurus.getAllReleaseTag()
      .then(res => {
        console.log(res)
      })
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
        </Grid>
        <Grid container className={classes.main}>
          {/*  <Grid item xs={12}>
            <h1 style={{ color: 'black' }}>Main Content!</h1>
          </Grid> */}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
