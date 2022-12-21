const {Router}=require('express');
const authRouterGoogle=new Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const generateJwt=(id,email,name, role)=>{
    return jwt.sign({id,email,name, role}, process.env.SECRET_KEY, {expiresIn:'24h'});
}

authRouterGoogle.get('/login/failed', (req, res)=>{
    res.status(401).json({message:'failure'})
})

authRouterGoogle.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('http://localhost:3000/')
})
authRouterGoogle.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));
authRouterGoogle.get('/google/callback', passport.authenticate('google',{
    failureRedirect:'/login/failed'
}), function(req, res){
    const token=generateJwt(req.user.id,req.user.email,req.user.name,req.user.role)
    res.redirect('https://client-production-8862.up.railway.app/auth/'+token)
})

authRouterGoogle.get('/discord', passport.authenticate('discord'));
authRouterGoogle.get('/discord/redirect', passport.authenticate('discord',{
    failureRedirect:'/login/failed',
}), function(req, res){
    const token=generateJwt(req.user.id,req.user.email,req.user.name,req.user.role)
    res.redirect('https://client-production-8862.up.railway.app/auth/'+token)
})

module.exports=authRouterGoogle;