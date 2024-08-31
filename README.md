# Hustter

A blog web app for Hust students, providing a platform for sharing and exploring content within the community.

## Demo

Feel free to test out the demo website deployed on Vercel [here](https://hustter.vercel.app/).

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Installation

To run the project, follow these steps:

1. **Clone the repository:**

```
git clone https://github.com/thanhkowibu/hustter-blog.git cd hustter-blog
```


2. **Install dependencies:**

- For the client:
  ```
  cd client
  npm install
  ```

- For the server:
  ```
  cd server
  npm install
  ```

3. **Configure environment variables:**

- Create a `.env` file in the server directory with the following content:

  ```
  PORT=5000
  DATABASE_URL=your_postgresql_database_url
  CLOUDINARY_URL=your_cloudinary_url
  ```

4. **Run the development servers:**

- Start the client:
  ```
  npm run dev
  ```

- Start the server:
  ```
  npm run start
  ```

5. **Access the application:**

Open your browser and go to `http://localhost:5173` for the client and `http://localhost:5000` for the API server.
<p align="right">(<a href="#readme">back to top</a>)</p>

## Features

- **User Authentication:** Secure login and registration with JWT-based authentication.
- **Post Creation:** Users can create, edit, and delete posts.
- **Image Upload:** Images are uploaded to Cloudinary for seamless integration and management.
- **Post Recommendation:** Fetch related posts based on categories of the current post.
<p align="right">(<a href="#readme">back to top</a>)</p>

## Technologies Used

### **Frontend:**
- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for client-side routing
- [TailwindCSS](https://tailwindcss.com/) for styling

### **Backend:**
- [ExpressJS](https://expressjs.com/) for server-side logic
- [PostgreSQL](https://www.postgresql.org/) for the database
- [Cloudinary](https://cloudinary.com/) for image hosting
<p align="right">(<a href="#readme">back to top</a>)</p>

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.
<p align="right">(<a href="#readme">back to top</a>)</p>

## Like this project?

If you find this project interesting, please leave a star on the repo!

<p align="right">(<a href="#readme">back to top</a>)</p>
