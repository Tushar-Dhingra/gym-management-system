# Gym Management System - Frontend

A modern, responsive web application for managing gym members, memberships, and operations built with React.js and Tailwind CSS.

## Features

- **Member Management**: Add, edit, view, and manage gym members
- **Membership Plans**: Multiple membership types (Basic, Standard, Premium)
- **Dashboard**: Overview of gym statistics and member insights
- **Authentication**: Secure login/register system with password reset
- **Profile Pictures**: Cloudinary integration for member avatars
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Dynamic member status tracking

## Tech Stack

- **Frontend**: React 19.1.1
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.9.3
- **HTTP Client**: Axios 1.12.2
- **Notifications**: React Toastify 11.0.5
- **Image Upload**: Cloudinary
- **Testing**: React Testing Library

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Cloudinary account (for image uploads)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gms-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```bash
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. Start the development server: 
```bash
npm start
```
The app will open at http://localhost:3000

## Project Structure
```bash
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
```

## License

This project is licensed under the MIT License.
