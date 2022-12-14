const {Router}=require('express');
const authRouterGoogle=new Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const generateJwt=(id,email,name, role)=>{
    return jwt.sign({id,email, role}, process.env.SECRET_KEY, {expiresIn:'24h'});
}

authRouterGoogle.get('/login/failed', (req, res)=>{
    res.status(401).json({message:'failure'})
})
authRouterGoogle.get('/login/success', (req, res)=>{
    if(req.user){
      const token=generateJwt(req.user.id,req.user.email,req.user.name,req.user.role)
      res.status(200).json({message:'successfull', user:req.user.email, token, name:req.user.name})  
    }
});
authRouterGoogle.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('http://localhost:3000/')
})
authRouterGoogle.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));
authRouterGoogle.get('/google/callback', passport.authenticate('google',{
    successRedirect:'http://localhost:3000/',
    failureRedirect:'/login/failed'
}))
authRouterGoogle.get('/facebook', passport.authenticate('facebook',{scope:['email']}));
authRouterGoogle.get('/redirect/facebook', passport.authenticate('facebook',{
    successRedirect:'http://localhost:3000/',
    failureRedirect:'/login/failed'
}))
authRouterGoogle.get('/discord', passport.authenticate('discord'));
authRouterGoogle.get('/discord/redirect', passport.authenticate('discord',{
    failureRedirect:'/login/failed'
}), function(req, res){
    res.redirect('http://localhost:3000/')
})

module.exports=authRouterGoogle;