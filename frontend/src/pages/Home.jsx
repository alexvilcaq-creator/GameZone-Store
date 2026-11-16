import { ArrowRight, Gamepad2, Keyboard, Zap, Sparkles } from 'lucide-react'
import CategoryFilter from '@/components/CategoryFilter'
import ProductList from '@/components/ProductList'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function Home({ products, selectedCategory, selectedCategoryName, onCategoryChange, categories, loading, error, emptyCatalog, onRefresh, searchTerm, onClearFilters, recommendations, offers }) {
  return (
    <>
      <main id="inicio" className="site-container">
        <section aria-labelledby="hero-title" className="relative my-6 flex min-h-[480px] items-center overflow-hidden rounded-2xl border border-white/10 sm:my-8 sm:min-h-[510px]">
          <img src="/images/gaming-setup.png" alt="Setup gaming con monitor, teclado RGB, control y audífonos iluminados en azul y violeta" fetchPriority="high" className="absolute inset-0 size-full object-cover object-[65%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030610]/95 via-[#030610]/75 to-[#030610]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030610]/60 to-transparent" />
          <div className="relative max-w-2xl px-6 py-14 sm:px-12 lg:px-16">
            <p className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-300"><span className="size-1.5 rounded-full bg-violet-400" />Bienvenido a tu zona de juego</p>
            <h1 id="hero-title" className="text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">Lleva tu juego<br />al <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">siguiente nivel</span></h1>
            <p className="mb-8 mt-6 max-w-sm text-sm leading-7 text-slate-300 sm:text-base">Descubre videojuegos, controles y accesorios para cada partida</p>
            <Button asChild size="lg" className="rounded-full px-6 font-semibold shadow-[0_0_30px_-10px_#8b5cf6]"><a href="#productos">Explorar productos <ArrowRight aria-hidden="true" /></a></Button>
            <div className="mt-9 flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-400"><span className="h-px w-7 bg-violet-500" />Play. Connect. Level up.</div>
          </div>
        </section>
        <div className="mb-12 grid grid-cols-1 gap-4 border-b border-white/10 pb-6 text-xs text-slate-400 sm:grid-cols-3">
          {[ [Gamepad2, 'Universos por descubrir', 'Videojuegos para tu próxima aventura'], [Keyboard, 'Tu setup, tu estilo', 'Controles y periféricos gaming'], [Zap, 'Listo para el siguiente nivel', 'Encuentra tu próximo upgrade'] ].map(([Icon,title,description]) => <div key={title} className="flex items-center gap-3"><Icon aria-hidden="true" className="size-5 shrink-0 text-violet-400" /><div><p className="mb-1 font-semibold text-slate-200">{title}</p><p className="text-[11px] text-slate-400">{description}</p></div></div>)}
        </div>
        <section id="productos" aria-labelledby="catalog-title" tabIndex={-1} className="scroll-mt-6 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-400">Seleccionados para ti</p><h2 id="catalog-title" className="text-2xl font-bold tracking-tight sm:text-3xl">Productos destacados<span className="text-violet-400">.</span></h2></div><p role="status" aria-live="polite" className="text-xs text-slate-400">{loading ? 'Consultando servicios…' : error ? 'Servicio no disponible' : `${products.length} productos · ${selectedCategoryName}`}</p></div>
          <Button variant="ghost" onClick={onClearFilters} disabled={!searchTerm && selectedCategory === null} className="mr-3 rounded-full">Limpiar filtros</Button>
          <Button variant="outline" onClick={onRefresh} disabled={loading} className="rounded-full">{error ? 'Reintentar' : 'Actualizar catálogo'}</Button>
          <div id="catalogo-resultados" aria-busy={loading}>
            {loading ? (
              <p role="status" className="rounded-xl border border-white/10 p-8 text-center text-slate-300">Cargando catálogo…</p>
            ) : error ? (
              <p role="alert" className="rounded-xl border border-red-400/30 bg-red-950/20 p-6 text-red-200">{error}</p>
            ) : (
              <>
                <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
                {searchTerm && <p className="my-4 break-words text-sm text-slate-300">Resultados para: “{searchTerm}”</p>}
                <ProductList products={products} emptyCatalog={emptyCatalog} emptyMessage={!emptyCatalog && searchTerm ? 'No hay productos que coincidan con tu búsqueda y categoría.' : undefined} />
              </>
            )}
          </div>
        </section>
        {!loading && !error && (
          <>
            <section id="ofertas" aria-labelledby="offers-title" className="mt-12 scroll-mt-6 space-y-6 rounded-2xl border border-violet-500/20 bg-violet-950/20 p-5 sm:p-8">
              <div><p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-300"><Sparkles aria-hidden="true" className="size-4" />Más para tu próxima partida</p><h2 id="offers-title" className="text-2xl font-bold">Promociones y descuentos</h2><p className="mt-2 text-sm text-slate-400">Descuentos configurados por la tienda sobre el precio de catálogo. Solo productos con stock.</p></div>
              <ProductList products={offers} emptyMessage="No hay promociones activas con stock en este momento." />
            </section>
            <section id="recomendados" aria-labelledby="recommended-title" className="mt-12 space-y-6">
              <div><h2 id="recommended-title" className="text-2xl font-bold">Recomendados para ti</h2><p className="mt-2 text-sm text-slate-400">{selectedCategory === null ? 'Selección con stock, priorizando descuentos y disponibilidad.' : `Productos de ${selectedCategoryName} con stock, priorizando descuentos y disponibilidad.`}</p></div>
              <ProductList products={recommendations} emptyMessage="No hay recomendaciones con stock para esta selección." />
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
