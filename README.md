# MultiStep User Profile Form

A React-based multi-step user profile form with backend powered by Node.js, Express, and MongoDB Atlas.  
The form collects user details across multiple steps, including personal info, professional info, and preferences, and stores the data securely in MongoDB.

---

## Features

- Multi-step form with smooth navigation between steps
- Profile photo upload with preview (supports JPG/PNG, max 2MB)
- Password input with strength indicator
- Dynamic country, state, and city dropdowns (using `country-state-city` package)
- Conditional fields based on profession selection
- Subscription plan selection with radio buttons
- Newsletter subscription checkbox
- Data validation on frontend and backend
- Stores user profile data in MongoDB Atlas
- Express backend with REST API

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (via Mongoose)
- **Other:** country-state-city npm package for location data

---

## Getting Started

### Prerequisites

- Node.js installed (v14 or higher recommended)
- MongoDB Atlas account & cluster setup
- npm or yarn package manager

---

Notes
Passwords are stored in plain text in the database as per current requirements; for production, always hash passwords securely.

The profile photo is stored as a base64 string. For a scalable app, consider storing images in cloud storage or dedicated media services.

CORS is configured to allow requests from the frontend origin (http://localhost:5173).
