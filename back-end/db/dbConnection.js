const mongoose = require('mongoose')

//connectDB function
const connectDB = async()=>{
    try{                                    //try to establish a connection with the database
        await mongoose.connect('mongodb://localhost:27017/MyDataBase');
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log(error);
    }
}

module.exports=connectDB;