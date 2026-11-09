import { useState } from 'react'
import Header from '@/components/Header'
import Home from '@/pages/Home'
import { products } from '@/data/products'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const filteredProducts = selectedCategory === 'Todas'
    ? products
    : products.filter((product) => product.categoria === selectedCategory)

  return (
    <>
      <Header />
      <Home products={filteredProducts} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
    </>
  )
}
