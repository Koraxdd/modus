import multer from "multer"
import { AppError } from "../errors/AppError"

export function allow(types: string[]): multer.Options["fileFilter"] {
    return (_req, file, callback) => {
        if (types.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new AppError(400, "Unsupported file type"))
        }
    }
}
