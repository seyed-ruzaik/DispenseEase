import {Request, Response} from "express";
import {isAllPresent} from "../validations/validator";
import Patient from "../models/patient";
import fs from "fs";

/**
 * Auth helper function...
 */
export async function authHelpers(res: Response,req: Request,
                                  email: string, password: string) {
    let status = false;
    try {
        const existingPatient = await Patient.findOne({where: {email: email,},}); //check for an existing patient using the email
        if (existingPatient) {
            //patient already exist error message
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).send({message: "A Patient With the Same Email Already Exists!"});
        }else {
            if (isAllPresent(password)) {
                    status = true;
            }else { //Error message if Password does not contain an upper,lower,symbol or a number
                if (!isAllPresent(password)) {
                    if (req.file) {
                        fs.unlinkSync(req.file.path);
                    }
                    res.status(400).send({
                        message: "Password should contain an upper," +
                            " lower, symbol and a number"
                    });
                }
            }
        }
        return status;
    } catch (error) {
        /**
         * Error message
         */
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).send({error: "Error: " + error.message + "\nTimestamp: " + new Date()});
    }
}
