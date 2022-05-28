const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
// const uniqueValidator = require('mongoose-unique-validator');
// const validate = require ('express-validator')

// const passportLocalMongoose = require ("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
      },
      passwordConfirm: {
        type: String,
        }
      
      // role: {
      //   type: String,
      //   enum: ["nil", "user"],
      //   default: "user"
      // },
     
      });

    UserSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      this.passwordConfirm = undefined;
  
    });


    module.exports.comparePassword = function(password, hash, callback){
      bcrypt.compare(password, hash, (err, isMatch)=>{
        if (err) throw err;
        callback(null, isMatch);
      });
    }
      UserSchema.methods.comparePassword = async function (inputPassword) {
        let User = this;
        return await bcrypt.compare(inputPassword, User.password);
    };

    // UserSchema.methods.passwordsMatch = async function (passwordInput, password) {
    //   return await bcrypt.compare(passwordInput, password);
    
    // UserSchema.methods.isValidPassword =  function(user, password){
    //   return bcrypt.compare(password, user.password);
    // };
  
    
    // isValidPassword = function(user, password){
    //   return bcrypt.compareSync(password, user.password);
    
    // compare password for login
    // module.exports.comparePassword = function(password, hash, callback){
    //   bcrypt.compare(password, hash, (err, isMatch)=>{
    //     if (err) throw err;
    //     callback(null, isMatch);
    //   });
    // }
    
    module.exports = model('User', UserSchema);