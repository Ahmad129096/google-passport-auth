import express from "express";
import passport from "passport";
import { googlePassport } from "./config/googlePassport.js";
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
const app = express();

dotenv.config();
googlePassport(passport);

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

app.set("view engine", "ejs");

app.use(passport.initialize())
app.use(passport.session())

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get('/',(req,res)=>{
    res.render("pages/home")
})

app.get('/success', isLoggedIn, (req, res) =>{
    res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

app.get("/auth/google/callback", passport.authenticate("google",{failureRedirect: '/failed'}),(req,res)=>{
    res.redirect('/success')
});

app.get('/logout',(req,res)=>{
    req.session = null;
    req.logout();
    res.redirect('/')

})

app.listen(3000, () => {
  console.log("Server is running of http://localhost:3000");
});
