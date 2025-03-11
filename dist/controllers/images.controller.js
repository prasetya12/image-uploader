"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.getImages = exports.uploadController = void 0;
const error_handle_1 = require("../utils/error_handle");
const database_1 = require("../config/database");
const Images_1 = __importDefault(require("../entities/Images"));
const helper_1 = require("../utils/helper");
const uploadController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new error_handle_1.app_error("No file uploaded", 400);
        }
        const { sanitizedBaseName, ext } = (0, helper_1.sanitizeFilename)(req.file.originalname);
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}_${sanitizedBaseName}${ext}`;
        const uploadStream = database_1.gridFSBucket.openUploadStream(uniqueFilename, { contentType: req.file.mimetype });
        uploadStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const metadata = new Images_1.default({
                contentType: (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype,
                filename: uniqueFilename,
                createdAt: new Date()
            });
            yield metadata.save();
            uploadStream.destroy();
            res.status(201).json({
                success: true,
                message: 'File uploaded successfully',
                fileName: uniqueFilename
            });
        }));
        uploadStream.on("error", (err) => {
            console.error("Upload error:", err);
            uploadStream.destroy();
            throw new error_handle_1.app_error("File upload failed", 500);
        });
        uploadStream.end(req.file.buffer);
    }
    catch (error) {
        next(error);
    }
});
exports.uploadController = uploadController;
const getImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield Images_1.default.find().sort({ uploadDate: -1 });
        res.status(200).json({
            data: images
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getImages = getImages;
const download = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.filename, 'halo');
        const files = yield database_1.gridFSBucket.find({ filename: req.params.filename }).toArray();
        if (!files || files.length === 0) {
            throw new error_handle_1.app_error('file not found', 404);
        }
        const read_stream = database_1.gridFSBucket.openDownloadStreamByName(req.params.filename);
        read_stream.pipe(res);
    }
    catch (error) {
        next(error);
    }
});
exports.download = download;
