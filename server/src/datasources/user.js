const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const retrievedUser = await this.store.User.find({ email }, async (err, docs) => {
      if (err) {
        console.log("Error", err)
      } else if (docs.length !== 0) {
        return docs[0]
      } else {
        let user = new this.store.User({ email })
        let savedUser = await user.save().then(() => console.log('saved new user'))
        return savedUser
      }
    })

    return retrievedUser
    
  }

  // Queries
  async getAddresses() {
    const userId = this.context.user && this.context.user._id 
     ? this.context.user._id
     : 0
    const addresses = await this.store.Address.where({ userId }).find().exec()
    return addresses
  }

  // Mutations
  async addAddress({ address, kind, tag, balance }) {
    const userId = this.context.user._id;
    const newAddress = new this.store.Address(
      { address, kind, tag, balance, userId }
    )
    await newAddress.save()
      .then((doc) => {
        this.store.User.findByIdAndUpdate(userId,
          { "$addToSet": { addresses: doc.address }}).exec()
        })
    return newAddress;
  }

  async deleteAddress({ address }) {
    const userId = this.context.user._id;
    const removedAddress = await this.store.Address
      .deleteOne( { address, userId } ).exec()
    if (removedAddress.deletedCount == 1) {
      await this.store.User.findByIdAndUpdate(userId,
        { "$pull": { addresses: address }}).exec()
    }
    return removedAddress.deletedCount === 1
  }

}

module.exports = UserAPI;
