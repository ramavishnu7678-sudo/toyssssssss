import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 animate-float">
              Welcome to WonderToys! 🎈
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Discover magical toys that spark imagination and bring endless joy to your little ones!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-accent-300 hover:scale-105 transition transform shadow-lg text-center"
              >
                Shop Now 🛒
              </Link>
              <Link
                href="/products?onSale=true"
                className="px-8 py-4 bg-accent-500 text-white rounded-full font-semibold text-lg hover:bg-accent-600 hover:scale-105 transition transform shadow-lg text-center"
              >
                View Deals 🎁
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="relative text-9xl text-center animate-bounce-slow">
                🧸🎮🚀🎨🎪
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

