const express = require('express');
const app = express();
const  mongoose = require('mongoose');


app.use (express.json());
app.use (express.static('public'));
app.set ('view engine' , 'ejs');

const URI = 'mongodb+srv://LeapVuthy:Vuthy0112@vuthy.ifubzha.mongodb.net/Node-Express-Blog?retryWrites=true&w=majority';
mongoose.connect( URI,  { useNewUrlParser: true,useUnifiedTopology: true })
    .then (result =>{
       app.listen (3000);
       console.log ('Database connected successfully');
    })
    .catch((err) =>{
        console.log (err);
    })

app.get ('/' , (req , res) =>{
    res.render('home');
})

app.get ('/resgister' , (req , res) =>{
    res.render ('resgister')
})

app.get ('/login' , (req , res) =>{
    res.render ('login');
})

app.get ('/about' , (req , res) =>{
    res.render ('about');
})

app.get ('/create-blog' , (req , res) =>{
    res.render('create');
})