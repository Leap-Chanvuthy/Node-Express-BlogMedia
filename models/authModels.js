const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  username: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
});

// Hash password in the database
userSchema.pre('save', async (next) => {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Log user record after saving to the database
userSchema.post('save', function (doc, next) {
  console.log('User was saved to the database:', doc);
  next();
});

// Find email in the database and perform login (middleware)
userSchema.statics.login = async function ( email, password ){
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect email');
};

const User = mongoose.model('User', userSchema);
module.exports = User;
