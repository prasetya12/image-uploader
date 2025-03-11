"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFilename = void 0;
const path_1 = __importDefault(require("path"));
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const sanitizeFilename = (originalFileName) => {
    if (!originalFileName) {
        return { sanitizedBaseName: "", ext: "" };
    }
    const ext = path_1.default.extname(originalFileName);
    const baseName = path_1.default.basename(originalFileName, ext);
    const sanitizedBaseName = (0, sanitize_filename_1.default)(baseName).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 50);
    return { sanitizedBaseName, ext };
};
exports.sanitizeFilename = sanitizeFilename;
