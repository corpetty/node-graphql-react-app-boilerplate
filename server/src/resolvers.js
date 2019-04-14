const { paginateResults } = require('./utils')

module.exports = {
  Query: {
    me: async (_, __, { dataSources }) => {
      let user = await dataSources.userAPI.findOrCreateUser()
      console.log("this is me user: ", user)
    },
    getAddresses: async (_, { }, { dataSources }) => {
      const allAddresses = await dataSources.userAPI.getAddresses();

      return allAddresses
    }
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email })
      if (user) return new Buffer(email).toString('base64')
    },
    addAddress: async (_, { address, kind }, { dataSources }) => {
      const res = await dataSources.userAPI.addAddress({ address, kind })
      return res
    },
    deleteAddress: async (_, { address }, { dataSources }) => {
      const res = await dataSources.userAPI.deleteAddress({ address })
      return res
    }
  },
  User: {
    addresses: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const addressIds = await dataSources.userAPI.getAddressIdsByUser();

      if (!addressIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.addressAPI.getLaunchesByIds({
          addressIds,
        }) || []
      );
    },
  }
}