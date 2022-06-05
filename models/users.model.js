const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
    minimize: false,
  },
);

UserSchema.index({ name: 1 }, { unique: true });
module.exports = mongoose.model('User', UserSchema);
