'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import Link from 'next/link'

export default function OffersSection() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/onsale`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching on sale products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || products.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-br from-accent-100 to-primary-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold font-display text-gray-800 mb-2">
              Special Offers 🎁
            </h2>
            <p className="text-gray-600">Limited time deals you don't want to miss!</p>
          </div>
          <Link
            href="/products?onSale=true"
            className="hidden md:block px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-semibold"
          >
            View All Deals →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/products?onSale=true"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-semibold"
          >
            View All Deals →
          </Link>
        </div>
      </div>
    </section>
  )
}

