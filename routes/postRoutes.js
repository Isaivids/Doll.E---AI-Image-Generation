import express from "express";
import dotenv from 'dotenv';
import postSchema from "../mongodb/models/posts.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

router.route('/getPosts').get(async(req,res) =>{
    try {
        const posts = await postSchema.find({})
        res.status(200).send({message: 'success', data: posts})
    } catch (error) {       
        res.status(400).send({message: error})
    }
})

router.route('/createPost').post(async (req,res)=>{

    try {
        const {name, description, photo} = req.body;
        // const buff = Buffer.from(photo, "utf-8")
        const photoUrl = await cloudinary.uploader.upload('data:image/png;base64,' + photo);
        const postGenerated = await postSchema.create({
            name,
            description,
            photo: photoUrl.url,
        })
        res.status(201).send({message: 'Success', data: postGenerated})
    } catch (error) {
        res.status(400).send({message: error})
    }
})

export default router;