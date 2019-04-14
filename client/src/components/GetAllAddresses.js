import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import DeleteAddress from './DeleteAddress';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

const GET_ALL_ADDRESSES = gql`
  query GetAllAddresses{
    getAddresses {
      address
      kind
    }
  }
`
// NOTE: this should be broken up so we have atomicity of components, and
//   a higher level container combines them into the list.  This works for now. 
const GetAllAddresses = () => (
  <Query query={GET_ALL_ADDRESSES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        <Paper >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>address</TableCell>
                <TableCell>kind</TableCell>
                {/* <TableCell>balance (ETH)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
            {
              data.getAddresses.map( ({address, kind, balance}) => (
                <TableRow key={address}>
                  <TableCell>{address}</TableCell>
                  <TableCell>{kind}</TableCell>
                  {/* <TableCell>{balance}</TableCell> */}
                  <TableCell><DeleteAddress address={address}/></TableCell>
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </Paper>
      )
    }}
  </Query>
)

export default GetAllAddresses