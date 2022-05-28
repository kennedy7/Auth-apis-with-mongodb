const express = require ("express");
const router = express.Router();
const { registerUser, logoutUser } = require ("../controllers/controller")
const passport = require ('passport')

//showing home page
router.get("/", function ( req, res) {
    res.render("home")
});

const checkAuth = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login")
}

// showing secret page
router.get("/secret", checkAuth, function (req, res) {
    res.render("secret")})


//REGISTRATION FORM
router.get ("/register", (req, res) => {
    return res.render ("register");
});
router.post ("/register", registerUser, (req, res)=>{
    if (err){
        console.log (err)
        return res.status(500).json({ err })
    }
    else{
        res.render("login")
    }
})   
//LOGIN
router.get("/login",  (req, res) => {
    return res.render ("login");
   
});
router.post("/login", 
    passport.authenticate("local", {
      successRedirect: "/secret",
      failureRedirect: "/login",
      failureFlash: true,
    }),
  );

//logout
router.get("/logout",  (req, res) => {
    return res.render ("logout");
});




module.exports = router;