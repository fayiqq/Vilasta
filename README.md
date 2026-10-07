# Vilasta

Vilasta is a full-stack property listing platform — an Airbnb-style app where users can browse stays, list their own properties, and leave reviews.

## Features

- Browse all listings and view full property details
- Create, edit, and delete listings (owner-only) with image upload
- Signup / login / logout with persistent sessions
- Leave star ratings and comments on a listing; delete your own reviews
- Route-level protection — only logged-in users can create listings or review, only owners can edit/delete their own listings
- Toast notifications for all actions (create, update, delete, errors)

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** Passport.js (session-based)
- **Image uploads:** Cloudinary + Multer

## Project Structure

```
vilasta/
├── backend/
│   ├── index.js                 # entry point — loads env, connects DB, starts server
│   └── src/
│       ├── app.js               # express app setup (middleware, routes, error handling)
│       ├── config/               # db, session, passport, cloudinary config
│       ├── controllers/          # listing, review, user controllers
│       ├── middlewares/          # auth checks (isLogged, isOwner, isAuthor), error handler
│       ├── models/               # Listing, Review, User (Mongoose schemas)
│       ├── routes/               # listingRoutes, reviewRoutes, userRoutes
│       └── utils/                # ExpressError, wrapAsync
│
└── frontend/
    └── src/
        ├── components/           # Navbar, Footer, ListingCard, ListingForm, ReviewCard, etc.
        ├── context/               # AuthContext, ToastContext
        ├── hooks/                 # useAuth, useListings, useReviews
        ├── pages/                 # Home, ListingShow, NewListing, EditListing, Login, Signup
        ├── routes/                # PrivateRoute
        └── services/              # api.js (axios instance), authService, listingService, reviewService
```

## API Reference

All routes are prefixed with `/api`. Session cookies handle auth — no tokens in headers.

| Method | Endpoint                          | Description                        | Auth required     |
|--------|------------------------------------|-------------------------------------|--------------------|
| GET    | `/api/listings`                    | Get all listings                    | No                 |
| GET    | `/api/listings/:id`                | Get one listing (+ reviews, owner)  | No                 |
| POST   | `/api/listings`                    | Create a listing                    | Yes                |
| PUT    | `/api/listings/:id`                 | Update a listing                    | Yes (owner only)   |
| DELETE | `/api/listings/:id`                 | Delete a listing                    | Yes (owner only)   |
| POST   | `/api/listings/:id/reviews`         | Add a review                        | Yes                |
| DELETE | `/api/listings/:id/reviews/:reviewId` | Delete a review                   | Yes (author only)  |
| GET    | `/api/me`                          | Get currently logged-in user        | No                 |
| POST   | `/api/signup`                      | Register a new account              | No                 |
| POST   | `/api/login`                       | Log in                              | No                 |
| POST   | `/api/logout`                      | Log out                             | Yes                |

## Getting Started

### Backend
```bash
cd backend
npm install
```
Create a `.env` file:
```env
ATLAS_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=frontend_url
```
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
```
Create a `.env` file:
```env
VITE_API_URL=backend_url
```
```bash
npm run dev
```
