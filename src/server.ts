import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import ImageRoutes from './routes/image.route'
const app = express();
app.use(express.json());
app.use(cors());



app.use("/api/images", ImageRoutes);


const start = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
}

start();

