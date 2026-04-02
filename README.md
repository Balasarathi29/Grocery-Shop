# E-Commerce App

The repository is split into [frontend/](frontend) for the Vite React app and [backend/](backend) for the Node.js, Express, and MongoDB API.

## Backend

The API in [backend/](backend) exposes:

- `GET /api/health`
- `GET /api/catalog`
- `GET /api/categories`
- `GET /api/products`
- `POST /api/categories`
- `POST /api/products`

It seeds the current catalog into MongoDB on startup when the collections are empty.

## Setup

1. Install frontend dependencies inside [frontend/](frontend).
2. Install backend dependencies inside [backend/](backend).
3. Copy [backend/.env.example](backend/.env.example) to [backend/.env](backend/.env) and set `MONGODB_URI`.

## Run

- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run dev`

The frontend Vite dev server proxies `/api` requests to `http://localhost:5000`, so frontend fetches can use relative API URLs.
