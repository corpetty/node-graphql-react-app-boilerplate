import React from 'react'
import Loadable from 'react-loadable'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import Loading from '../../components/loading'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

const LoadableComponent = Loadable({
  loader: () => import('./home'),
  loading: Loading,
})

const LoadableHome = () => {
  return(
  <Query query={IS_LOGGED_IN}>
    {({ data }) => (data.isLoggedIn ? <LoadableComponent /> : <Redirect to='/login' push={true} />)}
  </Query>
  )
}

export default LoadableHome