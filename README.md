# React-Typescript-Redux-Cypress
Project Documentation: Small Booking System to create a React, Typescript project with Redux CRUD and Cypress tests
Developer: Paula Cristina Figueiredo Rillo
Linkedin: https://www.linkedin.com/in/paula-rillo-49827220/
Github: https://github.com/PaulaRillo
Behance: https://www.behance.net/paularillo

-- Table of Contents --

1- Introduction 
2- Installation 
  -- Prerequisites
  -- Installation
3- Project Structure 
4- Key Dependencies 
5- Configuration 
6- Features 
7- UI Theme 
8- Usage
9- Tests

| 1- Introduction |
The Vacation Rental Booking System is a React application designed to manage reservations for vacation rental properties. It enables users to view, edit, and create reservations for various vacation rental accommodations. The system is built using modern web technologies, including React, Redux, and Material-UI.

| 2- Installation |

-- Prerequisites
Before you begin, ensure you have the following installed:

Node.js and npm

-- Installation
*Inside of the directory folder

Install dependencies with the command:
npm install

Running the Application locally with the command:
npm run dev

Visit http://localhost:5174/ in your browser

| 3- Project Structure |

The project follows a modular structure, organized by features. Key directories include:

//src/features/Booking: Contains components and logic related to booking and reservations.
  --components: Reusable components used in the booking process.
  --utils: Utility functions and validation schema.
//src/hooks: Contains reusable custom hooks.
//src/slices: Contains Redux slices for state management.
//src/types: TypeScript type definitions.
//src/store: Redux store configuration and slices.
//src/theme: Material-UI theme configuration.


| 4- Key Dependencies |
- Vite: Optimized development environment.
- React: JavaScript library for building user interfaces.
- Material-UI: React UI framework.
- Redux: State management library.
- React Hook Form: Form renderer and controller.
- yup: Schema-based form validation.
- dayjs: Modern JavaScript date library.

| 5- Configuration |
- Material-UI Theme: Defined in src/theme/theme.ts.
- Redux Store: Configured in src/store/store.ts.
- Validation Schema: Located in src/features/Booking/utils/validationSchema.ts.

| 6- Features |
- Booking Form: Allows users to create reservations.
- Reservation Details: Allows users to view and delete reservations.
- Reservation Details Form: Allows users to edit reservations.

| 7- UI Theme - |
Light Theme: Defined in src/theme/theme.ts.
Colors: Primary (#0ABAB5), Secondary (#E34334), Background (#fff).

| 8- Usage | 
Access the application through the provided URL.
Pick the dates and the number of guests, including children and pets.
Create a new reservation.
Navigate to your reservations by clicking 'My Reservations' where you can see your reservations or click the icons to edit a reservation or delete a reservation.

| 9- Tests |
The application uses Cypress to cover common user behavior scenarios
To run the specified end to end tests, make sure the application is running locally, then either access the Cypress dashboard through npx cypress open, or simply run the test suite typing npx cypress run in the command line prompt
