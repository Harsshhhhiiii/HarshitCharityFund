import express from 'express';
import paymentRoutes from './paymentRoutes.js';
import cors from 'cors';


 const app = express();

 app.use(cors({
       origin: ["http://localhost:3000","https://harshit-charity-fund.vercel.app","https://harshit-charity-fund-harshits-projects-99ccb490.vercel.app"],
       methods: ["GET", "POST"],
       credentials: true,
 }));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use("/api", paymentRoutes);
 app.get('/api/getkeys', (req, res) => {
        res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });

 })

 export default app;