const mongoose=require('mongoose')
mongoose.connect(process.env.MONGO_URL);

const db=mongoose.connection;

db.on("connected",()=>{
    console.log("Mongodb connection successful");
})

db.on("error",()=>{
    console.log("Mongodb connection failed");
})