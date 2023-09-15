// Import the required controllers from the patient.controller file
import {loginController, registerController} from "../controllers/patient.controller";
import {validateSchemaMiddleware} from "../middlewares/ajv-handler";
import {registerSchema, loginSchema} from "../schema/patient.schema";

// Import the express module to create a router
import express from "express";

// Create a new express router
const router = express.Router();

// Route to handle patient registration
router.post("/register", validateSchemaMiddleware(registerSchema), registerController);

// Route to handle patient login
router.post("/login", validateSchemaMiddleware(loginSchema), loginController);


// Export the router as patientRoutes
export const patientRoutes = router;
