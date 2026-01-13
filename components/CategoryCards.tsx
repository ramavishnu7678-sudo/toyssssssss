import Link from 'next/link'

const categories = [
  {
    name: 'Educational',
    icon: '📚',
    description: 'Learn while playing',
    color: 'from-blue-400 to-blue-600',
    href: '/products?category=Educational',
  },
  {
    name: 'Soft Toys',
    icon: '🧸',
    description: 'Cuddly companions',
    color: 'from-pink-400 to-pink-600',
    href: '/products?category=Soft+Toys',
  },
  {
    name: 'Action Figures',
    icon: '🦸',
    description: 'Superhero adventures',
    color: 'from-red-400 to-red-600',
    href: '/products?category=Action+Figures',
  },
  {
    name: 'Games',
    icon: '🎮',
    description: 'Fun for the whole family',
    color: 'from-purple-400 to-purple-600',
    href: '/products?category=Games',
  },
  {
    name: 'Remote Toys',
    icon: '🚁',
    description: 'High-tech fun',
    color: 'from-green-400 to-green-600',
    href: '/products?category=Remote+Toys',
  },
]

export default function CategoryCards() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-display text-gray-800">
          Shop by Category 🎯
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 text-white hover:scale-105 transition transform shadow-lg`}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm text-white/80">{category.description}</p>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

