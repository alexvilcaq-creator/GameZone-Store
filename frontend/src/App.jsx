import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Home from '@/pages/Home'
import { filtrarProductos, recomendarProductos } from '@/lib/catalogo'
import { obtenerCategorias, obtenerProductos } from '@/services/api'

export default function App() {
  const [catalogo, setCatalogo] = useState({ products: [], categories: [] })
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function cargarCatalogo() {
      setLoading(true)
      setError('')
      try {
        const [products, categories] = await Promise.all([
          obtenerProductos(controller.signal),
          obtenerCategorias(controller.signal),
        ])
        if (controller.signal.aborted) return
        setCatalogo({ products, categories })
        setSelectedCategory((previous) => categories.some((c) => c.id === previous) ? previous : null)
      } catch (err) {
        if (controller.signal.aborted) return
        const detalle = err instanceof TypeError
          ? 'Comprueba que Django esté iniciado y que la dirección del servicio y CORS sean correctos.'
          : err.message
        setError(`No se pudo cargar el catálogo. ${detalle}`)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    cargarCatalogo()
    return () => controller.abort()
  }, [reload])

  const filteredProducts = filtrarProductos(catalogo.products, selectedCategory, searchTerm)
  const recommendations = recomendarProductos(catalogo.products, selectedCategory)
  const offers = catalogo.products.filter((p) => p.descuento_porcentaje > 0 && p.cantidad_disponible > 0)
  const selectedCategoryName = catalogo.categories.find((c) => c.id === selectedCategory)?.nombre || 'Todas'

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Home recommendations={recommendations} offers={offers} searchTerm={searchTerm}
        onClearFilters={() => { setSearchTerm(''); setSelectedCategory(null) }} products={filteredProducts} categories={catalogo.categories}
        selectedCategory={selectedCategory} selectedCategoryName={selectedCategoryName}
        onCategoryChange={setSelectedCategory} loading={loading} error={error}
        emptyCatalog={catalogo.products.length === 0} onRefresh={() => setReload((previous) => previous + 1)} />
    </>
  )
}
