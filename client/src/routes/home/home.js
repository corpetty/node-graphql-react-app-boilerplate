import React from 'react'
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import AddAddress from '../../components/AddAddress';
import GetAllAddresses from '../../components/GetAllAddresses';


const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#4360df",
    display: 'flex',
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
})

class Home extends React.Component {
  render() {
    const { classes } = this.props
    console.log(this.props)
    return (
      <React.Fragment >
        <Grid 
          container 
          className={classes.root}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <AddAddress />
          <GetAllAddresses />

        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)