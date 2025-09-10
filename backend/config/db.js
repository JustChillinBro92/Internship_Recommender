import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,    
        })
        .then(()=>console.log("MongoDB connected!"));
    } catch (err) {
        console.log("MongoDB connection failed: ", err.message);
        process.exit(1);
    }
}
