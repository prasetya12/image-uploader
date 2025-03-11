import express, { Request, Response } from "express";
import multer from "multer";
import mongoose, { mongo } from "mongoose";
import { uploadController, getImages, download } from "../controllers/images.controller";


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/upload", upload.single('file'), uploadController);
router.get("/", getImages);
router.get('/download/:filename', download);


export default router