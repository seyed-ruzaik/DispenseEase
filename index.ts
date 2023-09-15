import {database} from "./config/database";
import express from "express";
import {patientRoutes} from "./src/routes/patient.routes";


(async () => {
    const app = express();

    const cors = require("cors");

    app.use(cors());

    /**
     * Creating the index router endpoint
     */
    app.get("/", (_req,
                  res) => res.send("Welcome to DispenseEase-API"));


    /**
     * 1. Serves static files from the 'uploads' directory for /uploads route.
     * 2. Parses incoming JSON data with a maximum limit of 20 megabytes.
     * 3. Parses incoming URL-encoded data with a maximum limit of 20 megabytes,
     * and allows parsing of nested objects using the qs library.
     */

    app.use('/uploads', express.static('uploads'));
    app.use(express.json({limit: "20mb"}));
    app.use(express.urlencoded({limit: "20mb", extended: true}));


    /**
     * DB Initializing
     * using config/database
     */
    await database
        .authenticate()
        .then(async () => {
            console.log('Database connection has been established successfully.');
        })
        .catch((e) => {
            throw 'Unable to connect to the database: ' + e;
        });

    /**
     * Cross-Origin
     */
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Credentials", 'true');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        next();
    });


    /**
     * Routers are importing from src/routes
     */
    app.use("/patient", patientRoutes);


    /**
     * Application PORT number using APP_PORT value from .env
     */
    app.listen(process.env.APP_PORT || 3001, async () => {
        console.log(
            "DispenseEase API : " + process.env.APP_PORT || 3001
        );
    });

})();

