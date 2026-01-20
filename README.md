## HTU Visitor Management System – Frontend

This repository contains the frontend for the HTU Visitor Management System, a role-based web application used to manage visitors, access control, and incident tracking within the university.

The frontend is built with React and communicates with a secure REST API backend.

## Tech Stack

- React (Vite)
- React Router DOM – routing & route protection
- React Bootstrap – UI components
- Axios – API communication
- CSS – custom styling
- LocalStorage – session persistence

## Project Structure (Simplified)
```
src/
├── API/
│   └── api.js
├── Components/
│   ├── ProtectedRoute.jsx
│   ├── StaffSidebar.jsx
│   ├── Sidebar.jsx
│   ├── SecuritySidebar.jsx
│   └── TopNavbar.jsx
├── Pages/
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── CreateUser.jsx
│   ├── RegisterVisitor.jsx
│   ├── StaffDashboard.jsx
│   ├── SecurityGate.jsx
│   ├── VisitorTrack.jsx
│   └── IncidentLog.jsx
├── styles/
│   ├── AdminDashboard.css
│   ├── global.css
│   ├── IncidentLog.css
│   ├── Login.css
│   ├── RegisterVisitor.css
│   ├── SecurityGate.css
│   ├── Sidebar.css
│   ├── StaffDashboard.css
│   ├── TopNavbar.css
│   └── VisitorTrack.css
├── App.css
└── App.jsx
```
## Running the Frontend
```bash
npm install
npm run dev
```
Make sure the backend server is running and accessible.

## User Roles

The system supports three roles, each with different access permissions:

|Role|	Description|
|----|------------|
|Admin|	System administration and user CRUD opperations |management
|Staff|	Register visitors, track visits, view incidents|
|Security|	Gate operations (check-in / check-out) and visitor tracking|

Role-based access is enforced using Protected Routes.

## Application Components (Pages)
**Authentication**

- Login
- Authenticates users
- Stores user session in localStorage
- Redirects users based on role

**Admin**

- Admin Dashboard
- Create User

Accessible only by Admin

**Staff**

- Staff Dashboard
- Register Visitor
- Visitor Tracking
- Incident Log

**Security**

- Security Gate (Check visitors in/out)

Shows live statistics (active, overdue, checked out today)

- Visitor Tracking

Visitor Tracking is available for security and staff users

## Route Protection (RBAC)

All protected pages use a custom ProtectedRoute component.

Example:
```jsx
<ProtectedRoute roles={["staff", "security"]}>
  <VisitorTrack />
</ProtectedRoute>
```

If the user:
- Is not logged in → redirected to login
- Has wrong role → access denied

## Data Flow & State Management

Each page fetches its own data
No global state manager (Redux / Context) is used

Derived values (counts, filters) are calculated locally

This keeps components isolated, predictable, and easy to debug

## API Communication

All API calls are handled using a centralized Axios instance:
```jsx
src/API/api.js
```
**Features:**

- Automatically injects x-user-id header
- Handles authentication state
- Supports automatic logout on 401 Unauthorized

## Logout Logic

Logout is handled centrally and performs the following:

- Removes user data from localStorage
- Stops sending authentication headers
- Redirects to login page
- Prevents access to protected routes