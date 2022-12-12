const express=require('express')
const bodyParser=require('body-parser')
const dbConfig=require('./config/dbConfig');
const app=express();
app.use(bodyParser.json({limit:'5000kb'}))

require("dotenv").config();
app.use(express.json());
const port=process.env.PORT || 5000
const userRoutes=require('./routes/userRoute');
const imageRoute=require('./routes/imageRoute');
app.use('/api/users',userRoutes)
app.use('/api/upload',imageRoute)
const path = require("path");

app.listen(port,(req,res)=>{
    console.log("Server listening on port " + port);
})
