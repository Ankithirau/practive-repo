

# Node.js and Express.js Blog Website

This is a basic blog website built using Node.js and Express.js. It allows users to read, create, update and delete blog posts. 

## Prerequisites

- Node.js (version 14 or above)
- MongoDB (version 4 or above)

## Getting Started

1. Clone the repository using `git clone https://github.com/your-username/node-express-blog.git`
2. Install dependencies using `npm install`
3. Create a `.env` file in the root directory and add the following environment variables:
```
MONGODB_URI=<your-mongodb-uri>
SESSION_SECRET=<your-session-secret>
```
4. Run the application using `npm start`
5. Access the application at `http://localhost:3000`

## Features

- Create a new blog post
- Read existing blog posts
- Update existing blog posts
- Delete existing blog posts
- User authentication using sessions
- Flash messages for successful or failed actions
- Responsive design using Bootstrap 5

## Folder Structure

- `controllers/` - Contains controller functions for handling requests and responses
- `models/` - Contains Mongoose models for interacting with the database
- `routes/` - Contains route definitions for the application
- `views/` - Contains the EJS templates for rendering HTML pages
- `public/` - Contains static assets such as CSS and JavaScript files
- `app.js` - The main entry point for the application

## Contributing

Contributions are welcome! Please create a new branch and submit a pull request for any changes.

## License

This project is licensed under the MIT License.
