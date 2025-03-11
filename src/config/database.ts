import mongoose from "mongoose";
import dotenv from "dotenv";
import { GridFSBucket } from "mongodb";
import { app_error } from "../utils/error_handle";
dotenv.config();
const mongodb = mongoose.mongo;


const str = process.env.MONGO_URI;
if (!str) {
    throw new app_error(" connection string missing", 500);
}
export let gridFSBucket: GridFSBucket;
const connectDB = async (): Promise<void> => {
    try {

        const connection = await mongoose.connect(str, {
            authSource: "admin"
        });
        const db = mongoose.connection.db;
        if (!db) {
            console.error(" connection is not initialized properly.");
            process.exit(1);
        }

        gridFSBucket = new mongodb.GridFSBucket(db, { bucketName: "uploads" });
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};


mongoose.connection.on("error", (err) => {
    console.error("connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.error("disconnected");
});

mongoose.connection.on("reconnectFailed", () => {
    console.error(" failed to reconnect.");
});
export default connectDB;