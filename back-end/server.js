const express =   require('express');
const app = express();
const port = 8000;

const cors=require('cors');

//import connectDB function and call it
const connectDB=require('./db/dbConnection');

//importing User collection of DB
const User = require('./db/users');

//Middleware for parsing Json
app.use(express.json());

//enable cors
app.use(cors());

app.post('/register',async(req,res)=>{
    try{
        const{username,password}=req.body;
        console.log(req.body);
        //user is new object of collection User
        const user =new User({username,password});
        //user details saved in MONGODB
        await user.save();
        res.status(201).json({message:'Registration Succesfully'});
    }
    catch(error){
        res.status(500).json({error:"Registration failed"})
    }
})

//LOGIN

 app.post('/login',async(req,res)=>{
    try{
        const{username,password}=req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({error:"Invalid Username or password"});
        }
        //if one of user is selected from database
        if(user.password !== password){

            //Bug in the code if username matches we can acces the passsword
            console.log(user.password);

            return res.status(401).json({error:"Invalid username or password"});
        }
        res.status(200).json({message:'Login Succesfull'})
    }
    catch(error){
           res.send(500).json({error:"login failed "})
    }
 })


connectDB();

app.listen(port,()=>{
    console.log("Server is running on PORT 8000")
});

