const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();
const authRouter=require('./routes/auth')
const port=process.env.PORT;
const MONGO_URI=process.env.MONGO_URI;
console.log("port: ",port)
app.use(cors())
app.use('/auth',authRouter.router)
app.get('/',(req,res)=>{
    res.send("hello world!")
})

try{
    mongoose.connect(MONGO_URI).then(()=>{
        console.log("DB connected Successfully")
    })
}
catch(err){
    console.log("error in db connection")
    console.log(err)
}
app.listen(port,()=>{
    console.log(`server is running on ${8080}`)
})