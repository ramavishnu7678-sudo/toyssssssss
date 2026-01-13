'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { FiHeart, FiShoppingCart, FiStar, FiMinus, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { token } = useAuth()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [review, setReview] = useState({ rating: 5, comment: '' })
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProduct()
      if (token) {
        checkWishlist()
      }
    }
  }, [id, token])

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${id}`
      )
      if (res.ok) {
        const data = await res.json()
        setProduct(data)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkWishlist = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.ok) {
        const wishlist = await res.json()
        setIsWishlisted(wishlist.some((item: any) => item._id === id))
      }
    } catch (error) {
      console.error('Error checking wishlist:', error)
    }
  }

  const toggleWishlist = async () => {
    if (!token) {
      toast.error('Please login to add to wishlist')
      return
    }

    try {
      const method = isWishlisted ? 'DELETE' : 'POST'
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/wishlist/${id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.ok) {
        setIsWishlisted(!isWishlisted)
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
      }
    } catch (error) {
      toast.error('Failed to update wishlist')
    }
  }

  const handleAddToCart = async () => {
    await addToCart(id as string, quantity)
  }

  const handleBuyNow = async () => {
    await addToCart(id as string, quantity)
    router.push('/cart')
  }

  const submitReview = async () => {
    if (!token) {
      toast.error('Please login to submit a review')
      return
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${id}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(review),
        }
      )
      if (res.ok) {
        toast.success('Review submitted!')
        setReview({ rating: 5, comment: '' })
        fetchProduct()
      } else {
        toast.error('Failed to submit review')
      }
    } catch (error) {
      toast.error('Failed to submit review')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-96 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-32 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl">Product not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
              {product.images && product.images.length > 0 ? (
                <img
                  src={
                    product.images[selectedImage]?.startsWith('http')
                      ? product.images[selectedImage]
                      : `http://localhost:5000${product.images[selectedImage]}`
                  }
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-9xl bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
                  🧸
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img.startsWith('http') ? img : `http://localhost:5000${img}`}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold font-display mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.numReviews} reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-primary-600">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full font-bold">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Age Group: {product.ageGroup} years</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {product.safetyInfo && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Safety Information</h3>
                <p className="text-sm text-yellow-700">{product.safetyInfo}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center gap-2 border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <FiMinus />
                </button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 px-6 py-4 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 px-6 py-4 bg-accent-500 text-white rounded-full font-semibold hover:bg-accent-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button
                onClick={toggleWishlist}
                className={`px-6 py-4 rounded-full font-semibold transition ${
                  isWishlisted
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FiHeart className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          
          {token && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block mb-2">Rating</label>
                <select
                  value={review.rating}
                  onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                  className="px-4 py-2 border rounded-lg"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} {r === 1 ? 'Star' : 'Stars'}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                placeholder="Write your review..."
                className="w-full px-4 py-2 border rounded-lg mb-4"
                rows={4}
              />
              <button
                onClick={submitReview}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
              >
                Submit Review
              </button>
            </div>
          )}

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review: any, idx: number) => (
                <div key={idx} className="border-b pb-6 last:border-0">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.user?.name?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.comment && <p className="text-gray-700 ml-14">{review.comment}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

