# Gulayan App 🌿

This is a frontend template intended for practicing the concept of SPA + API integration.

## Tech Stack

- **React 19** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Basic knowledge of React and JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gulayan-app-student-version
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
gulayan-app-student-version/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── layout/         # Layout components
│   │   └── AuthenticatedUserLayout.jsx
│   ├── pages/          # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Records.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx         # Main app component with routes
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Implementation Tasks

### Your Tasks as a Student:

1. **Set up Backend Connection**
   - Configure Axios base URL
   - Create API service modules
   - Set up request/response interceptors

2. **Implement Authentication**
   - Connect login form to backend API
   - Connect signup form to backend API
   - Handle token storage and management
   - Implement protected routes

3. **Implement CRUD Operations**
   - Fetch records from the backend
   - Create new records
   - Update existing records
   - Delete records

4. **Error Handling**
   - Display user-friendly error messages
   - Handle network errors
   - Implement loading states

5. **Data Management**
   - Manage application state
   - Update UI based on API responses
   - Implement data validation

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Axios Documentation](https://axios-http.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

This is a student learning project. Feel free to experiment and improve upon the base code!

## 📄 License

This project is intended for educational purposes.

---

**Note**: This is a frontend-only template. Backend API implementation is required to make the application fully functional.