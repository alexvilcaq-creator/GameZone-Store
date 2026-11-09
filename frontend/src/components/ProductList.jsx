import ProductCard from '@/components/ProductCard'

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p role="status" className="rounded-xl border border-slate-700 p-8 text-center text-slate-300">No hay productos para esta categoría.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => <ProductCard key={product.id} {...product} />)}
    </div>
  )
}
