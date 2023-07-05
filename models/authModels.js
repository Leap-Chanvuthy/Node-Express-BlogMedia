const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema ({
    email : {
        type : String ,
        unique : true ,
        lowercase : true,
        required : [true , 'please enter an email'],
        validate : [isEmail , 'please enter a valid email']
    },
    password : {
        type : String ,
        required : [true , 'please enter a password'],
        minLength : [6 , 'password must be 6 charactors long']
    },
    username : {
        type : String ,
        required : true,
    },
    phone : {
        type : String ,
        required : true
    }
});


// hash password in database 
userSchema.pre ('save' , async (next) =>{
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash (this.password , salt);
    next();
    
})

// user record recently added 
userSchema.post ('save' , function(doc , next){
    console.log ('user was saved to database ' , doc);
    next ();
})


// find email in database and login (middleware)
userSchema.static.login  = async function ({email , password}) {
    const user = await User.findOne({email});
    if (user){
        const auth = await bcrypt.compare(password , user.password);
        if (auth){
            return user;
        }
        throw Error ('incorrect password'); 
    }
     throw Error ('incorrect password');
}



const User = mongoose.model('user' , userSchema);
module.exports = User;