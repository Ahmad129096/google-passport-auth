import mongoose from 'mongoose'

const con = () =>{
    mongoose.connect('mongodb://localhost:27017/passport-app',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (req,res)=>{
        console.log(`databse running at: ${mongoose.connection.host}`)
    })
}

const userSchema = mongoose.Schema({
    uid: String,
    token: String,
    name: String,
    email:{
        type: String,
        required: "Email is required",
    },
    password:{
        type: String,
    },
    image: String
    
})

const User = mongoose.model("User", userSchema)
export {con , User}