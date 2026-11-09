const currency = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })

export default function ProductCard({ nombre, descripcion, precio, imagen, categoria }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-colors hover:border-violet-500/60">
      <img src={imagen} alt={nombre} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="space-y-3 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">{categoria}</p>
        <h3 className="text-xl font-bold text-white">{nombre}</h3>
        <p className="min-h-12 text-sm leading-6 text-slate-400">{descripcion}</p>
        <p className="text-2xl font-bold text-blue-300">{currency.format(precio)}</p>
      </div>
    </article>
  )
}
