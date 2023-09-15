import { Request, Response, NextFunction } from "express";
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import multer from "multer";
import path from "path";
import fs from "fs";

// configures how the files are gonna be stored
const multerConfig = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File,
                           callback: (error: Error | null, destination: string) => void) {
        callback(null, 'uploads/profile_pics');
    },
    filename: function (req: Request, file: Express.Multer.File,
                        callback: (error: Error | null, filename: string) => void) {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

// File upload middleware using multer with the defined storage
const upload = multer({
    storage: multerConfig,
});

// Create an AJV instance
const ajv = new Ajv({ allErrors: true, coerceTypes: true });

// Add support for common formats (e.g. - date)
addFormats(ajv);

// Middleware function for schema validation
export function validateSchemaMiddleware(schema: any) {

    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: 'Error uploading image',
                    timestamp: new Date()
                });
            }
        const data = req.body;
        console.log(data)

        // Validate the request body against the provided schema
        const isValid = validate(data);
        if (!isValid) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // If validation is successful, continue to the next middleware/controller
        next();
        });
    };

}
