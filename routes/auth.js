const {Router}=require('express');
const authRouter=new Router();
const authController=require('../controllers/authController');
const authMiddleware=require('../middleware/authMiddleware');
const GOOGLE_CALLBACK_URL='http://localhost:5000/api/user/auth/google/callback';
const passport=require('passport')

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/auth',authMiddleware, authController.check );
authRouter.get('/google',passport.authenticate('google', {scope:['profile', 'email']}) );
authRouter.get('/auth/google/callback',passport.authenticate('google', {session:true}),
 (req, res)=>{
    console.log(res.json({message:'working'}))
    //res.json({message:req.user})
 });

module.exports=authRouter;