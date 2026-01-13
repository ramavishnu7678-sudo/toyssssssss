'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: {
    _id: string
    name: string
    price: number
    originalPrice?: number
    images: string[]
    rating: number
    numReviews: number
    onSale?: boolean
  }
  onWishlistToggle?: () => void
  isWishlisted?: boolean
}

export default function ProductCard({ product, onWishlistToggle, isWishlisted }: ProductCardProps) {
  const { token } = useAuth()
  const { addToCart } = useCart()
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await addToCart(product._id, 1)
  }

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onWishlistToggle) {
      onWishlistToggle()
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product._id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative aspect-square bg-gradient-to-br from-primary-100 to-secondary-100">
          {product.images && product.images.length > 0 && !imageError ? (
            <img
              src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🧸
            </div>
          )}
          {product.onSale && (
            <div className="absolute top-2 left-2 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              SALE
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discount}%
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
              } shadow-lg hover:scale-110 transition`}
            >
              <FiHeart className={isWishlisted ? 'fill-current' : ''} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-primary-500 text-white rounded-full shadow-lg hover:scale-110 transition"
            >
              <FiShoppingCart />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.numReviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

