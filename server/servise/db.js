// to connect server with mongodb

//import mongoose

const mongoose = require('mongoose')

// coonect with mangoose

mongoose.connect('mongodb://localhost:27017/BankAppAngular',{
    useNewUrlparser:true
})
// to create the model

const User=mongoose.model('User',{
    acno:Number,
    uname:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}