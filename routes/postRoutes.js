import express from "express";
import dotenv from 'dotenv';
import postSchema from "../mongodb/models/posts.js";

dotenv.config();
const router = express.Router();
router.route('/getPosts').get(async(req,res) =>{
    try {
        const posts = await postSchema.find({})
        res.status(200).send({message: 'success', data: posts})
    } catch (error) {       
        res.status(400).send({message: error})
    }
})

router.route('/createPost').post(async (req,res)=>{
    const {name, description, photo} = req.body;
    try {
        const rawBase64 = await photo.replace(/data:image\/\w+;base64,/, "");
        const bufferImage = Buffer.from(rawBase64, "base64");
        const postGenerated = await postSchema.create({
            name, description, photo: bufferImage
        })
        res.status(201).send({message: 'Success', data: postGenerated})
    } catch (error) {
        res.status(400).send({message: error})
    }
})

export default router;