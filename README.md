# Blog Web Application

This is a Node.js-based blog web application that allows users to create, edit, and delete blog posts along with authenticated admin action. The application features an Express.js server, utilizes PostgreSQL for data storage, and includes a mailing service with Nodemailer.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Utkarsh110vscon/blog-application.git
   cd blog-application
2. **Install dependencies:**

   ```sh
   npm install
3. **Set up environment  variables:**

   ```sh
   EMAIL_ID=your-email@example.com
   EMAIL_PASSWORD=your-email-password
   PG_USER=your-database-user
   PG_DATABASE=your-database-name
   PG_HOST=your-database-host
   PG_PASSWORD=your-database-password
   PG_PORT=your-database-port

4. **Start the application:**

   ```sh
   npm start
  
## Usage

 - The application runs on `http://localhost:3000`.
 - The API server runs on `http://localhost:4000`.

## Routes

 **Frontend**
  - `GET /` - Renders the homepage with random blog posts.
  - `GET /blogs` - Renders a page with all blog posts.
  - `GET /createBlog` - Renders a form to create a new blog post.
  - `GET /edit/:id` - Renders a form to edit an existing blog post.
  - `POST /createBlog/posts` - Creates a new blog post.
  - `POST /posts/update/:id` - Updates an existing blog post.
  - `GET /api/posts/delete/:id` - Deletes a specific blog post.
  - `POST /admin` - Deletes all blog posts (admin only).
  - `POST /emailSend` - Sends an email to the specified address.

 **Backend API**
  - `GET /random` - Retrieves random blog posts.
  - `GET /all` - Retrieves all blog posts.
  - `GET /posts/:id` - Retrieves a specific blog post by ID.
  - `POST /posts` - Creates a new blog post.
  - `PATCH /update/:id` - Updates an existing blog post by ID.
  - `DELETE /delete/:id` - Deletes a specific blog post by ID.
  - `DELETE /deleteAll` - Deletes all blog posts.

## Scripts
 - `npm start` - Starts the application.

## Dependencies
 - axios
 - body-parser
 - dotenv
 - ejs
 - express
 - nodemailer
 - pg

---
