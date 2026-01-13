# How to Upload Product Photos 🖼️

## Step-by-Step Guide

### Step 1: Access Admin Panel

1. **Login to your account**
   - Go to: http://localhost:3000/login
   - Login with your admin account credentials

2. **Navigate to Admin Panel**
   - Click on "Admin" in the navigation bar (only visible to admin users)
   - Or go directly to: http://localhost:3000/admin

### Step 2: Add a New Product

1. **Click "Add Product" button**
   - You'll see a green button at the top right: "➕ Add Product"

2. **Fill in Product Details**
   - Product Name
   - Description
   - Price
   - Original Price (optional, for discounts)
   - Category (Educational, Soft Toys, Action Figures, Games, Remote Toys)
   - Age Group
   - Stock quantity
   - Safety Information (optional)

### Step 3: Upload Product Photos

1. **Find the "Images" field** in the form
   - It's located near the bottom of the form, after "Safety Information"

2. **Click "Choose Files" or "Browse"**
   - The file input will open your file browser

3. **Select Images**
   - You can select **up to 5 images** at once
   - Supported formats: JPG, PNG, GIF, WebP (all image formats)
   - Hold `Ctrl` (Windows) or `Cmd` (Mac) to select multiple files

4. **Images are Ready**
   - Selected images will be uploaded when you submit the form
   - No preview needed - just select and submit!

### Step 4: Complete Product Setup

1. **Set Product Flags** (optional checkboxes)
   - ✅ **Featured** - Shows on homepage
   - ✅ **Best Seller** - Shows in best sellers section
   - ✅ **On Sale** - Shows in offers section

2. **Click "Create Product"**
   - All images will be uploaded automatically
   - Images are stored in: `server/uploads/`
   - Images are accessible at: `http://localhost:5000/uploads/[filename]`

### Step 5: Edit Product Images (Optional)

1. **Click the Edit icon** (pencil) next to any product
2. **Select new images** in the Images field
3. **New images will be added** to existing ones (not replaced)
4. **Click "Update Product"**

## Image Requirements

- **Maximum files**: 5 images per product
- **File formats**: JPG, PNG, GIF, WebP, and other image formats
- **File size**: No specific limit (but recommended under 5MB each)
- **Storage location**: `server/uploads/` directory
- **Naming**: Files are automatically renamed with timestamp to avoid conflicts

## Image Display

- **First image** is shown as the main product image
- **Additional images** appear in the image gallery on product detail page
- **Images are responsive** and optimized for display

## Troubleshooting

### Images not uploading?

1. ✅ Check that the `server/uploads/` directory exists
2. ✅ Ensure the backend server is running on port 5000
3. ✅ Verify you're logged in as an admin user
4. ✅ Check browser console for any error messages

### Images not displaying?

1. ✅ Ensure backend server is running (serves images from `/uploads/`)
2. ✅ Check image path in MongoDB (should start with `/uploads/`)
3. ✅ Verify image file exists in `server/uploads/` directory
4. ✅ Check browser network tab for 404 errors

### Permission errors?

1. ✅ Make sure you're logged in with an admin account
2. ✅ Check user role in MongoDB (should be "admin")
3. ✅ Try logging out and logging back in

## Quick Tips

- 📸 **Best practice**: Use square images (1:1 ratio) for best display
- 🖼️ **Multiple angles**: Upload multiple images showing different angles
- 🎨 **Quality**: Use high-quality images but optimize file size
- 📏 **Recommended size**: 800x800px to 1200x1200px for product images

## Example Workflow

```
1. Login as Admin
   ↓
2. Go to Admin Panel
   ↓
3. Click "Add Product"
   ↓
4. Fill product details
   ↓
5. Click "Images" field → Select 1-5 photos
   ↓
6. Check Featured/Best Seller/On Sale if needed
   ↓
7. Click "Create Product"
   ↓
8. ✅ Product with photos is now live!
```

---

**Need Help?** Check the server console for detailed error messages if uploads fail.

