import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Patient from "../models/patient";
import {getImageUrl} from "../helpers/image.helper";
import {authHelpers} from "../helpers/patient.helper";
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

// Register a new patient
export const register = async (req: Request, res: Response) => {
        const {first_name, last_name, mobile_number, email, password} = req.body;
        console.log(email)
        const helperStatus = await authHelpers(res, req, email, password);
        if (helperStatus == true) {
            /**
             * Hashing password using 10 saltRounds
             */
            const hashedPassword = await bcrypt.hash(password, 10);
            if (password.toString().length > 2) { //Create a new patient
                let lowerCaseEmail: string = email.toLowerCase(); //convert the string to lowercase

                try {
                    // Create a new patient in the database
                    await Patient.create({
                        first_name: first_name,
                        last_name: last_name,
                        mobile_number: mobile_number,
                        email: lowerCaseEmail,
                        password: hashedPassword,
                        image: req.file ? req.file.filename : null
                    });
                    res.status(201).send({message: "Account created successfully"}); //success message
                } catch (error) {
                    if (req.file) {
                        fs.unlinkSync(req.file.path);
                    }
                    res.status(400).send({message: error.message});
                }
            } else {
                if (password.length <= 2) { //Error message if password length is short
                    if (req.file) {
                        fs.unlinkSync(req.file.path);
                    }
                    res.status(400).send({message: "Password is short!"});
                }
            }
        }
};

// Patient login
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    //finding the patient using the email
    const patient = await Patient.findOne({where: {email: email},});
    if (!patient) {
        res.status(400).send({message: "Incorrect email!"});//error message if patient cannot be find
    } else { //checking if password is correct or not using bcrypt.compare method
        await bcrypt.compare(password, <string>patient?.password, (error, response) => {
            if (response) {
                try {
                    // Create a trimmed-down patient object to send in the response (Dashboard)
                    const Dashboard = {
                        first_name: patient.first_name,
                        last_name: patient.last_name,
                        mobile_number: patient.mobile_number,
                        email: patient.email,
                        picture: getImageUrl(patient.image)
                    };
                    res.send({Dashboard}); //send the data
                }catch (error) { res.status(400).send({message: error.message});}
            } else {
                res.status(401).send({message: "Password is Incorrect!, " +
                        "Please try again."});//error message if password is incorrect

            }
        });
    }
};

