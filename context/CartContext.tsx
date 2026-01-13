'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

interface CartItem {
  productId: string
  quantity: number
  product?: any
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (productId: string, quantity?: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getCartTotal: () => number
  getCartCount: () => number
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    if (token) {
      fetchCart()
    }
  }, [token])

  const fetchCart = async () => {
    if (!token) return

    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const cartData = await res.json()
        // Fetch product details for each cart item
        const cartWithProducts = await Promise.all(
          cartData.map(async (item: CartItem) => {
            const productRes = await fetch(`${API_URL}/products/${item.productId}`)
            if (productRes.ok) {
              const product = await productRes.json()
              return { ...item, product }
            }
            return item
          })
        )
        setCart(cartWithProducts)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!token) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      })

      if (res.ok) {
        await fetchCart()
        toast.success('Added to cart!')
      } else {
        toast.error('Failed to add to cart')
      }
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  const removeFromCart = async (productId: string) => {
    if (!token) return

    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        await fetchCart()
        toast.success('Removed from cart')
      }
    } catch (error) {
      toast.error('Failed to remove from cart')
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!token) return

    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      })

      if (res.ok) {
        await fetchCart()
      }
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }

  const clearCart = async () => {
    if (!token) return

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setCart([])
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

