import ProductCard from '@/components/ProductCard'

export default function ProductList({ products, emptyCatalog }) {
  if (products.length === 0) {
    return <p role="status" className="rounded-xl border border-slate-700 p-8 text-center text-slate-300">{emptyCatalog ? 'El catálogo está vacío. Agrega productos desde Django Admin.' : 'No hay productos para esta categoría.'}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => <ProductCard key={product.id} {...product} />)}
    </div>
  )
}
