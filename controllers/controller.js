const User = require("../models/user");
const passport = require("passport");
 const bcrypt = require ('bcrypt')

exports.registerUser = async (req, res) => {
    const {email, name, password, passwordConfirm } = req.body;
    console.log({ name, email, password, passwordConfirm, });
    
        if (!name || !email || !password || !passwordConfirm) {
            res.status(400).json({ message: "please enter all fields"  });
          }
          if (password.length < 6) {
            res.status(400).json({ message: "password should be atleast 6 characters" });
          }
          if (password != passwordConfirm) {
            res.status(400).json({message: " passwords do not match"});
          }
      const existingUser = await User.findOne({ email })
            if (existingUser){
                return res.status(400).json({message: "user with email already exist" })
            } 
        else{
            try{
            const user = await User.create({
                email,
                password,
                passwordConfirm,
            })
            console.log(user)
            await user.save(user, (err, user) => {
                if (err) {
                    res.send(err)

                    console.log(err)
                }
                else {
                    res.status(201).json({
                        success: true,
                        messsage: 'user registered successfully'
                    })
                    console.log('success')
                    console.log(user)
                   
                }
            })
        
    }catch (err) {
       next(err)
    }
    
}

}



exports.logoutUser = function (req, res) {
    req.logout();
    res.redirect("/");
}


