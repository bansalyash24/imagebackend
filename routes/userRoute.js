const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/userModels');
const authentication = require('../middlewares/authentication');

router.post("/register",async(req,res)=>{
    let name=req.body.name;
    let email=req.body.email
    let password=req.body.password
    try {
        const user=await User.findOne({email})
        if(user){
            return res.status(501).json({
                message:"User already exists",
                data:null,
                success:false
            })
        }
        password=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password
        })
        await newUser.save();
        return res.send({
            message:"User register successfully",
            data:newUser,
            success:true
        })
    } catch (error) {
        return res.send({
            message:error.message,
            data:null,
            success:false
        })
    }
})

router.post("/login",async(req,res)=>{
    let email=req.body.email
    let password=req.body.password
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(501).json({
                message:"User does not exists",
                data:null,
                success:false
            })
        }
        const passwordMatch=bcrypt.compare(password,user.password);
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:'1d'
        })
        if(passwordMatch){
            return res.send({
                message:"User login successfully",
                data:token,
                success:true
            })
        }else{
            return res.send({
                message:"User or password do not match",
                data:null,
                success:false
            })
        }
    } catch (error) {
        return res.send({
            message:error.message,
            data:null,
            success:false
        })
    }
})

router.post('/get-user-by-id',authentication,async(req,res)=>{
    try {
        const response=await User.findById({_id:req.body.userId});
        response.password=undefined
        return res.status(200).json({
            message:"User fetched successfully",
            data:response,
            success:true
        })
    } catch (error) {
        return res.status(401).json({
            message:error.meesage,
            data:null,
            success:false
        })
    }
})

module.exports=router