'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const router = useRouter()
  const { user, token } = useAuth()
  const { cart, removeFromCart, updateQuantity, getCartTotal, loading } = useCart()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

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
        <h1 className="text-4xl font-bold font-display mb-8">Shopping Cart 🛒</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-4"
                >
                  {item.product?.images && item.product.images.length > 0 ? (
                    <img
                      src={
                        item.product.images[0].startsWith('http')
                          ? item.product.images[0]
                          : `http://localhost:5000${item.product.images[0]}`
                      }
                      alt={item.product.name}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full md:w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center text-4xl">
                      🧸
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.product?.name || 'Loading...'}</h3>
                    <p className="text-primary-600 font-bold text-lg mb-4">
                      ${item.product?.price || 0}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100"
                        >
                          <FiMinus />
                        </button>
                        <span className="px-4 py-2 min-w-[60px] text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.min(item.product?.stock || 1, item.quantity + 1)
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center px-6 py-4 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

