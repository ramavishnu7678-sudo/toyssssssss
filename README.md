# WonderToys - Modern Toy Shop E-commerce Website 🧸

A modern, colorful, and kid-friendly e-commerce website for selling toys online. Built with Next.js, React, Node.js, Express, and MongoDB.

## Features

### 🏠 Home Page
- Bright hero section with playful illustrations
- Featured toys and best-selling products
- Category cards (Educational, Soft Toys, Action Figures, Games, Remote Toys)
- Call-to-action buttons: Shop Now, View Deals
- Special offers section

### 🧸 Product Listing Page
- Product cards with image, name, price, and rating
- "Add to Cart" and "Buy Now" buttons
- Filters by age, price, category, and popularity
- Search functionality
- Sort options

### 📦 Product Details Page
- Image gallery
- Toy description
- Age group suggestion
- Safety information
- Customer reviews and ratings
- Add to cart and wishlist

### 🛒 Cart & Checkout
- Add/remove items
- Quantity update
- Price summary
- Checkout form with shipping information

### 🔐 Authentication
- User signup and login
- Admin login
- JWT-based authentication

### 🧑‍💼 Admin Panel
- Add, edit, delete toys
- Upload toy images
- Manage price and stock
- View and manage orders
- Update order status

### ✨ Extra Features
- Search bar
- Wishlist functionality
- Offers & discounts section
- Order history

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd "kalaii shop"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/wondertoys
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   PORT=5000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in `.env.local`.

5. **Run the development servers**
   
   In one terminal, start the backend:
   ```bash
   npm run server
   ```
   
   In another terminal, start the frontend:
   ```bash
   npm run dev
   ```
   
   Or use concurrently to run both:
   ```bash
   npm run dev:all
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Creating an Admin Account

To create an admin account, you can either:

1. **Using MongoDB directly:**
   - Connect to your MongoDB database
   - Find a user in the `users` collection
   - Update the `role` field to `"admin"`

2. **Using MongoDB Compass or similar tool:**
   - Open the `wondertoys` database
   - Navigate to the `users` collection
   - Find your user document
   - Change `role: "user"` to `role: "admin"`

## Project Structure

```
wondertoys/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── orders/            # Order history
│   ├── products/          # Product listing and details
│   ├── wishlist/          # Wishlist page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   └── ...
├── context/               # React context providers
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── server/                # Backend server
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── index.js          # Server entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/bestsellers` - Get best sellers
- `GET /api/products/onsale` - Get products on sale
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add review (protected)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `PUT /api/cart/:productId` - Update cart item (protected)
- `DELETE /api/cart/:productId` - Remove from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Wishlist
- `GET /api/wishlist` - Get wishlist (protected)
- `POST /api/wishlist/:productId` - Add to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get single order (protected)

### Admin
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/:id` - Update order status (admin)

## Design Features

- **Bright and playful color palette** - Primary red, secondary blue, accent yellow
- **Rounded cards and buttons** - Modern, friendly design
- **Smooth hover animations** - Enhanced user experience
- **Fully responsive** - Mobile-first design approach
- **Kid-friendly UI** - Safe, trustworthy appearance for parents

## Development

### Running in Development Mode
```bash
npm run dev:all
```

### Building for Production
```bash
npm run build
npm start
```

### Backend Only
```bash
npm run server
```

### Frontend Only
```bash
npm run dev
```

## Notes

- The cart is stored in-memory on the server (for demo purposes). In production, consider using Redis or database storage.
- Image uploads are stored in the `server/uploads` directory.
- Make sure to change the JWT_SECRET in production.
- The MongoDB connection string should be updated for production use.

## License

This project is created for educational purposes.

## Support

For issues or questions, please check the code comments or create an issue in the repository.

---

Made with ❤️ for kids and parents! 🎈🧸🎮

