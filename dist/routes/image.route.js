"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const images_controller_1 = require("../controllers/images.controller");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post("/upload", upload.single('file'), images_controller_1.uploadController);
router.get("/", images_controller_1.getImages);
router.get('/download/:filename', images_controller_1.download);
exports.default = router;
