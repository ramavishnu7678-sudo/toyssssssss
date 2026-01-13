# Troubleshooting: "Add Product" Button Not Showing

## Quick Fix Checklist

### ✅ Step 1: Verify You're Logged In as Admin

1. **Check your login status**
   - Make sure you're logged in
   - Check the navigation bar - you should see your name

2. **Verify your user role**
   - The admin page now shows debug info at the top
   - Look for: `Role: admin` and `Admin: ✅ Yes`
   - If it shows `Role: user` or `Admin: ❌ No`, you need to update your role

### ✅ Step 2: Update User Role to Admin

**Option A: Using MongoDB Atlas (Web Interface)**
1. Go to MongoDB Atlas website
2. Navigate to your cluster → Collections
3. Open `wondertoys` database
4. Open `users` collection
5. Find your user document (search by email)
6. Click "Edit Document"
7. Change `"role": "user"` to `"role": "admin"`
8. Click "Update"

**Option B: Using MongoDB Compass**
1. Connect to your MongoDB
2. Select `wondertoys` database
3. Open `users` collection
4. Find your user (filter by email)
5. Edit the document
6. Change `role` field from `"user"` to `"admin"`
7. Save

**Option C: Using MongoDB Shell**
```javascript
use wondertoys
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### ✅ Step 3: Refresh and Re-login

1. **Logout** from the website
2. **Clear browser cache** (optional but recommended)
3. **Login again** with your credentials
4. **Go to Admin Panel**: http://localhost:3000/admin

### ✅ Step 4: Check Debug Info

On the admin page, you should see a blue debug box at the top showing:
```
Debug Info: User: Your Name | Role: admin | Admin: ✅ Yes
```

If you see:
- `Role: user` → Update role in MongoDB (Step 2)
- `Admin: ❌ No` → Update role in MongoDB (Step 2)
- No debug info → Check if you're logged in

### ✅ Step 5: Verify "Add Product" Button

The button should be:
- **Location**: Top right of Admin Panel page
- **Color**: Red/Primary color
- **Text**: "Add Product" with a + icon
- **Visibility**: Always visible when you're an admin

## Common Issues

### Issue: Button Still Not Showing

**Solution:**
1. Open browser console (F12)
2. Check for any errors
3. Look for the debug log: `Admin Page - User: { name, role, isAdmin }`
4. Verify `isAdmin: true` in the console

### Issue: "Access Denied" Message

**Solution:**
- Your user role is not "admin"
- Follow Step 2 to update your role
- Make sure you save the changes in MongoDB

### Issue: Page Redirects to Login

**Solution:**
- Your token might be expired
- Logout and login again
- Check if token exists in localStorage (F12 → Application → Local Storage)

### Issue: Loading Forever

**Solution:**
- Check if backend server is running (port 5000)
- Check MongoDB connection
- Check browser console for errors
- Try refreshing the page

## Verification Steps

1. ✅ Login to the website
2. ✅ Check navigation bar shows your name
3. ✅ Click "Admin" link (should be visible if you're admin)
4. ✅ Admin Panel page loads
5. ✅ Debug info shows `Role: admin`
6. ✅ "Add Product" button is visible (top right)
7. ✅ Click button opens product form

## Still Not Working?

1. **Check Browser Console** (F12)
   - Look for errors
   - Check network tab for failed requests

2. **Check Server Logs**
   - Backend should show: `MongoDB Connected`
   - No connection errors

3. **Verify MongoDB Connection**
   - Test connection string in `.env` file
   - Make sure database is accessible

4. **Clear Everything and Start Fresh**
   ```bash
   # Clear browser cache
   # Logout from website
   # Update role in MongoDB
   # Login again
   ```

## Quick Test

Run this in browser console (F12) while on admin page:
```javascript
// Check user data
console.log('User:', JSON.parse(localStorage.getItem('token') || '{}'))
// Should show your user info if logged in
```

---

**Need More Help?** Check the server console logs and browser console for detailed error messages.

