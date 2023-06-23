const express = require('express');
const app = express();
const  mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');

app.use (express.json());
app.use (express.static('public'));
app.set ('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

const URI = 'mongodb+srv://LeapVuthy:Vuthy0112@vuthy.ifubzha.mongodb.net/Node-Express-Blog?retryWrites=true&w=majority';
mongoose.connect( URI,  { useNewUrlParser: true,useUnifiedTopology: true })
    .then (result =>{
       app.listen (3000);
    })
    .catch((err) =>{
        console.log (err);
    })



app.get ('/resgister' , (req , res) =>{
    res.render ('resgister')
})

// app.get ('/edit' , (req , res) =>{
//     res.render('edit');
// })

app.get ('/login' , (req , res) =>{
    res.render ('login');
})


app.get ('/about' , (req , res) =>{
    res.render ('about');
})

app.use (blogRoutes)
