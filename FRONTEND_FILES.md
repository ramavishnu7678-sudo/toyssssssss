# 📁 Frontend Files Reference

## 🎨 Frontend Files (For Vercel Deployment)

### **Core Next.js App Files** (`/app` directory)
```
app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout (wraps all pages)
├── globals.css                 # Global styles
├── admin/
│   └── page.tsx               # Admin panel page
├── cart/
│   └── page.tsx               # Shopping cart page
├── checkout/
│   └── page.tsx               # Checkout page
├── login/
│   └── page.tsx               # Login page
├── register/
│   └── page.tsx               # Registration page
├── orders/
│   └── page.tsx               # Orders history page
├── products/
│   ├── page.tsx               # Products listing page
│   └── [id]/
│       └── page.tsx           # Individual product page
└── wishlist/
    └── page.tsx               # Wishlist page
```

### **React Components** (`/components` directory)
```
components/
├── Navbar.tsx                 # Navigation bar
├── Footer.tsx                 # Footer component
├── Hero.tsx                   # Hero section
├── ProductCard.tsx           # Product card component
├── FeaturedProducts.tsx      # Featured products section
├── BestSellers.tsx            # Best sellers section
├── CategoryCards.tsx         # Category cards
└── OffersSection.tsx         # Offers section
```

### **Context/State Management** (`/context` directory)
```
context/
├── AuthContext.tsx            # Authentication context
└── CartContext.tsx            # Shopping cart context
```

### **Configuration Files** (Root directory)
```
Root/
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── next-env.d.ts             # Next.js TypeScript definitions
├── vercel.json                # Vercel deployment config
└── package.json               # Dependencies (shared with backend)
```

---

## 🔧 Backend Files (For Railway/Render Deployment)

### **Server Files** (`/server` directory)
```
server/
├── index.js                   # Express server entry point
├── db.js                      # Database connection
├── middleware/
│   └── auth.js                # Authentication middleware
├── models/
│   ├── User.js                # User model
│   ├── Product.js             # Product model
│   └── Order.js               # Order model
├── routes/
│   ├── auth.js                # Authentication routes
│   ├── products.js            # Product routes
│   ├── cart.js                # Cart routes
│   ├── wishlist.js            # Wishlist routes
│   ├── orders.js              # Order routes
│   └── admin.js               # Admin routes
└── uploads/                   # Uploaded images (not in git)
```

### **Backend Configuration**
```
Root/
├── railway.json               # Railway deployment config
├── render.yaml                # Render deployment config
└── package.json               # Dependencies (shared)
```

---

## 📦 What Goes Where?

### **Vercel (Frontend) Needs:**
- ✅ All `/app` directory files
- ✅ All `/components` directory files
- ✅ All `/context` directory files
- ✅ `next.config.js`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.js`
- ✅ `tsconfig.json`
- ✅ `next-env.d.ts`
- ✅ `vercel.json`
- ✅ `package.json` (for dependencies)
- ✅ `package-lock.json`

### **Railway/Render (Backend) Needs:**
- ✅ All `/server` directory files
- ✅ `package.json` (for dependencies)
- ✅ `package-lock.json`
- ✅ `railway.json` or `render.yaml`

---

## 🚫 Files NOT Needed for Deployment

- `node_modules/` - Will be installed automatically
- `.next/` - Build output (generated)
- `.env` - Environment variables set in platform
- `server/uploads/` - Should use cloud storage in production
- Documentation files (`.md` files) - Optional

---

## 💡 Quick Summary

**Frontend = Everything except `/server` directory**

**Backend = Only `/server` directory + config files**

Both platforms will automatically detect what they need from your repository!

