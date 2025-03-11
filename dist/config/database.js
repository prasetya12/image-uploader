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
exports.gridFSBucket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_handle_1 = require("../utils/error_handle");
dotenv_1.default.config();
const mongodb = mongoose_1.default.mongo;
const str = process.env.MONGO_URI;
if (!str) {
    throw new error_handle_1.app_error(" connection string missing", 500);
}
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield mongoose_1.default.connect(str, {
            authSource: "admin"
        });
        const db = mongoose_1.default.connection.db;
        if (!db) {
            console.error(" connection is not initialized properly.");
            process.exit(1);
        }
        exports.gridFSBucket = new mongodb.GridFSBucket(db, { bucketName: "uploads" });
    }
    catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("connection error:", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.error("disconnected");
});
mongoose_1.default.connection.on("reconnectFailed", () => {
    console.error(" failed to reconnect.");
});
exports.default = connectDB;
