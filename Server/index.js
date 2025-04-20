import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Razorpay from "razorpay";
dotenv.config();

const PORT = process.env.PORT || 5000; 

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});





app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});

    console.log(`Server is running on port ${PORT}`);
});