const passport=require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
const GithubStrategy =require('passport-github2').Strategy;
require('dotenv').config();
const {MyUsers}=require('./dataBase/descriptionDB');
const GOOGLE_CLIENT_ID='123235015155-rf6n17fn2vslogrejtafkgrfu65inoq2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='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';
const GITHUB_CLIENT_ID='Iv1.c43e2f92613ed195';
const GITHUB_CLIENT_SECRET='4cd8a7b73684badf4800e857c40da28893e8ac7b';

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

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret:GITHUB_CLIENT_SECRET,
    /* scope: ['user:email'], */
    callbackURL:'http://localhost:5000/auth/github/callback',
},
    async function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        
        /* let res=await fetch('https://api.github.com/user/emails',{
            headers:{
                'User-Agent':    'JavaScript.ru',
              'Authorization': 'token ' + accessToken
            }
        })
        let data=await res.json();
        console.log(data) */
           /* let user=await MyUsers.findOne({where:{email: profile._json.email}});
            if(!user){
                await MyUsers.create({email: profile._json.email,name:profile._json.name,  })
            }
            return done(null, user); */  
    }
))

 passport.serializeUser((user, done)=>{
    done(null,user)
});

passport.deserializeUser((user, done)=>{
    done(null,user);
}) 