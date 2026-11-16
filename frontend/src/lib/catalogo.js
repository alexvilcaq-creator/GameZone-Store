function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

export function filtrarProductos(productos, categoria, busqueda) {
  const termino = normalizar(busqueda)
  return productos.filter((p) => (categoria === null || p.categoria === categoria)
    && normalizar(`${p.nombre} ${p.descripcion} ${p.categoria_nombre}`).includes(termino))
}

// Recomendación por reglas: categoría elegida, stock disponible y descuento.
export function recomendarProductos(productos, categoria) {
  return productos.filter((p) => p.cantidad_disponible > 0 && (categoria === null || p.categoria === categoria))
    .toSorted((a, b) => b.descuento_porcentaje - a.descuento_porcentaje || b.cantidad_disponible - a.cantidad_disponible || a.id - b.id)
    .slice(0, 3)
}
