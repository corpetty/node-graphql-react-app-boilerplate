import React, { Component } from 'react';

import { Paper, Typography, Input, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme/muiTheme'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#4360df",
    display: 'flex',
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing.unit * 4,
    margin: theme.spacing.unit *3,
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },
  select: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  input: {
    float: 'left',
    width: '75%',
    margin: theme.spacing.unit,
  },
  h3: {
    padding: theme.spacing.unit * 4,
  },
  h5: {
    padding: theme.spacing.unit,
  },
  form: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  }
})


class LoginForm extends Component {
  state = { email: '' }

  onChange = event => {
    const email = event.target.value;
    this.setState(s => ({ email }));
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.login({ variables: { email: this.state.email } })
    return <Redirect to='/' push={true} />
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid 
          container 
          className={classes.root}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Paper className={classes.paper}>
            <Typography 
              className={classes.h3}
              variant='h3'
            >
              Heimdall
            </Typography>
            <Typography 
              className={classes.h5}
              variant='h5'
            >
              Please login
            </Typography>
            <form onSubmit={this.onSubmit} className={classes.form}>
              <Input
                required
                type="email"
                name="email"
                placeholder="Email"
                data-testid="login-input"
                onChange={this.onChange}
              />
              <Button type="submit" variant='contained' className={classes.button}>Log in</Button>
            </form>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(LoginForm)