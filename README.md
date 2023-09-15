DispenseEase
====================

DispenseEase is a backend application designed to facilitate patient management for Dr. Perry's dispensary. This system provides two main endpoints: patient/register for patient registration and patient/login for patient login. It allows patients to create accounts, log in, and access their basic information.


Table of Contents
=================
* 1. Features
* 2. Setup Instructions
* 3. API Endpoints
* 4. Data Validation
* 5. Error Handling
* 6. Contributing
* 7. License

# Features

DispenseEase offers the following features:

## 1. Patient Management:

Patients can register by providing their First Name, Last Name, Mobile Number, Email, and a Profile Picture.
Email serves as the username, and patients need to set a password during registration.
Registered patients can log in using their email and password.

## 2. Dashboard:

Upon successful login, patients are directed to a dashboard displaying their entered information.

## 3. Data Validation:

Request body validation using AJV

## 4. Error Handling:

Proper error handling and error responses for all endpoints

# Setup Instructions

To set up and run DispenseEase, follow these steps:

## 1. Install the dependencies:

npm install

## 2. Configure the database:

Create a MySQL database and user for the application.
Update the database credentials in the config/config.json file.

## 3. Run the database migrations:

npx sequelize db:migrate

## 4. Seed the database with initial data:

npx sequelize db:seed:all

## 5. Start the server:

npm run dev

The server will run at http://localhost:3001


API Endpoints
=============

1. Patient Management:

* POST /patient/register: Register a new patient
* POST /patient/login: Login an existing patient


Data Validation
===============

Request bodies are validated using AJV wherever it's necessary to ensure that the data provided is valid and meets the required format.


Error Handling
==============

The API endpoints are designed to handle errors gracefully and provide meaningful error responses.


Contributing
============

Contributions to DispenseEase are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


License
=======

DispenseEase is open-source software licensed under the MIT License.


Conclusion
==========

This README provides an overview of DispenseEase, its features, setup instructions, API endpoints, data validation, error handling, and information on contributing and licensing. Customize it further with specific details relevant to your project.

