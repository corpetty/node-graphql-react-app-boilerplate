import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { typeDefs } from './resolvers'
import { Redirect } from 'react-router-dom'

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

ReactDOM.render(
  
    <ApolloProvider client={client}>
     
       <AppRouter />}
      
    </ApolloProvider>,
  document.getElementById('app')
)