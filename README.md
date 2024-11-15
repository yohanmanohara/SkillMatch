# Recruitwise Project

This repository contains the Recruitwise project, including client and server configurations, authentication setup, and environment details.

---

## Client Environment Variables

Add the following environment variable to the `.env` file in the `client` folder:

```env
NEXT_PUBLIC_SERVER_URL="http://localhost:5000"


PORT=5000
MONGO_URI=mongodb+srv://Recruitwise:recruitwise@recruitwise.us4pdz2.mongodb.net/
JWT_SECRET=secret
EMAIL=warushayohan80@gmail.com
EMAIL_PASSWORD=wlasedetnswsefnc

Here is the complete README.md content you can copy and paste:

markdown
Copy code
# Recruitwise Project

This repository contains the Recruitwise project, including client and server configurations, authentication setup, and environment details.

---

## Client Environment Variables

Add the following environment variable to the `.env` file in the `client` folder:

```env
NEXT_PUBLIC_SERVER_URL="http://localhost:5000"
This variable is used to connect the client application to the server.

Authentication Server Environment Variables
Add the following environment variables to the .env file in the server folder:

env
Copy code
PORT=5000
MONGO_URI=mongodb+srv://Recruitwise:recruitwise@recruitwise.us4pdz2.mongodb.net/
JWT_SECRET=secret
EMAIL=warushayohan80@gmail.com
EMAIL_PASSWORD=wlasedetnswsefnc
Details:
PORT: Specifies the server's running port (default: 5000).
MONGO_URI: MongoDB connection string for database integration.
JWT_SECRET: Secret key for signing and verifying JSON Web Tokens.
EMAIL/EMAIL_PASSWORD: Credentials for email services (e.g., for sending verification or notification emails).
Authentication Roles and Credentials
The system supports three roles: Admin, Employer, and Employee. Use the following credentials for testing or administrative purposes:

Role: Admin
Email: admin@gmail.com
Password: admini
Role: Employer
Email: recruitwise.info@gmail.com
Password: yohanmano
Role: Employee
Email: warushayohan80@gmail.com
Password: yohanmano
