# Lost and Found

A web application that helps users report and find lost items. It features a secure platform where users can post details about lost or found items, browse through listings, and make claims on found items. The application includes a secure image access system to protect user privacy.

## Features

- **User Authentication**: Secure sign-up and login using JWT.
- **Report Items**: Users can post details and upload images for both lost and found items.
- **Browse Listings**: View all reported lost and found items with detailed views.
- **Item Claims**: Users can submit claims for found items to get them back.
- **Secure Image Storage**: Uploaded images for found items are protected and only accessible to authorized users (claimants or owners).
- **Responsive Frontend**: Clean and simple HTML/CSS/JS interface.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer (Local & S3 support available)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nithi7518/Lost-and-Found-main.git
   cd Lost-and-Found
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Application:**
   From the `backend` directory, start the server:
   ```bash
   npm run dev
   # or
   npm start
   ```

5. **Access the App:**
   Open your browser and navigate to `http://localhost:5000`. The frontend is served statically through the backend.

## Project Structure

- `frontend/` - Contains all HTML, CSS, and client-side JavaScript.
- `backend/` - Contains the Express server, API routes, controllers, and MongoDB models.
  - `config/` - Database configuration.
  - `controllers/` - Logic for auth, items, and claims.
  - `middleware/` - Auth and upload middleware.
  - `models/` - Mongoose schemas.
  - `routes/` - Express routing.
  - `private/` & `public/` - Directories for handling file uploads.

## License

This project is licensed under the ISC License.
