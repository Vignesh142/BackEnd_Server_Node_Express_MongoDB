## Implementation of the Backend Server using Node.js and Express.js and MongoDB database
--- 
This is the backend server implementation for the Sample application. The backend server is implemented using Node.js and Express.js and MongoDB database. The backend server provides REST APIs for the frontend to interact with the database.

### Prerequisites
- Node.js
- MongoDB
- Express.js

### Steps to run the server
1. Clone the repository
2. Navigate to the backend folder
3. Run `npm install` to install the dependencies
4. Run `npm start` to start the server

### REST APIs
- POST `/api/users/register` - Create a new user
- POST `/api/users/login` - Get a user by id
- GET `/api/users/current` - Update a user by id

- GET `/api/contacts` - Get all contacts
- POST `/api/contacts/:id` - Create a new contact
- GET `/api/contacts/:id` - Get a contact by id
- PUT `/api/contacts/:id` - Update a contact by id
- DELETE `/api/contacts/:id` - Delete a contact by id

# Middleware
- Auth middleware to authenticate the user
- Error middleware to handle errors

Connect DB  - `mongoose.connect('mongodb://localhost:27017/sample', { useNewUrlParser: true, useUnifiedTopology: true });`

### Author
- [Punna Vigneshwar]

