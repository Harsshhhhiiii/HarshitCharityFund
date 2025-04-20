
import {razorpay} from "./index.js";
import crypto from "crypto";
import dotenv from "dotenv";
import Payment from "./schema.js";
dotenv.config();
export const createPayment = async (req, res) => {
    const options = {
        amount: Number(req.body.amount), 

        currency: "INR",
   
    };
    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log(req.body)
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        console.log(process.env.RAZORPAY_KEY_SECRET)

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest("hex");

        const signatureValid = crypto.timingSafeEqual(
            Buffer.from(generatedSignature),
            Buffer.from(razorpay_signature)
        );
        
        if (signatureValid) {
            const paymentDetails = new Payment({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
            });
            await paymentDetails.save();
            console.log("Payment verified and saved:", paymentDetails);
       

        return res.redirect(`http://localhost:3000/payment/${razorpay_payment_id}`);

        } else {
            return res.status(200).json({ 
                message: "Payment verification failed",
                error: "Invalid signature"
            });
        }
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message
        });
    }
};