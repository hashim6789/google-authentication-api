# Google Authentication API

Welcome to the Google Authentication API project! This repository contains the code and documentation for a comprehensive web API that enables Google authentication for web applications using session-based authentication.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Frontend Usage](#frontend-usage)
- [Security Measures](#security-measures)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Google Authentication API is designed to provide secure user authentication via Google OAuth 2.0, utilizing session-based authentication to maintain user sessions.

## Features

- **User Registration and Login**: Authenticate users via their Google accounts.
- **Session-based Authentication**: Maintain user sessions using cookies and sessions.
- **Middleware Integration**: Easily integrate with existing Express.js applications.

## Technologies Used

- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express
- **Authentication**: Google OAuth 2.0, Passport.js
- **Security**: HTTPS, bcrypt
- **Other Libraries**: cookie-session

## Getting Started

### Prerequisites

- Node.js and npm installed
- A Google account to create OAuth 2.0 credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hashim6789/google-authentication-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd google-auth-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   DOMAIN_NAME=http://localhost
   PORT=3000
   mongoDbUri=your_mongodb_connection_string

   ```

2. Go to the Google Cloud Console:
   - Create a new project.
   - Navigate to "APIs & Services" -> "Credentials".
   - Click "Create Credentials" -> "OAuth 2.0 Client IDs".
   - Configure the consent screen.
   - Create the OAuth 2.0 client ID and copy the Client ID and Client Secret to your `.env` file.

### Running the App

Start the server:

```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Project Structure

```plaintext
google-auth-api/
├── config/
│   └── db.js
│   └── passport-setup.js
├── controllers/
│   └── authControllers.js
├── models/
│   └── User.js
├── node_modules/
├── routes/
│   └── authRoutes.js
│   └── homeRoutes.js
├── views/
│   └── _404.ejs
│   └── _500.ejs
│   └── home.ejs
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── README.md
```

## API Endpoints

### Auth Routes

- **`GET /auth/google/login`**: Redirects the user to Google’s OAuth 2.0 consent screen for login.
- **`GET /auth/google/login/callback`**: Handles the callback from Google and authenticates the user for login.
- **`GET /auth/google/signup`**: Redirects the user to Google’s OAuth 2.0 consent screen for signup.
- **`GET /auth/google/signup/callback`**: Handles the callback from Google and authenticates the user for signup.
- **`GET /auth/logout`**: Logs out the authenticated user and terminates the session.

## Frontend Usage

### User Signup Workflow

1. Navigate to `/auth/google/signup`.
2. You will be redirected to Google’s OAuth 2.0 consent screen.
3. Sign up with your Google account.
4. If the user does not already exist in the database, a new user record will be created.
5. After successful signup, the user will be redirected back to the application.

### User Login Workflow

1. Navigate to `/auth/google/login`.
2. You will be redirected to Google’s OAuth 2.0 consent screen.
3. Log in with your Google account.
4. If the user exists and is not blocked, they will be authenticated and redirected back to the application.
5. If the user does not exist or is blocked, an error message will prompt the user to sign up or unblock the account.

### User Logout Workflow

1. Navigate to `/auth/logout`.
2. The user's session will be terminated, logging them out from the application.

---

This documentation provides a structured outline for developers looking to integrate Google-based authentication in an Express application using Passport.js.

## Security Measures

- **HTTPS**: Ensure secure communication.
- **bcrypt**: Secure password hashing.
- **Session Management**: Maintain secure user sessions with cookies.
- **Rate Limiting**: Prevent abuse by limiting the number of requests.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This README provides a comprehensive overview of your Google Authentication API, making it easy for beginners to understand and use session-based authentication. Ready to get started? 🚀📚

Happy coding! 🎉✨
