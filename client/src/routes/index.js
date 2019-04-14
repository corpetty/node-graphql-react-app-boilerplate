import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme/muiTheme'

import Home from './home'
import NotFound from './notFound'

class AppRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact component={NotFound} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

export default AppRouter