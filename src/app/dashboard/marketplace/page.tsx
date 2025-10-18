'use client'

import { useState, useEffect } from 'react'
import { 
  Store, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Heart,
  Share2,
  Star,
  MapPin,
  Calendar,
  Users,
  Globe,
  Package
} from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  category: string
  price: number
  images: string[]
  isActive: boolean
  createdAt: string
  views: number
  likes: number
  location: string
  seller: {
    name: string
    rating: number
    productsCount: number
  }
}

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('browse')
  const [products, setProducts] = useState<Product[]>([])
  const [myProducts, setMyProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showProductForm, setShowProductForm] = useState(false)

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setProducts([
      {
        id: '1',
        title: 'Organic Honey from Local Farmers',
        description: 'Pure, raw honey collected from local beekeepers in the highlands. Rich in flavor and natural nutrients.',
        category: 'Food & Beverages',
        price: 1500,
        images: ['/images/honey1.jpg'],
        isActive: true,
        createdAt: '2024-03-10T10:00:00Z',
        views: 245,
        likes: 18,
        location: 'Nairobi, Kenya',
        seller: {
          name: 'Green Valley Farms',
          rating: 4.8,
          productsCount: 12,
        },
      },
      {
        id: '2',
        title: 'Handwoven Baskets',
        description: 'Traditional woven baskets made by local artisans. Perfect for home decoration or storage.',
        category: 'Arts & Crafts',
        price: 2500,
        images: ['/images/basket1.jpg'],
        isActive: true,
        createdAt: '2024-03-08T14:30:00Z',
        views: 189,
        likes: 23,
        location: 'Kisumu, Kenya',
        seller: {
          name: 'Artisan Collective',
          rating: 4.9,
          productsCount: 8,
        },
      },
      {
        id: '3',
        title: 'Solar Phone Charger',
        description: 'Portable solar charger perfect for rural areas with limited electricity access.',
        category: 'Technology',
        price: 4500,
        images: ['/images/charger1.jpg'],
        isActive: true,
        createdAt: '2024-03-05T09:15:00Z',
        views: 312,
        likes: 31,
        location: 'Mombasa, Kenya',
        seller: {
          name: 'EcoTech Solutions',
          rating: 4.6,
          productsCount: 15,
        },
      },
    ])

    setMyProducts([
      {
        id: '4',
        title: 'Digital Marketing Services',
        description: 'Professional social media management and digital marketing for small businesses.',
        category: 'Services',
        price: 15000,
        images: ['/images/service1.jpg'],
        isActive: true,
        createdAt: '2024-02-28T10:00:00Z',
        views: 89,
        likes: 7,
        location: 'Nairobi, Kenya',
        seller: {
          name: 'You',
          rating: 4.5,
          productsCount: 1,
        },
      },
    ])
  }, [])

  const categories = [
    'all',
    'Food & Beverages',
    'Arts & Crafts',
    'Technology',
    'Services',
    'Agriculture',
    'Fashion',
    'Health & Beauty',
  ]

  const tabs = [
    { id: 'browse', name: 'Browse Marketplace', icon: Store },
    { id: 'my-products', name: 'My Products', icon: Package },
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600">Showcase your products and discover opportunities</p>
        </div>
        <button 
          onClick={() => setShowProductForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Filter className="w-4 h-4 text-gray-400 mr-2" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                  <button className="p-1 text-gray-400 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{product.location}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{product.seller.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({product.seller.productsCount} products)</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">KES {product.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {product.views} views
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {product.likes} likes
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      alert(`Contacting ${product.seller.name} about ${product.title}. This would open a messaging interface.`)
                    }}
                    className="flex-1 btn-primary"
                  >
                    Contact Seller
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="card text-center py-12">
              <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse different categories</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'my-products' && (
        <div className="space-y-6">
          {myProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProducts.map((product) => (
                <div key={product.id} className="card">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-primary-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{product.location}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-600">KES {product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {product.views} views
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {product.likes} likes
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first product to the marketplace</p>
              <button 
                onClick={() => setShowProductForm(true)}
                className="btn-primary"
              >
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      )}

      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length + myProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {[...products, ...myProducts].reduce((sum, product) => sum + product.views, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold text-gray-900">
                {[...products, ...myProducts].reduce((sum, product) => sum + product.likes, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Globe className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Products</p>
              <p className="text-2xl font-bold text-gray-900">{myProducts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Sarah's Handmade Jewelry</h3>
            <p className="text-sm text-blue-800 mb-2">
              "Through the Nyota marketplace, I've sold over 50 pieces of handmade jewelry and connected with customers across Kenya."
            </p>
            <p className="text-xs text-blue-700">KES 75,000 in sales</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Tech Solutions by James</h3>
            <p className="text-sm text-green-800 mb-2">
              "My solar phone chargers are now being used in 3 counties, thanks to the marketplace exposure."
            </p>
            <p className="text-xs text-green-700">150+ units sold</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-2">Mary's Digital Services</h3>
            <p className="text-sm text-purple-800 mb-2">
              "I've built a client base of 20+ small businesses through my digital marketing services listed here."
            </p>
            <p className="text-xs text-purple-700">KES 300,000+ revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}
