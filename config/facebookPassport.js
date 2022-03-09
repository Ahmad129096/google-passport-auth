import FacebookStrategy from 'passport-facebook'

const facebookStretegy = (passport)=>{
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, cb) {
       console.log(profile)
      }
    ));
}


export { facebookStretegy }