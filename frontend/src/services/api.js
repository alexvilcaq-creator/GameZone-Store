const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')

async function consultarListado(recurso, signal) {
  const response = await fetch(`${API_URL}/${recurso}/`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`No se pudo consultar ${recurso} (HTTP ${response.status}).`)
  }

  const datos = await response.json()
  if (!Array.isArray(datos)) {
    throw new Error(`El servicio de ${recurso} no devolvió un listado válido.`)
  }
  return datos
}

export function obtenerProductos(signal) {
  return consultarListado('productos', signal)
}

export function obtenerCategorias(signal) {
  return consultarListado('categorias', signal)
}
