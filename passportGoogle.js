const passport=require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
const DiscordStrategy =require('passport-discord').Strategy;
require('dotenv').config();
const {MyUsers}=require('./dataBase/descriptionDB');
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
const DISCORD_CLIENT_ID=process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET=process.env.DISCORD_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:'https://server-production-5ca0.up.railway.app/auth/google/callback'
},
    async function(accessToken, refreshToken, profile, done) {
          let user=await MyUsers.findOne({where:{email: profile._json.email}});
            if(!user){
                await MyUsers.create({email: profile._json.email,name:profile._json.name,  })
            }
            return done(null, user);
    }
)) 


const scopes = ['identify', 'email',  'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: DISCORD_CLIENT_ID,
    clientSecret:DISCORD_CLIENT_SECRET,
    callbackURL:  'https://server-production-5ca0.up.railway.app/auth/discord/redirect',
    scope: scopes
},
    async function(accessToken, refreshToken, profile, done) {
           let user=await MyUsers.findOne({where:{email: profile.email}});
            if(!user){
                await MyUsers.create({email: profile.email,name:profile.username,  })
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