import { ArrowDown, Gamepad2 } from 'lucide-react'
import CategoryFilter from '@/components/CategoryFilter'
import ProductList from '@/components/ProductList'
import { Button } from '@/components/ui/button'

export default function Home({ products, selectedCategory, onCategoryChange }) {
  return (
    <main id="inicio" className="mx-auto max-w-7xl px-6 pb-16">
      <section className="relative my-8 overflow-hidden rounded-3xl border border-blue-900 bg-gradient-to-br from-blue-950 via-slate-900 to-violet-950 px-6 py-14 sm:px-12 sm:py-20">
        <Gamepad2 aria-hidden="true" className="absolute -right-10 top-8 size-72 -rotate-12 text-violet-400/10" />
        <div className="relative max-w-2xl space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Tu próximo nivel comienza aquí</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">GameZone <span className="text-violet-400">Store</span></h1>
          <p className="max-w-lg text-lg leading-8 text-slate-300">Videojuegos, controles y periféricos para disfrutar cada partida. Encuentra tu próximo compañero de juego.</p>
          <Button asChild size="lg"><a href="#productos">Explorar productos <ArrowDown aria-hidden="true" /></a></Button>
        </div>
      </section>
      <section id="productos" aria-labelledby="catalog-title" className="scroll-mt-6 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-2 text-sm text-blue-300">EQUIPA TU PRÓXIMA PARTIDA</p><h2 id="catalog-title" className="text-3xl font-bold">Nuestro catálogo</h2></div>
          <p role="status" aria-live="polite" className="text-sm text-slate-400">{products.length} productos · {selectedCategory}</p>
        </div>
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
        <ProductList products={products} />
      </section>
      <footer className="mt-16 border-t border-slate-800 pt-6 text-sm text-slate-500">GameZone Store · Catálogo de demostración · Precios referenciales en soles</footer>
    </main>
  )
}
