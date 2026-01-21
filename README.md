# Daawat-E-Ishq Server

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the server directory with the following variables:

```
MONGO_URI=mongodb+srv://soumyo8317_db_user:JPkxzK66EuSqhAGC@cluster0.3zqzish.mongodb.net/daawat-e-ishq?retryWrites=true&w=majority
JWT_SECRET=d7349e30526816b71c85e83daa70f9dc3da69f470ec6ebba508f5db3802b82506e39c5f4b521b3ba9154f072c5e172b9f48439931a544a35e5c7c28c007a4deb
PORT=5000
NODE_ENV=development
FRONTEND_URL=https://daawat-e-ishq-frontend.vercel.app
GOOGLE_CLIENT_ID=258365914995-g3taerkv9uu556871to1fu5qd1to88sr.apps.googleusercontent.co
```

### 2. Install Dependencies 
```bash
npm install
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Seed Admin User
```bash
npm run seed
```
This will create an admin user with:
- Email: admin@admin.com
- Password: admin123

### 5. Start the Server
```bash
npm start
```

## Admin Features

The server includes the following admin endpoints:

- `POST /admin/auth/login` - Admin login
- `GET /admin/auth/profile` - Get admin profile
- `PUT /admin/auth/profile` - Update admin profile
- `PUT /admin/auth/change-password` - Change password
- `POST /admin/auth/logout` - Logout

## Database Models

- **Admin**: Admin user management
- **User**: Regular user management
- **MenuItem**: Menu items management
- **Order**: Order management
- **Reservation**: Reservation management
- **Review**: Review management

## API Routes

### Admin Routes
- `/admin/menu` - Menu management
- `/admin/orders` - Order management
- `/admin/reservations` - Reservation management
- `/admin/auth` - Admin authentication

### User Routes
- `/api/menu` - Menu items
- `/api/orders` - User orders
- `/api/reservations` - User reservations
- `/api/reviews` - Reviews
- `/api/auth` - User authentication
