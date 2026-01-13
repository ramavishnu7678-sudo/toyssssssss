'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiUser, FiSearch, FiHeart, FiMenu, FiX } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold font-display">
            <span className="text-3xl">🧸</span>
            <span>WonderToys</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for toys..."
                className="w-full px-4 py-2 pl-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="hover:text-accent-300 transition">
              Shop
            </Link>
            {user ? (
              <>
                <Link href="/wishlist" className="relative hover:text-accent-300 transition">
                  <FiHeart className="text-xl" />
                </Link>
                <Link href="/cart" className="relative hover:text-accent-300 transition">
                  <FiShoppingCart className="text-xl" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="hover:text-accent-300 transition">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <FiUser />
                  <span>{user.name}</span>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="ml-2 px-3 py-1 bg-accent-500 text-white rounded-full hover:bg-accent-600 transition font-semibold"
                    >
                      📊 Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="ml-2 px-3 py-1 bg-white text-primary-600 rounded-full hover:bg-accent-300 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full hover:bg-white/20 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white text-primary-600 rounded-full hover:bg-accent-300 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for toys..."
              className="w-full px-4 py-2 pl-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
        </form>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              href="/products"
              className="block hover:text-accent-300 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            {user ? (
              <>
                <Link
                  href="/wishlist"
                  className="block hover:text-accent-300 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link
                  href="/cart"
                  className="block hover:text-accent-300 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart ({getCartCount()})
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block hover:text-accent-300 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="pt-2 border-t border-white/20">
                  <p className="mb-2">{user.name}</p>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block mb-2 px-4 py-2 bg-accent-500 text-white rounded-full hover:bg-accent-600 transition font-semibold text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      📊 Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 bg-white text-primary-600 rounded-full hover:bg-accent-300 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block hover:text-accent-300 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 bg-white text-primary-600 rounded-full hover:bg-accent-300 transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

