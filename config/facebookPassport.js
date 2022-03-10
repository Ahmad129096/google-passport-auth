import FacebookStrategy from 'passport-facebook'
import {User} from './database/db.js'

const facebookStretegy = (passport)=>{
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, next) {
        User.findOne({ 'uid': profile.id }, async (err, user) => {
          console.log(profile)
          if(user)
          return next(null, user);
          else{
            const user = new User({
              uid: profile.id,
              name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
            })

            const newuser = await user.save();
            return next(null, newuser)
          }
          return next(err, user);

        });
      }
    ));
}


export { facebookStretegy }