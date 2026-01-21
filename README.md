# Daawat-E-Ishq Server

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the server directory with the following variables:

```
MONGO_URI=mongodb://localhost:27017/daawat-e-ishq
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
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
npm run dev
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
