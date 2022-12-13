const passport=require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
require('dotenv').config();
const {MyUsers}=require('./dataBase/descriptionDB');
const GOOGLE_CLIENT_ID='123235015155-rf6n17fn2vslogrejtafkgrfu65inoq2.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='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'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
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