Gym Management System - Frontend
A modern, responsive web application for managing gym members, memberships, and operations built with React.js and Tailwind CSS.

Features
Member Management: Add, edit, view, and manage gym members

Membership Plans: Multiple membership types (Basic, Standard, Premium)

Dashboard: Overview of gym statistics and member insights

Authentication: Secure login/register system with password reset

Profile Pictures: Cloudinary integration for member avatars

Responsive Design: Mobile-friendly interface

Real-time Updates: Dynamic member status tracking

Tech Stack
Frontend: React 19.1.1

Styling: Tailwind CSS 3.4.17

Routing: React Router DOM 7.9.3

HTTP Client: Axios 1.12.2

Notifications: React Toastify 11.0.5

Image Upload: Cloudinary

Testing: React Testing Library

Project Structure
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard widgets
│   ├── Layout/         # Layout components
│   ├── Members/        # Member-related components
│   ├── Modals/         # Modal dialogs
│   ├── Navbar/         # Navigation bar
│   └── Sidebar/        # Sidebar navigation
├── pages/
│   ├── Dashboard/      # Dashboard page
│   ├── Home/           # Home page
│   ├── MemberDetail/   # Member detail page
│   ├── Members/        # Members listing page
│   └── NotFound/       # 404 page
├── App.js              # Main app component
└── index.js            # Entry point

Copy

Insert at cursor
Prerequisites
Node.js (v14 or higher)

npm or yarn

Cloudinary account (for image uploads)

Installation
Clone the repository:

git clone <repository-url>
cd gms-frontend

Copy

Insert at cursor
bash
Install dependencies:

npm install

Copy

Insert at cursor
bash
Create a .env file in the root directory:

REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

Copy

Insert at cursor
env
Start the development server:

npm start

Copy

Insert at cursor
bash
The app will open at http://localhost:3000

Available Scripts
npm start - Runs the app in development mode

npm test - Launches the test runner

npm run build - Builds the app for production

npm run eject - Ejects from Create React App (one-way operation)

Environment Variables
Variable	Description
REACT_APP_CLOUDINARY_CLOUD_NAME	Your Cloudinary cloud name
REACT_APP_CLOUDINARY_UPLOAD_PRESET	Cloudinary upload preset for member avatars
Membership Plans
Basic: 1 month - $50

Standard: 3 months - $120

Premium: 6 months - $200

Key Components
Authentication
Login/Register forms with validation

Password reset functionality

Protected routes

Member Management
Create new members with profile pictures

Edit member information

View detailed member profiles

Filter and search members

Dashboard
Member statistics overview

Recent member activities

Membership expiration tracking

Visual charts and metrics

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/new-feature)

Commit your changes (git commit -am 'Add new feature')

Push to the branch (git push origin feature/new-feature)

Create a Pull Request

License
This project is licensed under the MIT License.
