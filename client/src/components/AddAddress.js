import React from 'react'
import AddAddressButton from '../containers/AddAddressButton'
import { Paper, Select, Typography, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { isAddress } from 'ethereum-address'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    margin: theme.spacing.unit *3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class AddAddress extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      isValidAddress: false,
      isEmptyAddress: true,
      kind: '',
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isValidAddress: isAddress(event.target.value),
      isEmptyAddress: event.target.value === '' 
      ? true
      : false,
    })
  }

  onSelectChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}> 
        <Typography variant="h4">Add an address to monitor</Typography>
        <Input 
          placeholder={'add Ethereum address'} 
          name='address'  
          fullWidth={true}
          onChange={this.onInputChange}
        />
        <Select
          onChange={this.onSelectChange} 
          value={this.state.kind}
          name="kind"
          placeholder="kind"
        >
          <option value="user">user</option>
          <option value="contract">contract</option>
        </Select>
        <AddAddressButton {...this.state} />
      </Paper>
    )
  }
}

export default withStyles(styles)(AddAddress)