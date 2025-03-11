
import { type Request, type Response, type NextFunction } from "express";
import { app_error } from "../utils/error_handle";
import { gridFSBucket } from "../config/database";
import Images from "../entities/Images";
import { sanitizeFilename } from "../utils/helper";
interface file_param {
    filename: string;
}
export const uploadController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        if (!req.file) {
            throw new app_error("No file uploaded", 400);
        }

        const { sanitizedBaseName, ext } = sanitizeFilename(req.file.originalname)

        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}_${sanitizedBaseName}${ext}`;
        const uploadStream = gridFSBucket.openUploadStream(uniqueFilename, { contentType: req.file.mimetype });

        uploadStream.on('finish', async () => {

            const metadata = new Images({
                contentType: req.file?.mimetype,
                filename: uniqueFilename,
                createdAt: new Date()
            });

            await metadata.save();
            uploadStream.destroy()
            res.status(201).json({
                success: true,
                message: 'File uploaded successfully',
                fileName: uniqueFilename
            })
        });

        uploadStream.on("error", (err: any) => {
            console.error("Upload error:", err);
            uploadStream.destroy();
            throw new app_error("File upload failed", 500);
        });
        uploadStream.end(req.file.buffer);
    } catch (error) {
        next(error);
    }

}

export const getImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images = await Images.find().sort({ uploadDate: -1 });

        res.status(200).json({
            data: images
        });

    } catch (error) {
        next(error)
    }
}

export const download = async (req: Request<file_param>, res: Response, next: NextFunction): Promise<void> => {
    try {

        console.log(req.params.filename, 'halo')
        const files = await gridFSBucket.find({ filename: req.params.filename }).toArray();

        if (!files || files.length === 0) {
            throw new app_error('file not found', 404);
        }
        const read_stream = gridFSBucket.openDownloadStreamByName(req.params.filename);
        read_stream.pipe(res);
    } catch (error) {
        next(error);
    }
};