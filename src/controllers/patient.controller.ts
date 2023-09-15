import { Request, Response } from "express";
import { login, register} from "../services/patient.service";

// Controller function for patient login
export const loginController = async (req: Request, res: Response) => {
    try {
        await login(req, res); // Call the login service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
}

// Controller function for patient registration
export const registerController = async (req: Request, res: Response) => {
    try {
        await register(req, res); // Call the register service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
}
