const express = require("express");
const app = express();
require('dotenv').config();
const dbSetup = require('./database/setup')
const port = process.env.PORT;
const bodyparser = require ("body-parser");
const User = require ("./models/user");
const router = require ("./routes/Route");
const passport = require("passport")
const initializePassport = require("./passport_plug");
initializePassport(passport);

const expressSession = require('session',{
    secret: 'secret', 
    resave: false,
    saveUninitialized: false
  });
      


dbSetup()

app.use(passport.initialize());
app.use(passport.session());

//EJS
app.set('view engine', 'ejs')
 app.use (express.urlencoded({ extended:true}));

//body parser
app.use (express.urlencoded({ extended:true}));

app.use(express.json());
app.use(router);
app.use(User)


app.listen(port,()=>{
  console.log(`server started on port --->${port}`)
})
    
