const express = require("express");
const router = express.Router();

// import controller
const {signup, accountActivation,signin,googlelogin,editProfile,uploadPic} = require("../controllers/auth");

router.post('/signup',signup);
router.post('/account-activation',accountActivation);
router.post('/signin',signin);

// forget/reset password routers
//router.put('/forget-password', forgotPassword);
//router.put('/reser-password',resetPassword);

router.post('/googlelogin',googlelogin);
router.post('/editprofile',editProfile);
router.post('/uploadpic',uploadPic);

module.exports = router;