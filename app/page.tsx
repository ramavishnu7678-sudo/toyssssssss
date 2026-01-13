import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import CategoryCards from '@/components/CategoryCards'
import FeaturedProducts from '@/components/FeaturedProducts'
import BestSellers from '@/components/BestSellers'
import OffersSection from '@/components/OffersSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <BestSellers />
      <OffersSection />
      <Footer />
    </div>
  )
}

