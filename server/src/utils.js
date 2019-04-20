const mongoose = require('mongoose')

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);

  results.slice(cursorIndex >= 0 ? cursorIndex + 1 : 0, cursorIndex >= 0);
};

module.exports.createStore = () => {
  const mongoDB = 'mongodb://petty:heimdallAdmin1@ds143559.mlab.com:43559/heimdall'
  mongoose.connect(mongoDB, { useNewUrlParser: true})
  .then(()=> console.log("   Connected to Mongo DB"))
  // const db_mong = mongoose.connection

  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    email: {
      type: Schema.Types.String,
      required: true,
    },
    token: Schema.Types.String,
    addresses: [{
      type: Schema.Types.String,
      ref: 'Address',
    }]
  })

  // Remove all addresses assocaited with a user when a User is removed
  UserSchema.pre('remove', function(next) {
    this.model('Address').deleteMany({ userId: this._id }, next)
  })

  const AddressSchema = new Schema({
    address: {
      type: Schema.Types.String,
      required: true,
    },
    kind: {
      type: Schema.Types.String,
      required: true,
    },
    balance: Schema.Types.Number,
    abi: Schema.Types.String,
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tag: Schema.Types.String,
  })


  const User = mongoose.model('User', UserSchema)
  const Address = mongoose.model('Address', AddressSchema)

  return { User, Address };
};
