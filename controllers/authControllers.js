const User = require('../models/authModels');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'fjkdahsdfhasdhfkjashfjkhasjkldfhakjls', { expiresIn: maxAge });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // incorrect email 
  if (err.message === 'incorrect email'){
    err.message = 'Email is already registered';
  }
  // incorrect password
  if (err.message === 'incorrect password'){
    err.message = 'Password is incorrect';
  }

  //  minimum password 
  // if (err.message === 'Password must be at least 6 characters long'){
  //   err.message = 'Password must be 6 characters long';
  // }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}



module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.register_get = (req, res) => {
  res.render('register');
};



module.exports.register_post = async (req, res) => {
  const { email, password, phone, username } = req.body;
  try {
    const user = await User.create({ email, password, phone, username });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    console.log(req.body);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    console.log ("successfully logged user in" , req.body);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};



