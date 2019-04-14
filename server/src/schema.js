const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    getAddresses: [Address]
    me: User
  }

  type Mutation {
    login(email: String!): String!
    addAddress(address: String!, kind: String!): Address
    deleteAddress(address: String!): Boolean
  }

  type User {
    id: ID!
    email: String!
    addresses: [Address]!
  }

  type Address {
    id: ID!
    address: String!
    kind: String!
    balance: Float 
    userId: ID!
  }

  type AddressUpdateResponse {
    success: Boolean!
    message: String
  }
`

module.exports = typeDefs