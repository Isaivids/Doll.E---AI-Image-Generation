import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    photo:{type: String, required: true},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const postSchema = mongoose.model('post', postModel);

export default postSchema;