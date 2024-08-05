# Voting Web App (MERN Stack)

## Overview
Welcome to the Voting Web App! This project is built using the MERN stack (MongoDB, Express, React, Node.js) and provides a platform for users to participate in quizzes. The application includes secure authentication options, user-centric quiz creation, and management functionalities.

## Features
- **Secure User Authentication**: Implemented secure user authentication with both custom login/logout and Google authentication options.
- **User-Centric Quiz System**: Allows users to create personalized quizzes with unique invite codes and public quizzes for wider participation.
- **Quiz Management**: Enables creators to manage their quizzes, including viewing, editing, and deleting options for enhanced control.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Custom login/logout and Google OAuth

## Installation
Follow these steps to set up and run the project locally:

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/anujkumar025/vote-app-with-MongoDB.git
    cd vote-app-with-MongoDB
    ```

2. **Install dependencies**

    For the backend:
    ```bash
    cd server
    npm install
    ```

    For the frontend:
    ```bash
    cd ../frontend
    npm install
    ```

3. **Environment Variables**

    Create a `.env` file in the `backend` directory and add the following:
    ```env
    MONGO_URI=your_mongodb_uri
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. **Run the application**

    Start the backend server:
    ```bash
    cd server
    nodemon app.js
    ```

    Start the frontend development server:
    ```bash
    cd ../frontend
    npm start
    ```

    The frontend server will typically run on `http://localhost:3000` and the backend server on `http://localhost:5000`.

## Deployment
The application is deployed and accessible at [Deployment Link](https://66b12d45561fe1081d218b62--classy-sorbet-08fbc5.netlify.app/).

## Usage
1. **Register/Login**: Users can register with an email and password or use Google authentication to log in.
2. **Create Quizzes**: Authenticated users can create personalized quizzes with unique invite codes or public quizzes.
3. **Manage Quizzes**: Users can view, edit, and delete their quizzes.
4. **Participate in Quizzes**: Users can join quizzes using invite codes or participate in public quizzes.

## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a pull request.

## License
This project is licensed under the MIT License.
