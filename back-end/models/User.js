const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  healthCard: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  accountStatus: {
    type: String,
    required: true,
    default: "active",
  },
  sharedResources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource' // If you have a separate Resource collection
  }],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group' // If you have a separate Group collection
  }],
});

module.exports = User = mongoose.model('User', UserSchema);