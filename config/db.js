import mongoose from "mongoose";

const configureDB = async ()=>{
    const dburl = "mongodb://localhost:27017/user-auth";
    try {
        const db = await mongoose.connect(dburl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};


export default configureDB;