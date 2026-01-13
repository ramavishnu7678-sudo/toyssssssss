# Admin Account Setup Guide 🔐

## Admin Account Limit

**Maximum 5 admin accounts** are allowed in the system. This limit is enforced at the registration level.

## How to Create an Admin Account

### Method 1: Direct Registration (if limit not reached)

1. Go to registration page: http://localhost:3000/register
2. Fill in the registration form
3. The system will automatically create a regular user account
4. **Then manually update in MongoDB** to make it admin (see Method 2)

### Method 2: Convert Existing User to Admin (Recommended)

1. **Register a regular account** first
   - Go to: http://localhost:3000/register
   - Create account with your email and password

2. **Update user role in MongoDB:**
   - Open MongoDB Atlas or MongoDB Compass
   - Connect to your database: `wondertoys`
   - Go to `users` collection
   - Find your user document
   - Change `role: "user"` to `role: "admin"`
   - Save the document

3. **Login again** with your credentials
   - You'll now have admin access
   - Admin Panel will be visible in navigation

### Method 3: Check Current Admin Count

Before creating a new admin, check how many admins exist:

```javascript
// In MongoDB shell or Compass
db.users.countDocuments({ role: "admin" })
```

If the count is 5 or more, you cannot create more admin accounts.

## Admin Features

Once you have admin access, you can:

✅ **Add Products**
- Click "Add Product" button in Admin Panel
- Upload up to 5 images from your gallery
- Set product details, price, stock, etc.

✅ **Edit Products**
- Click edit icon (pencil) next to any product
- Update product information
- Add more images

✅ **Delete Products**
- Click delete icon (trash) next to any product
- Confirm deletion

✅ **Manage Orders**
- View all orders
- Update order status (pending, processing, shipped, delivered, cancelled)

✅ **View All Products**
- See complete product list
- Manage inventory

## Troubleshooting

### "Add Product" button not showing?

1. ✅ Verify you're logged in as admin
2. ✅ Check user role in MongoDB (should be "admin")
3. ✅ Refresh the page
4. ✅ Logout and login again
5. ✅ Check browser console for errors

### "Maximum 5 admin accounts allowed" error?

- The system already has 5 admin accounts
- You need to either:
  - Remove an existing admin (change role to "user")
  - Or use an existing admin account

### Can't upload images?

1. ✅ Make sure backend server is running (port 5000)
2. ✅ Check `server/uploads/` directory exists
3. ✅ Verify file permissions
4. ✅ Check browser console for errors
5. ✅ Try selecting images one at a time

## Security Notes

- Admin accounts have full access to product and order management
- Only create admin accounts for trusted users
- The 5 admin limit helps maintain security
- Regular users cannot access admin features

## Quick Admin Check

To verify if a user is admin:

```javascript
// In MongoDB
db.users.findOne({ email: "your@email.com" })
// Check the "role" field - should be "admin"
```

---

**Need Help?** Check the server logs for detailed error messages.

