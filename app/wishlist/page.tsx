'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import ProductCard from '@/components/ProductCard'

export default function WishlistPage() {
  const router = useRouter()
  const { token } = useAuth()
  const [wishlist, setWishlist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    fetchWishlist()
  }, [token, router])

  const fetchWishlist = async () => {
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
        const data = await res.json()
        setWishlist(data)
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleWishlist = async (productId: string) => {
    try {
      const isWishlisted = wishlist.some((item) => item._id === productId)
      const method = isWishlisted ? 'DELETE' : 'POST'
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/wishlist/${productId}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.ok) {
        fetchWishlist()
      }
    } catch (error) {
      console.error('Error updating wishlist:', error)
    }
  }

  if (!token) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-2xl"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-display mb-8">My Wishlist ❤️</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💝</div>
            <p className="text-xl text-gray-600 mb-4">Your wishlist is empty</p>
            <a
              href="/products"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onWishlistToggle={() => toggleWishlist(product._id)}
                isWishlisted={true}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

