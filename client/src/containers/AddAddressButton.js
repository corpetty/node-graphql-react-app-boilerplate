import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'

const ADD_ADDRESS = gql`
  mutation AddAddress($address: String!, $kind: String!) {
    addAddress(address: $address, kind: $kind) {
      address
      kind
    }
  }
`
const GET_ADDRESSES = gql`
  query GetAddresses {
    getAddresses {
      address
      kind
    }
  }
`

// TODO: Need to make `kind` default to nothing, and verify upon mutation that it is either or
export default function AddAddressButton ({ isEmptyAddress, isValidAddress, address, kind }) {
    return (
      <Mutation 
        mutation={ADD_ADDRESS}
        variables={{ 
          address: address,
          kind: kind }}
        refetchQueries={[ 
          {
            query: GET_ADDRESSES 
          },
        ]}
      >
        {(addAddress, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>ERROR: {error.message}</p>;  

          return (
            <div>
              <Button
                onClick={addAddress}
                data-testid={'action-button'}
                variant='contained'
              >
                {isValidAddress
                  ? 'Add Address'
                  : isEmptyAddress 
                   ? 'Enter ETH Address'
                   : 'Bad Address'}
              </Button>
            </div>
          )   
        }}
      </Mutation>
    )
}
