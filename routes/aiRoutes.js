import express from "express";
import dotenv from 'dotenv';
import postSchema from "../mongodb/models/posts.js";
import {Configuration, OpenAIApi} from 'openai'
dotenv.config();
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.send('This is from generate')
})

router.route('/generate').post(async(req,res)=>{
    try {
        const {description} = req.body;
        const aiResponse = await openai.createImage({
            prompt: description,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })
        const imageGenerated = aiResponse.data.data[0].b64_json;
        res.status(200).send({photo: imageGenerated})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error})
    }
})
export default router;