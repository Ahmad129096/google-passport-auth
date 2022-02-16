import googleStrategy from "passport-google-oauth20";

const googlePassport = (passport) => {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
        // passReqToCallback: true,
      },
      (accessToken, refreshToken, profile, next) => {
        console.log(profile);
        return next(null, profile);
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
