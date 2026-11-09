import { Gamepad2, ArrowUpRight } from 'lucide-react'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black">
      <div className="site-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
        <div><a href="#inicio" className="flex items-center gap-2 text-xl font-black"><Gamepad2 aria-hidden="true" className="text-violet-400" />GameZone Store</a><p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">El siguiente nivel está en tus manos. Videojuegos y accesorios para cada partida.</p></div>
        <div><h2 className="footer-title">Tienda</h2><ul className="footer-links"><li><a href="#productos">Productos</a></li><li><a href="#categorias">Categorías</a></li><li><a href="#ofertas">Ofertas y selección</a></li></ul></div>
        <div><h2 className="footer-title">Información</h2><ul className="footer-links"><li>Proyecto académico</li><li>Catálogo de demostración</li><li>Precios referenciales en S/</li></ul></div>
        <div><h2 className="footer-title">Contacto</h2><p className="text-sm leading-6 text-slate-500">Canales de atención próximamente.</p><a href="#inicio" className="mt-4 inline-flex items-center gap-2 text-xs text-violet-300">Volver al inicio <ArrowUpRight aria-hidden="true" className="size-3" /></a></div>
      </div>
      <div className="site-container flex flex-col justify-between gap-3 border-t border-white/10 py-5 text-[11px] text-slate-600 sm:flex-row"><p>© {currentYear} GameZone Store. Todos los derechos reservados.</p><p>Hecho para quienes viven el juego.</p></div>
    </footer>
  )
}
