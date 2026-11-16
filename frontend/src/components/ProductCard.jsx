const currency = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })
const fallbackImage = '/images/producto-no-disponible.svg'

export default function ProductCard({ nombre, descripcion, precio, imagen_url, categoria_nombre, cantidad_disponible, descuento_porcentaje = 0, precio_final }) {
  function mostrarRespaldo(event) {
    const image = event.currentTarget
    if (!image.dataset.fallback) {
      image.dataset.fallback = 'true'
      image.src = fallbackImage
    }
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d101b] transition duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-[0_12px_40px_-20px_#8b5cf6]">
      <div className="relative aspect-square overflow-hidden bg-[#081326]">
        <img key={imagen_url} src={imagen_url || fallbackImage} alt={nombre} onError={mostrarRespaldo} loading="lazy" decoding="async" width="500" height="500" className="size-full object-contain" />
        <span className="absolute left-3 top-3 max-w-[calc(100%-24px)] break-words rounded-full border border-white/10 bg-black/65 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-sm">{categoria_nombre}</span>
        {descuento_porcentaje > 0 && <span className="absolute bottom-3 right-3 rounded-full bg-violet-700 px-3 py-1 text-xs font-bold text-white">-{descuento_porcentaje}%</span>}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="break-words text-sm font-bold leading-5 text-slate-100 sm:text-base">{nombre}</h3>
        <p className="mb-4 mt-2 flex-1 break-words text-xs leading-5 text-slate-400">{descripcion}</p>
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div>{descuento_porcentaje > 0 && <p className="text-xs text-slate-400"><span className="sr-only">Precio anterior: </span><s>{currency.format(precio)}</s></p>}
          <p className="text-lg font-extrabold tracking-tight text-violet-300"><span className="sr-only">Precio actual: </span>{currency.format(precio_final ?? precio)}</p></div>
        </div>
        <p className={`mt-3 text-xs font-medium ${cantidad_disponible === 0 ? 'text-red-300' : cantidad_disponible <= 5 ? 'text-amber-300' : 'text-emerald-300'}`}>{cantidad_disponible === 0 ? 'Agotado' : cantidad_disponible <= 5 ? `Últimas ${cantidad_disponible} unidades` : `Disponible · ${cantidad_disponible} unidades`}</p>
      </div>
    </article>
  )
}
