import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/MaterialTheme';
import Dashboard from './Dashboard';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Dashboard />
    </MuiThemeProvider>
  );
}

export default App;
