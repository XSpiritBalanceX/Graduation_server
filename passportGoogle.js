const passport=require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
require('dotenv').config();
const {MyUsers}=require('./dataBase/descriptionDB')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:5000/auth/google/callback'
},
    async function(accessToken, refreshToken, profile, done) {
          let user=await MyUsers.findOne({where:{email: profile._json.email}});
            if(!user){
                await MyUsers.create({email: profile._json.email,name:profile._json.name,  })
            }
            return done(null, user);
    }
))

 passport.serializeUser((user, done)=>{
    done(null,user)
});

passport.deserializeUser((user, done)=>{
    done(null,user);
}) 