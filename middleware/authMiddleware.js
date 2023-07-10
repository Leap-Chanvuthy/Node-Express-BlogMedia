const jwt = require('jsonwebtoken');
const User = require ('../models/authModels');
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'fjkdahsdfhasdhfkjashfjkhasjkldfhakjls', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// Check current user 

const checkUser = (req, res, next) => {
  try{
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'fjkdahsdfhasdhfkjashfjkhasjkldfhakjls', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user ;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
  }
  catch (err){
    console.log ('its has been an error');
  }
};


module.exports = { requireAuth , checkUser };