# Real-time Chat Application

This is a simple chat application that uses WebSockets for real-time communication and includes user authentication.

## Features

- User registration and authentication
- Real-time messaging using WebSockets
- Message history storage and retrieval
- Simple and intuitive user interface

## Technical Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- Database: MongoDB
- WebSockets: ws library

## Setup Instructions

1. Install Node.js and MongoDB on your system.
2. Clone this repository.
3. Navigate to the server directory: `cd chat-app/server`
4. Install dependencies: `npm install`
5. Start the MongoDB service on your system.
6. Start the server: `node server.js`
7. Open `client/index.html` in your web browser.

## Code Structure

- `server/`: Contains all server-side code
  - `config/`: Database configuration
  - `models/`: Mongoose models for User and Message
  - `routes/`: Express routes for authentication and messages
  - `websocket/`: WebSocket handling logic
  - `middleware/`: Authentication middleware
  - `server.js`: Main server file
- `client/`: Contains all client-side code
  - `css/`: Styles for the application
  - `js/`: Client-side JavaScript
  - `index.html`: Main HTML file

## Authentication Implementation

- User credentials are stored securely using bcrypt for password hashing.
- JSON Web Tokens (JWT) are used for maintaining user sessions.
- The server validates the JWT for each WebSocket connection and API request.

## WebSocket Implementation

- WebSocket connections are established after successful user authentication.
- Real-time messages are broadcasted to all connected clients.
- Messages are stored in the database and can be retrieved for chat history.

## Security Considerations

- Passwords are hashed before storage.
- JWTs are used for secure authentication.
- Input validation should be implemented to prevent injection attacks.
- In a production environment, use HTTPS and secure WebSocket connections (WSS).

## Future Improvements 

- Improve UI/UX with more interactive elements and responsive design.
- Implement message encryption for enhanced privacy.
- Add support for file sharing and multimedia messages.
- Implement user typing indicators and read receipts.
- Add support for chat rooms or group chats.
- Implement a more robust authentication system with email verification and password reset functionality.
- Add unit and integration tests for both frontend and backend code.
- Implement rate limiting to prevent abuse of the API and WebSocket connections.
- Add logging and monitoring for better debugging and performance tracking.

## API Documentation

### Authentication Endpoints

1. Register User
   - URL: `/api/auth/register`
   - Method: `POST`
   - Body: `{ username, password, email }`
   - Response: `{ message: "User registered successfully" }`

2. Login User
   - URL: `/api/auth/login`
   - Method: `POST`
   - Body: `{ username, password }`
   - Response: `{ message: "Login successful", token: "JWT_TOKEN" }`

### Message Endpoints

1. Get Recent Messages
   - URL: `/api/messages`
   - Method: `GET`
   - Headers: `Authorization: Bearer JWT_TOKEN`
   - Response: Array of message objects

## WebSocket Protocol

- Connect to WebSocket server with JWT token: `ws://server-url?token=JWT_TOKEN`
- Send message: `{ content: "message content" }`
- Receive message: `{ sender: "user_id", content: "message content", timestamp: "ISO_DATE_STRING" }`

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

