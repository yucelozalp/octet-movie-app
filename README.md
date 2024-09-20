# Movies App

Movies App is a simple application where users can view a list of movies and log in to access it. This project is developed using React TypeScript, Redux, Axios, Ant Design, and SCSS. The application uses a fake REST API to display movie data.

## Project Features

- **User Login**: The login form uses Ant Design components along with React Hook Form and Yup for validation. Users can log in with email and password validation functionality.
- **Movie List**: After logging in, users can view a list of movies.
- **Responsive Design**: The user interface is optimized for small screens.
- **Fake REST API**: Movie data is served through a fake API using JSON Server.

## Technologies Used

- **React**: The foundation of the application.
- **TypeScript**: Ensures more robust and error-free code.
- **Redux**: Used to manage the application-wide state.
- **Axios**: For making API requests.
- **Ant Design**: To build user interface components.
- **SCSS**: For more modular and maintainable styles.
- **Yup and React Hook Form**: For form validation and management.
- **JSON Server**: Used to provide a fake REST API for movie data.

## Setup

Follow these steps to get the project up and running.

### 1. Install Necessary Dependencies

After cloning the project files, run the following command to install the dependencies:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a .env file in the root directory and configure the following variables:

```bash
REACT_APP_USERNAME=yourUsername
REACT_APP_PASSWORD=yourPassword
REACT_APP_SECRET_KEY=key
```

Replace yourUsername and yourPassword with the credentials you want to use for login authentication.

### 3. Run JSON Server (Mock API)

To simulate the REST API, start the JSON Server. Add a db.json file with mock movie data in the root folder or customize the existing one.

```bash
npx json-server --watch db.json --port 5000
```

### 4. Start the Development Server

Run the development server with the following command:

```bash
npm start
```
