import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import IconButton from '@material-ui/core/Button'
import { Delete } from '@material-ui/icons'

const DELETE_ADDRESS = gql`
mutation DeleteAddress($address: String!) {
  deleteAddress(address: $address) 
}
`
const GET_ADDRESSES = gql`
  query GetAddresses{
    getAddresses {
      address
      kind
    }
  }
`
const DeleteAddress = ({ address }) => {
  return (
    <Mutation 
      mutation={DELETE_ADDRESS} 
      variables={{
        address: address
      }}
      refetchQueries={[ { query: GET_ADDRESSES } ]}
    >
      {(deleteAddress, { loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>ERROR: {error.message}</p>;  

        return (
          <div> 
              <IconButton variant="contained" onClick={e => {
                e.preventDefault()
                deleteAddress()
              }}><Delete /></IconButton>
          </div>
        )
      }}
    </Mutation>
  )
}

export default DeleteAddress