import { RefreshCw, X, Sparkles, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import CatalogStatus from "@/components/CatalogStatus";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home({
  products,
  selectedCategory,
  selectedCategoryName,
  onCategoryChange,
  categories,
  loading,
  error,
  emptyCatalog,
  onRefresh,
  searchTerm,
  onClearFilters,
  recommendations,
  offers,
}) {
  const filtered = searchTerm || selectedCategory !== null;
  return (
    <>
      <main id="inicio" className="site-container">
        <Hero />
        <section
          id="productos"
          aria-labelledby="catalog-title"
          tabIndex={-1}
          className="catalog-section"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORA GAMEZONE</p>
              <h2 id="catalog-title">
                Encuentra tu próximo upgrade
                <span className="text-violet-400">.</span>
              </h2>
            </div>
            <Button
              variant="outline"
              onClick={onRefresh}
              disabled={loading}
              className="refresh-button"
            >
              <RefreshCw
                aria-hidden="true"
                className={`size-4 ${loading ? "motion-safe:animate-spin" : ""}`}
              />
              {error ? "Reintentar" : "Actualizar catálogo"}
            </Button>
          </div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
          <div className="results-bar">
            <p role="status" aria-live="polite">
              {loading
                ? "Consultando servicios…"
                : error
                  ? "Servicio no disponible"
                  : `${products.length} resultados · ${selectedCategoryName}`}
              {searchTerm && (
                <span className="result-query"> · “{searchTerm}”</span>
              )}
            </p>
            {filtered && (
              <Button variant="ghost" onClick={onClearFilters} size="sm">
                <X aria-hidden="true" />
                Limpiar filtros
              </Button>
            )}
          </div>
          <div id="catalogo-resultados" aria-busy={loading}>
            <CatalogStatus loading={loading} error={error} />
            {!loading && !error && (
              <ProductList
                products={products}
                emptyCatalog={emptyCatalog}
                emptyMessage={
                  !emptyCatalog && searchTerm
                    ? "No hay productos que coincidan con tu búsqueda y categoría."
                    : undefined
                }
              />
            )}
          </div>
        </section>
        {!loading && !error && (
          <>
            <section
              id="ofertas"
              aria-labelledby="offers-title"
              className="offers-section"
            >
              <div className="section-heading">
                <div>
                  <p className="eyebrow">
                    <Sparkles aria-hidden="true" className="size-3.5" />
                    MÁS JUEGO, MEJOR PRECIO
                  </p>
                  <h2 id="offers-title">Promociones activas</h2>
                </div>
                <a href="#productos" className="text-link">
                  Ver catálogo{" "}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
              <p className="section-note">
                Descuentos reales sobre el precio de catálogo, solo en productos
                con stock.
              </p>
              <ProductList
                products={offers}
                compact
                emptyMessage="No hay promociones activas con stock en este momento."
              />
            </section>
            <section
              id="recomendados"
              aria-labelledby="recommended-title"
              className="recommend-section"
            >
              <div className="section-heading">
                <div>
                  <p className="eyebrow">PARA TU PRÓXIMA PARTIDA</p>
                  <h2 id="recommended-title">Una selección para ti</h2>
                </div>
                <span className="selection-tag">{selectedCategoryName}</span>
              </div>
              <p className="section-note">
                {selectedCategory === null
                  ? "Productos disponibles, priorizando descuentos y stock."
                  : `Selección de ${selectedCategoryName}, priorizando descuentos y stock.`}{" "}
                Recomendaciones por reglas, sin historial personal.
              </p>
              <ProductList
                products={recommendations}
                compact
                emptyMessage="No hay recomendaciones con stock para esta selección."
              />
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
