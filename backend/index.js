const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();
const authRouter=require("./routes/auth")
const mediaRouter=require("./routes/media")
const port=process.env.PORT;
const path=require('path');
const MONGO_URI=process.env.MONGO_URI;
console.log("port: ",port)
app.use(cors())
app.use(express.static(path.join(__dirname, "dist")));
app.use('/auth',authRouter)
app.use('/media',mediaRouter)
// app.get('/',(req,res)=>{
//     res.send("hello world!")
// })
app.get('*', (req, res,next) => {

    if(req.path.includes('.')){
      next();
    }
    else{
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } 
  });

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
app.get('/',(req,res)=>{
    res.json({status:'success'});
});