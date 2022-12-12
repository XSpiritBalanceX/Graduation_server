const passport=require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
require('dotenv').config();
const {MyUsers}=require('./dataBase/descriptionDB')
const GOOGLE_CALLBACK_URL='http://localhost:5000/api/user/auth/google/callback';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:GOOGLE_CALLBACK_URL
},
    async function(accessToken, refreshToken, profile, done) {
        const account=profile._json;
        try{
            let user=await MyUsers.findOne({where:{email: profile.emails[0].value}});
            if(!user){
                await MyUsers.create({email: profile.emails[0].value,name:profile._json.name,  })
            }
            let currenUser={
                id:user.dataValues.id,
                name:user.dataValues.name,
                email:user.dataValues.email,
                blocked:user.dataValues.blocked,
                role:user.dataValues.role
            }
           done(null, currenUser)
        }catch(err){
            done(err)
        }
    }
))

passport.serializeUser((user, done)=>{
    done(null,user)
});

passport.deserializeUser((user, done)=>{
    done(null,user);
})