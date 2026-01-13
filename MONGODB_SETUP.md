# MongoDB Connection Setup Guide

## Connection Code Location

The MongoDB connection code is located in `server/index.js` (lines 15-26).

## Current Implementation

```javascript
// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wondertoys');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();
```

## Environment Variables

The connection uses the `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://ramavishnu7678_db_user:toyshop123@cluster0.sjfu5m1.mongodb.net/wondertoys?retryWrites=true&w=majority
```

## How It Works

1. **Loads Environment Variables**: Uses `require('dotenv').config()` to load `.env` file
2. **Connects to MongoDB**: Uses Mongoose to connect to MongoDB Atlas
3. **Error Handling**: Catches connection errors and displays helpful messages
4. **Database Name**: Uses `wondertoys` as the database name

## Connection String Breakdown

```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?[options]
```

- **Username**: ramavishnu7678_db_user
- **Password**: toyshop123
- **Cluster**: cluster0.sjfu5m1.mongodb.net
- **Database**: wondertoys
- **Options**: retryWrites=true&w=majority

## MongoDB Models

The application uses three main models:

1. **User Model** (`server/models/User.js`)
   - Stores user accounts, authentication data
   - Contains wishlist and order references

2. **Product Model** (`server/models/Product.js`)
   - Stores all product information
   - Contains reviews, ratings, images

3. **Order Model** (`server/models/Order.js`)
   - Stores order details
   - Contains items, shipping info, status

## Troubleshooting

If you see connection errors, check:

1. ✅ MongoDB Atlas cluster is running
2. ✅ IP address is whitelisted (Network Access → Add IP Address or 0.0.0.0/0 for all)
3. ✅ Database user has correct permissions
4. ✅ Connection string in `.env` is correct
5. ✅ Password doesn't contain special characters that need URL encoding

## Testing the Connection

When you start the server with `npm run server`, you should see:

```
✅ MongoDB Connected: cluster0-shard-00-02.sjfu5m1.mongodb.net
Server running on port 5000
```

If connection fails, you'll see:
```
❌ MongoDB connection error: [error message]
```

## Additional Notes

- The connection uses Mongoose 7.x which has modern defaults
- Connection options like `useNewUrlParser` are no longer needed
- The server will exit if MongoDB connection fails (to prevent running without database)
- All database operations use the models defined in `server/models/`

