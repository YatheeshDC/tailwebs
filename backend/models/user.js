// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// userSchema.methods.comparePassword = function(password) {
//   return bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('User', userSchema);



let mongoose=require('mongoose')
// const bcrypt=require('bcryptjs')

const UserSchema = new mongoose.Schema({
    userName: { type: String,  required: true, unique: true },
    userEmail: { type: String,  required: true, unique: true },
    userPassword: { type: String,  required: true },
    token:{type:String},
  });

const MbsUsers=mongoose.model("Teachers",UserSchema)

module.exports=MbsUsers