import JwtStrategy from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

const jwtstrategy = (passport)=>{
    var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'http://localhost:3000';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            console.log(user)
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
}


export { jwtstrategy}