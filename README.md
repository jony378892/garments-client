# Fabrico — Client

Live site: https://fabricoo.vercel.app/

Fabrico is a modern e-commerce frontend (garments marketplace) built with React and Vite. This repository contains the client application used by buyers, managers and admins to browse products, place orders, and manage inventory and orders.

Key features

- Role-based dashboards (Admin / Manager / Buyer)
- Product browsing and quick previews
- Order flow with Cash-on-Delivery and Stripe (checkout session via server)
- Approve/reject order workflow and tracking updates for managers
- React Query for server state and caching
- React Hook Form and DaisyUI for accessible forms & UI
- Firebase Authentication (email/social) and role-based API authorization
- Dynamic titles using react-helmet-async

Tech stack

- React 19 + Vite
- TailwindCSS + DaisyUI
- @tanstack/react-query
- react-hook-form
- react-helmet-async
- Firebase (Auth)
- Axios + a secure axios wrapper for authenticated requests
- SweetAlert2 / react-hot-toast for feedback

Getting started (client)

Prerequisites

- Node.js v18+ and npm

1. Clone

   git clone https://github.com/jony378892/garments-client.git
   cd garments-client

2. Install dependencies

   npm install

3. Configure environment

Create a `.env` file in the project root (do not commit this file). Example values to set:

```
VITE_BACKEND_URL=https://your-server.example.com

# Firebase client configuration (from Firebase console)
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
```

The client reads Firebase config from the VITE\_\* variables and uses `VITE_BACKEND_URL` for all API calls to the server.

4. Run the app (development)

   npm run dev

5. Build

   npm run build

Server (API)

The client expects a REST API that exposes product, user, order and payment endpoints. The sample server (separate repository) uses environment variables such as:

- DB_USERNAME / DB_PASSWORD (MongoDB Atlas)
- STRIPE_SECRET_KEY
- FIREBASE_ADMIN_TOKEN (base64-encoded service account JSON)
- SITE_DOMAIN (used for Stripe webhook/redirects)

Key endpoints used by the client

- GET /products[?limit=n]
- GET /products/:id
- POST /orders
- POST /create-checkout-session
- /managed-products (manager-only product endpoints)
- /users, /users/:id/role

Data model highlights

Products

- \_id, name, description, category, price, availableQuantity, moq, images[], paymentMethod, showOnHomepage, createdBy

Orders

- \_id, productId, productName, email, quantity, unitPrice, totalPrice, status (pending/approved/rejected), paymentMethod, paymentStatus (pending/paid), createdAt, approvedAt, createdBy

Payments

- amount, currency, customerEmail, productId, transactionId, paymentStatus, paidAt

Dashboard pages

- Manager: Add Product, Manage Products, Pending Orders, Approved Orders + tracking
- Admin: All Products, All Orders, Manage Users
- Buyer: My Orders, Track Order

Deployment

- The client can be deployed to Vercel. Set the same VITE\_\* environment variables in Vercel.
- API should be deployed separately (Heroku, Render, Vercel Serverless, etc.). Use HTTPS endpoints for production and update `VITE_BACKEND_URL`.
