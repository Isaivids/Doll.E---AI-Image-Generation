import express from "express";
import dotenv from 'dotenv';
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
        const {description,count} = req.body;
        console.log(req.body)
        const aiResponse = await openai.createImage({
            prompt: description,
            n: parseInt(count),
            size: '1024x1024',
            response_format: 'b64_json'
        })
        // const aiResponseURL = await openai.createImage({
        //     prompt: description,
        //     n: parseInt(count),
        //     size: '1024x1024',
        //     response_format: 'url'
        // })
        // console.log(aiResponseURL.data.data[0].url)
        //256x256, 512x512
        res.status(200).send({photo: aiResponse.data.data})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error})
    }
})
export default router;