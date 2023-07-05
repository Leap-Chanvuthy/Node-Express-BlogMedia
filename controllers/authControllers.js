const User = require ('../models/authModels');
const jwt = require('jsonwebtoken');


// create token to register a new account
const maxAge = 3 * 24 * 60 * 60 ;
const createToken = (id) =>{
    return jwt.sign ({id} , 'fjkdahsdfhasdhfkjashfjkhasjkldfhakjls' , {expiredIn : maxAge});
}

// create a handle errors package based on validator
const handleError = (err) => {
    console.log (err.message , err.code);
    let errors = ({email : '' , password : '' });
        
        // duplicate email error
        if (err.code === 11000){
            errors.email = 'this email is already registered';
            return errors ;
        }

        // incorrect email
        if (err.message === 'incorrect email'){
            errors.email = 'this email is already registered';
        }

        // incorrect password
        if (err.password === 'incorrect password'){
            errors.password = 'incorrect password';
        }

        // validate errors 
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


module.exports.login_get = (req , res) =>{
    res.render ('login');
    res.json({message : 'this is login page'});
}

module.exports.login_post = async (req , res) =>{
    //res.json({message : 'hello login post'});
    // const {email , password} = req.body;
    // try {
    //     const user = await User.login (email , password);
    //     const token = createToken (user._id);
    //     res.cookie('jwt' , token , {httpOnly : true , maxAge : maxAge * 1000}); 
    //     res.status(200).json({user : user._id});
    // }
    // catch (err){
    //     console.log (err);
    // }

}

module.exports.register_get = (req , res) =>{
    res.render ('register');
}

module.exports.register_post = async (req , res) =>{
    //res.json({message : 'hello register post'});

    const {email , password , phone , username } = req.body;
    try {
        const user = await User.create ({email , password , phone , username});
        const token = createToken (user._id);
        res.cookie('jwt' , token , {httpOnly : true , maxAge : maxAge * 1000});
        res.status(200).json({user : user._id});
    } 
    catch (err){
        const errors = handleError(err);
        res.status (404).json({message : 'it`s has been an error'});
    }

}