import googleStrategy from "passport-google-oauth20";
import { User } from "./database/db.js";
import generateToken from './generateToken.js'
const googlePassport = (passport) => {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
        // passReqToCallback: true,
      },
      (token,accessToken, refreshToken, profile, next) => {
        // console.log(profi)
        User.findOne({ 'uid': profile.id }, async (err, user) => {
          console.log(profile)
          if(user)
          return next(null, user);
          else{
            const user = new User({
              uid: profile.id,
              name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            })

            const newuser = await user.save();
            return next(null, newuser)
          }
          return next(err, user);

        });
      }
    )
  );
  passport.serializeUser((user,next)=>{
      next(null,user)
  })
  passport.deserializeUser((user,next)=>{
    next(null,user)
  })
};

export { googlePassport };
