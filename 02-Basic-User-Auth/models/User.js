const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true,
        lowercase: true, 
        validate:[isEmail,'Valid email is required']
    },
    password: {
        type: String,
        required:  [true,'Password is required'],
        minlength: [6,'min 6 password length'],
    }
});
//cutom model method
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;