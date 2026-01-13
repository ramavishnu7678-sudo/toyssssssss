'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const router = useRouter()
  const { user, token, loading: authLoading } = useAuth()
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Educational',
    ageGroup: '3-5',
    stock: '',
    safetyInfo: '',
    featured: false,
    bestSeller: false,
    onSale: false,
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return
    
    if (!token) {
      router.push('/login')
      return
    }
    
    if (!user) {
      // User data still loading, wait
      return
    }
    
    // Only allow ramavishnu7678@gmail.com to access admin page
    const ADMIN_EMAIL = 'ramavishnu7678@gmail.com'
    if (user.role !== 'admin' || user.email.toLowerCase() !== ADMIN_EMAIL) {
      router.push('/login')
      return
    }
    
    // User is admin with correct email, fetch data
    fetchProducts()
    fetchOrders()
  }, [token, user, authLoading, router])

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formDataToSend = new FormData()

    Object.keys(formData).forEach((key) => {
      if (key !== 'images') {
        formDataToSend.append(key, formData[key as keyof typeof formData] as string)
      }
    })

    images.forEach((image) => {
      formDataToSend.append('images', image)
    })

    try {
      const url = editingProduct
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/products/${editingProduct._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/products`

      const res = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (res.ok) {
        const productData = await res.json().catch(() => null)
        const imageCount = images.length
        toast.success(
          editingProduct 
            ? `Product updated! ${imageCount > 0 ? imageCount + ' new photo(s) uploaded.' : ''}` 
            : `✅ Product created successfully! ${imageCount} photo(s) uploaded. Customers can now see your product with photos!`
        )
        setShowProductForm(false)
        setEditingProduct(null)
        setFormData({
          name: '',
          description: '',
          price: '',
          originalPrice: '',
          category: 'Educational',
          ageGroup: '3-5',
          stock: '',
          safetyInfo: '',
          featured: false,
          bestSeller: false,
          onSale: false,
        })
        setImages([])
        // Clean up preview URLs to prevent memory leaks
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview))
        setImagePreviews([])
        fetchProducts()
      } else {
        const errorData = await res.json().catch(() => ({ message: 'Failed to save product' }))
        toast.error(errorData.message || 'Failed to save product. Please check your images and try again.')
      }
    } catch (error: any) {
      console.error('Error saving product:', error)
      toast.error(error.message || 'Failed to save product. Please make sure backend server is running.')
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/products/${productId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.ok) {
        toast.success('Product deleted!')
        fetchProducts()
      } else {
        toast.error('Failed to delete product')
      }
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          originalPrice: product.originalPrice?.toString() || '',
          category: product.category,
          ageGroup: product.ageGroup,
          stock: product.stock.toString(),
          safetyInfo: product.safetyInfo || '',
          featured: product.featured,
          bestSeller: product.bestSeller,
          onSale: product.onSale,
        })
        setImages([])
        setImagePreviews([])
        setShowProductForm(true)
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/orders/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      )

      if (res.ok) {
        toast.success('Order status updated!')
        fetchOrders()
      } else {
        toast.error('Failed to update order status')
      }
    } catch (error) {
      toast.error('Failed to update order status')
    }
  }

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-12 w-64 rounded mb-8"></div>
            <div className="bg-gray-200 h-64 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Check authentication and admin role
  if (!token) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-xl text-gray-600">Please login to access admin panel.</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl text-gray-600">Loading user data...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Only allow ramavishnu7678@gmail.com to access admin page
  const ADMIN_EMAIL = 'ramavishnu7678@gmail.com'
  if (user.role !== 'admin' || user.email.toLowerCase() !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-xl text-gray-600 mb-4">Access Denied. Only the designated admin email can access this page.</p>
          <p className="text-sm text-gray-500">Your email: {user.email}</p>
          <p className="text-sm text-gray-500">Your role: {user.role}</p>
        </div>
        <Footer />
      </div>
    )
  }

  // Final check - ensure admin access with correct email
  if (!user || user.role !== 'admin' || user.email.toLowerCase() !== ADMIN_EMAIL) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-4 md:py-12">
        {/* Welcome Section with Add Product Button - ALWAYS VISIBLE FOR ADMIN */}
        <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold font-display mb-2">Admin Panel 🛠️</h1>
              <p className="text-lg opacity-90">Welcome back, {user?.name}!</p>
              <p className="text-sm opacity-75 mt-1">Manage your products and orders</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null)
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  originalPrice: '',
                  category: 'Educational',
                  ageGroup: '3-5',
                  stock: '',
                  safetyInfo: '',
                  featured: false,
                  bestSeller: false,
                  onSale: false,
                })
                setImages([])
                setImagePreviews([])
                setShowProductForm(true)
              }}
              className="px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-accent-300 hover:text-white transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 whitespace-nowrap z-10"
              aria-label="Add New Product"
            >
              <FiPlus className="text-2xl" />
              <span>➕ Add New Product</span>
            </button>
          </div>
        </div>

        {/* Product Form Modal */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => {
                    setShowProductForm(false)
                    setEditingProduct(null)
                    setImages([])
                    setImagePreviews([])
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Original Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="Educational">Educational</option>
                      <option value="Soft Toys">Soft Toys</option>
                      <option value="Action Figures">Action Figures</option>
                      <option value="Games">Games</option>
                      <option value="Remote Toys">Remote Toys</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Age Group</label>
                    <select
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-8">6-8 years</option>
                      <option value="9-12">9-12 years</option>
                      <option value="13+">13+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Safety Information</label>
                  <textarea
                    value={formData.safetyInfo}
                    onChange={(e) => setFormData({ ...formData, safetyInfo: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    📸 Product Images - Upload from Your Gallery (Select up to 5 photos)
                  </label>
                  <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center hover:border-primary-500 transition cursor-pointer bg-primary-50">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      id="product-images"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        if (files.length > 5) {
                          toast.error('Maximum 5 images allowed. Please select 5 or fewer images.')
                          return
                        }
                        setImages(files)
                        // Create previews
                        const previews = files.map(file => URL.createObjectURL(file))
                        setImagePreviews(previews)
                        if (files.length > 0) {
                          toast.success(`${files.length} image(s) selected from gallery`)
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="product-images"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-primary-600 font-semibold mb-1">
                        Click to Select Images from Gallery
                      </p>
                      <p className="text-sm text-gray-600">
                        Choose up to 5 images (JPG, PNG, or GIF)
                      </p>
                    </label>
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {imagePreviews.map((preview, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-lg border-2 border-primary-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = images.filter((_, i) => i !== idx)
                              const newPreviews = imagePreviews.filter((_, i) => i !== idx)
                              setImages(newImages)
                              setImagePreviews(newPreviews)
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    📸 You can select up to 5 images. Click to choose from your gallery.
                  </p>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="mr-2"
                    />
                    Featured
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.bestSeller}
                      onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                      className="mr-2"
                    />
                    Best Seller
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.onSale}
                      onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
                      className="mr-2"
                    />
                    On Sale
                  </label>
                </div>

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={images.length === 0 && !editingProduct}
                    className="w-full px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {editingProduct ? (
                      <>💾 Update Product</>
                    ) : (
                      <>✨ Create Product & Upload Photos</>
                    )}
                  </button>
                  {images.length === 0 && !editingProduct && (
                    <p className="text-sm text-yellow-600 text-center">
                      ⚠️ Please select at least one image from your gallery to upload
                    </p>
                  )}
                  {images.length > 0 && (
                    <p className="text-sm text-green-600 text-center">
                      ✅ {images.length} image(s) ready to upload. Click button above to create product and upload photos for customers to see.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          {loading ? (
            <div className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Image</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Stock</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="p-2">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={
                              product.images[0].startsWith('http')
                                ? product.images[0]
                                : `http://localhost:5000${product.images[0]}`
                            }
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                            🧸
                          </div>
                        )}
                      </td>
                      <td className="p-2 font-semibold">{product.name}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">{product.stock}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order ID</th>
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Total</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-2">{order._id.slice(-8).toUpperCase()}</td>
                    <td className="p-2">{order.user?.name || 'N/A'}</td>
                    <td className="p-2">${order.totalAmount.toFixed(2)}</td>
                    <td className="p-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="px-3 py-1 border rounded-lg"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <span className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

