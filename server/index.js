//import express
const express = require('express')

//import dataService 
const dataService = require('./servise/dataService')

//import json webtoken

const jwt=require('jsonwebtoken')

// import cors

const cors=require('cors')



// create an app using express

const app = express()

//to use cors set orgin

app.use(cors({
    origin:'http://localhost:4200'
}))

// parse app into json

app.use(express.json())

// application specific miidle ware

const logMiddleWrare=(req,res,next)=>{
    console.log("middle Ware");
    next()
    
}

app.use(logMiddleWrare)

//set port your servsr

app.listen(4000, () => {

    console.log("server started at port no:4000");

});

// setting up bank server

// jwtMiddleware

const jwtMiddleware=(req,res,next)=>{
    try{ 
        const token=req.headers["x-access-token"]
        console.log(jwt.verify(token,'superscreateprivatekey12345'));
        const  data = jwt.verify(token,'superscreateprivatekey12345');
        req.currentAcNo=data.currentAcNo;
        next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"please login"

        })
            

    
    }
}
  






// register api

app.post('/register', (req, res) => {

    //asyncronous
    
    dataService.register(req.body.uname, req.body.acno, req.body.password)
    .then( result=>{
        res.status(result.statusCode).json(result)
    })

   

})

// login api

app.post('/login',(req,res)=>{
    dataService.login(req.body.acno,req.body.pswd)
    .then(result=>
        res.status(result.statusCode).json(result)
    )
    

})

// deposit api

app.post('/deposit',jwtMiddleware,(req,res)=>{
   
    dataService.deposit(req.body.acno,req.body.pswd,req.body.amt).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    

})
// wthdraw api

app.post('/withdraw',jwtMiddleware,(req,res)=>{
   dataService.withdraw(req,req.body.acno,req.body.pswd,req.body.amt).then(
     result=>{
        res.status(result.statusCode).json(result)
       }
   )
   
})


//transaction api
app.post('/transaction',jwtMiddleware,(req,res)=>{
    dataService.getTransaction(req.body.acno)
    .then(result=>{
    res.status(result.statusCode).json(result)
    }
  )
    

})

//delete api
app.delete('/delete/:acno',(req,res)=>{
    console.log(req.params.acno);
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })

})










// app.get('/', (req, res) => {

//     res.send("GET METHOD")

// });
// app.put('/', (req,res)=>{

//     res.send("put METHOD")

// });
// app.patch('/', (req,res)=>{

//     res.send("GET METHOD")

// });
// app.delete('/', (req,res)=>{

//     res.send("delete METHOD")

// });




