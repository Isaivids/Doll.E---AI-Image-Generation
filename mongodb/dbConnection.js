import mongoose from "mongoose";

const dbConnection = (url)=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
        .then(()=> console.log('Mongo DB connection successful'))
        .catch((err) => console.log(err))
}

export default dbConnection;