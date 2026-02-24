# BonApp
**Meal Ordering and Delivery Platform**

A full-stack web application for browsing menus, placing food orders, and managing deliveries — built with the MEAN stack (MongoDB, Express, Angular, Node.js).

> Final project by Jeremy Luzon & Ofir Ben Yamin

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Overview](#api-overview)
- [Admin Panel](#admin-panel)

---

## Features

- **User Authentication** — Sign up, log in, and auto-login with JWT
- **Menu Browsing** — Browse items across 7 categories: Appetizer, Main, Side, Dessert, Combo, Soft Drink, Alcohol
- **Order Placement** — Place orders with quantities, special notes, and automatic price calculation
- **Guest Checkout** — Order without an account
- **Order History** — View past orders and their status
- **Notifications** — In-app notification system with read/unread tracking
- **Email Notifications** — Confirmation emails on signup and order placement
- **Admin Dashboard** — Manage users, menu items, and all orders

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT (jsonwebtoken) | Authentication |
| bcrypt | Password hashing |
| Nodemailer + Mailgen | Email notifications |
| validator.js | Input validation |
| moment.js | Date/time handling |

### Frontend
| Technology | Purpose |
|---|---|
| Angular 9 | SPA framework |
| TypeScript | Language |
| Bootstrap 4 + ng-bootstrap | UI components and layout |
| Font Awesome | Icons |
| SweetAlert2 | Alerts and dialogs |
| RxJS | Reactive programming |

---

## Project Structure

```
BonApp/
├── 00_DAL/                   # Data Access Layer
│   ├── models/               # Mongoose schemas (user, order, menu)
│   └── mongoose.js           # MongoDB connection
├── 01_BLL/                   # Business Logic Layer
│   └── src/
│       ├── index.js          # Express server entry point (port 3000)
│       ├── routes/           # API route handlers (user, order, menu)
│       └── middleware/       # Auth, admin guard, email sender
├── 02_UIL/                   # User Interface Layer
│   └── client/               # Angular 9 app
│       └── src/app/
│           ├── login/
│           ├── signup/
│           ├── order/        # Menu browsing and order placement
│           ├── activities/   # User dashboard and order cards
│           ├── order-history/
│           ├── controladmin/ # Admin management panels
│           └── shared/       # Services and models
└── package.json              # Root scripts
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v12+
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`
- [Angular CLI](https://angular.io/cli) v9: `npm install -g @angular/cli@9`

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd BonApp
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd 02_UIL/client
   npm install
   cd ../..
   ```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
EMAIL_ADDRESS=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
URL=http://localhost:3000
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) if 2FA is enabled.

---

## Running the App

### Development (full stack)
```bash
npm run dev
```
Builds the Angular app and starts the Node server with auto-reload.

### Backend only
```bash
npm run server
```
Starts the Express API on `http://localhost:3000` with nodemon.

### Frontend only
```bash
npm run ng
```
Starts the Angular dev server on `http://localhost:4200`.

### Production build
```bash
cd 02_UIL/client
npm run build
```
Build artifacts are output to `02_UIL/client/dist/client/` and served statically by Express.

---

## API Overview

### Auth & Users
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/users` | Register a new user | — |
| POST | `/users/login` | Login | — |
| POST | `/users/logout` | Logout | Required |
| GET | `/users/home` | Get current user | Required |

### Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/orders` | Place a new order | Required |
| GET | `/orders` | Get current user's orders | Required |

### Menu
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/menu` | Get all menu items | — |

### Notifications
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/notification` | Get user notifications | Required |
| POST | `/notification` | Send notification to self | Required |
| POST | `/notifications/read` | Mark all as read | Required |

---

## Admin Panel

Admin users have access to additional endpoints and a dedicated dashboard:

- **Users:** View, update, and delete any user (`/admin/users`)
- **Orders:** View and update all orders (`/admin/orders`)
- **Menu:** Add and delete menu items (`/add/menu`, `/delete/menu/:id`)
- **Notifications:** Send notifications to any user (`/notification/:id`)
