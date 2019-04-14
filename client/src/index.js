import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { typeDefs } from './resolvers'

import AppRouter from './routes'
import Login from './routes/login'

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'Petty [web]',
      'client-version': '1.0.0',
    },
  }),
  cache,
  typeDefs,
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  }
})

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

ReactDOM.render(
  
    <ApolloProvider client={client}>
      <Query query={IS_LOGGED_IN}>
        {({data}) => (data.isLoggedIn ? <AppRouter /> : <Login /> )}
      </Query>
    
    </ApolloProvider>,
  document.getElementById('app')
)