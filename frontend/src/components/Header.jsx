import { Gamepad2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-5 sm:flex-row">
        <a href="#inicio" className="flex items-center gap-3 text-xl font-bold"><Gamepad2 className="size-9 text-violet-400" aria-hidden="true" />GameZone Store</a>
        <nav aria-label="Navegación principal" className="flex gap-6 text-sm text-slate-300">
          <a className="hover:text-violet-300" href="#inicio">Inicio</a>
          <a className="hover:text-violet-300" href="#productos">Productos</a>
          <a className="hover:text-violet-300" href="#categorias">Categorías</a>
        </nav>
      </div>
    </header>
  )
}
