const User = require('../models/authModels');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'fjkdahsdfhasdhfkjashfjkhasjkldfhakjls', { expiresIn: maxAge });
};

const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  if (err.code === 11000) {
    errors.email = 'This email is already registered';
    return errors;
  }

  if (err.message === 'User not found') {
    errors.email = 'Incorrect email';
  }

  if (err.message === 'Incorrect password') {
    errors.password = 'Incorrect password';
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.login_get = (req, res) => {
  res.render('login');
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
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
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
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
};
