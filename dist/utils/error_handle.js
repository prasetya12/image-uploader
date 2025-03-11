"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_handler = exports.app_error = void 0;
class app_error extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.app_error = app_error;
const error_handler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).json({ success: false, message: err.message || "internal server error" });
};
exports.error_handler = error_handler;
