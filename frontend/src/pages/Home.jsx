import { ArrowRight, Gamepad2, Keyboard, Zap, Sparkles } from 'lucide-react'
import CategoryFilter from '@/components/CategoryFilter'
import ProductList from '@/components/ProductList'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function Home({ products, selectedCategory, selectedCategoryName, onCategoryChange, categories, loading, error, emptyCatalog, onRefresh }) {
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
          {[ [Gamepad2, 'Universos por descubrir', 'Videojuegos para tu próxima aventura'], [Keyboard, 'Tu setup, tu estilo', 'Controles y periféricos gaming'], [Zap, 'Listo para el siguiente nivel', 'Encuentra tu próximo upgrade'] ].map(([Icon,title,description]) => <div key={title} className="flex items-center gap-3"><Icon aria-hidden="true" className="size-5 shrink-0 text-violet-400" /><div><p className="mb-1 font-semibold text-slate-200">{title}</p><p className="text-[11px] text-slate-500">{description}</p></div></div>)}
        </div>
        <section id="productos" aria-labelledby="catalog-title" className="scroll-mt-6 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-400">Seleccionados para ti</p><h2 id="catalog-title" className="text-2xl font-bold tracking-tight sm:text-3xl">Productos destacados<span className="text-violet-400">.</span></h2></div><p role="status" aria-live="polite" className="text-xs text-slate-500">{loading ? 'Cargando catálogo…' : error ? 'Servicio no disponible' : `${products.length} productos · ${selectedCategoryName}`}</p></div>
          <Button variant="outline" onClick={onRefresh} disabled={loading} className="rounded-full">{error ? 'Reintentar' : 'Actualizar catálogo'}</Button>
          {loading ? (
            <p role="status" className="rounded-xl border border-white/10 p-8 text-center text-slate-300">Cargando catálogo…</p>
          ) : error ? (
            <p role="alert" className="rounded-xl border border-red-400/30 bg-red-950/20 p-6 text-red-200">{error}</p>
          ) : (
            <>
              <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
              <ProductList products={products} emptyCatalog={emptyCatalog} />
            </>
          )}
        </section>
        <section id="ofertas" className="mt-10 flex scroll-mt-6 flex-col items-start justify-between gap-6 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/60 to-blue-950/30 p-7 sm:flex-row sm:items-center sm:p-9">
          <div><p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-violet-300"><Sparkles aria-hidden="true" className="size-4" />Ofertas y selección</p><h2 className="text-2xl font-bold">Un gran setup empieza con un buen accesorio.</h2><p className="mt-3 text-sm text-slate-400">Descubre la selección del catálogo. Precios referenciales; sin descuentos vigentes.</p></div>
          <Button asChild variant="outline" className="shrink-0 rounded-full border-violet-400/40"><a href="#productos">Ver catálogo <ArrowRight aria-hidden="true" /></a></Button>
        </section>
      </main>
      <Footer />
    </>
  )
}
