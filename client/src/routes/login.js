import React from 'react';
import { Mutation, ApolloConsumer, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom'

import LoginForm from '../components/login-form';
import Loading from '../components/loading'

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

export default function Login() {
  return (
    <Query query={IS_LOGGED_IN}>
     {({ data }) => (data.isLoggedIn ? <Redirect to='/' /> : 
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={LOGIN_USER}
            onCompleted={({ login }) => {
              localStorage.setItem('token', login);
              client.writeData({ data: { isLoggedIn: true } });
            }}
          >
            {(login, { loading, error }) => {
              // this loading state will probably never show, but it's helpful to
              // have for testing
              if (loading) return <Loading />;
              if (error) return <p>Error: {error.message}</p>;

              return <LoginForm login={login} />;
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    )}
    </Query>  
    
  );
}