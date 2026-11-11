import { Gamepad2, Search, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black">
      <a href="#productos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-violet-700 focus:px-5 focus:py-3 focus:text-white">Saltar al catálogo</a>
      <div className="border-b border-white/5 bg-violet-500/5 px-4 py-2 text-center text-[10px] font-semibold tracking-[0.18em] text-violet-200 sm:text-xs">TU UNIVERSO GAMING. EN UN SOLO LUGAR.</div>
      <div className="site-container flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-5">
        <a href="#inicio" aria-label="GameZone Store, inicio" className="flex shrink-0 items-center gap-2.5">
          <span className="rounded-xl border border-violet-400/40 bg-violet-500/15 p-2 text-violet-400"><Gamepad2 className="size-7" aria-hidden="true" /></span>
          <span className="text-xl font-black tracking-tight">GAME<span className="text-violet-400">ZONE</span><span className="block text-[9px] font-medium tracking-[0.5em] text-slate-400">STORE / PLAY DIFFERENT</span></span>
        </a>
        <nav aria-label="Navegación principal" className="order-3 flex w-full justify-between gap-4 text-sm font-medium text-slate-300 lg:order-none lg:w-auto lg:gap-7">
          <a href="#inicio">Inicio</a><a href="#productos">Productos</a><a href="#categorias">Categorías</a><a href="#ofertas" className="flex items-center gap-1 text-violet-300"><Sparkles className="size-3.5" aria-hidden="true" />Ofertas</a>
        </nav>
        <div className="relative order-4 w-full sm:order-none sm:w-auto">
          <Search className="absolute left-3 top-3 size-4 text-slate-500" aria-hidden="true" />
          <input type="search" disabled aria-label="Búsqueda de productos, próximamente" placeholder="Buscar productos · próximamente" className="h-10 w-full sm:w-64 rounded-full border border-white/15 bg-white/5 pl-9 pr-3 text-xs text-slate-400 placeholder:text-slate-500 disabled:cursor-not-allowed" />
        </div>
      </div>
    </header>
  )
}
