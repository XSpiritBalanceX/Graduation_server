const {Router}=require('express');
const authRouter=new Router();
const authController=require('../controllers/authController');
const authMiddleware=require('../middleware/authMiddleware');
const GoogleStrategy=require('passport-google-oidc');
const passport=require('passport');
const {MyUsers}=require('../dataBase/descriptionDB');

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
//authRouter.get('/auth',authMiddleware, authController.check )
/* authRouter.get('/login/google', passport.authenticate('google'));
authRouter.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ]
  }, function verify(issuer, profile, cb) {
    MyUsers.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      issuer,
      profile.id
    ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) {
        MyUsers.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
  
          var id = this.lastID;
          MyUsers.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            issuer,
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id,
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        MyUsers.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
          if (err) { return cb(err); }
          if (!row) { return cb(null, false); }
          return cb(null, row);
        });
      }
    });
  })); */

module.exports=authRouter;