const express=require('express');
const cloudinary=require('../utils/cloudinary')
const ImageUpload=require('../models/imageModel');
const authentication = require('../middlewares/authentication');
const router=express.Router();

router.post('/upload-image',authentication,async(req,res)=>{
    let title=req.body.title
    let description=req.body.description
    let image=req.body.image
    try {
        const result=await cloudinary.uploader.upload(image,{
            folder:"images",
            width:300,
            height:300,
            crop:"scale"
        })
        const newObj=new ImageUpload({
            title,
            description,
            image:{
                public_id:result.public_id,
                url:result.secure_url
            }
        })
        await newObj.save();
        res.status(200).json({
            message:'Image upload successfully',
            data:null,
            success:true
        })
    } catch (error) {
        res.status(401).json({
            message:error.message,
            data:null,
            success:false
        })
    }
})

router.post('/all-image',authentication,async(req,res)=>{
    try {
        const result=await ImageUpload.find();
        return res.status(200).json({
            message:"Fetched successfully",
            data:result,
            success:true
        })
    } catch (error) {
        return res.status(501).json({
            message:error.message,
            data:'',
            success:false
        })
    }
})

router.post('/only-image',authentication,async(req,res)=>{
    try {
        const result=await ImageUpload.findOne({_id:req.body.id});
        let views=result.views;
        let ver=false;
        views.forEach(element => {
            if(element==req.body.userId) ver=true;
        });
        if(!ver){
            views.push(req.body.userId)
            result.views=views;
            await result.save()
        }
        return res.status(200).json({
            message:"Fetched successfully",
            data:result,
            success:true
        })
    } catch (error) {
        return res.status(501).json({
            message:error.message,
            data:'',
            success:false
        })
    }
})


module.exports=router