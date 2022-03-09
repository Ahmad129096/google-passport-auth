import express from "express";
import passport from "passport";
import { googlePassport } from "./config/googlePassport.js";
import {facebookStretegy} from './config/facebookPassport.js'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
import { con } from "./config/database/db.js";
const app = express();

con();
dotenv.config();
googlePassport(passport);
facebookStretegy(passport);

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

app.get('/success',isLoggedIn, (req, res) =>{
    res.render("pages/profile",{
        user: req.user
    })
})

// app.get('/success', (req, res) =>{
//     res.send("your are a valid user")
// })

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// Google Passport Auth
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

app.get("/auth/google/callback", passport.authenticate("google",{failureRedirect: '/failed'}),(req,res)=>{
    res.redirect('/success')
});


// Facebook Passport Auth

app.get('/auth/facebook',
  passport.authenticate('facebook',{
    scope: 'email' 
  }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });

app.get('/logout',(req,res)=>{
    req.session = null;
    req.logout();
    res.redirect('/')

})

app.listen(3000, () => {
  console.log("Server is running of http://localhost:3000");
});
