import { LoaderCircle, TriangleAlert } from "lucide-react";

export default function CatalogStatus({ loading, error }) {
  if (error)
    return (
      <div role="alert" className="error-state">
        <TriangleAlert aria-hidden="true" className="size-6 shrink-0" />
        <div>
          <h3>No pudimos conectar con el catálogo</h3>
          <p>{error}</p>
          <p>Usa Reintentar para volver a consultar.</p>
        </div>
      </div>
    );
  if (!loading) return null;
  return (
    <div role="status">
      <p className="mb-5 flex items-center gap-2 text-sm text-slate-300">
        <LoaderCircle
          aria-hidden="true"
          className="size-4 motion-safe:animate-spin"
        />
        Cargando catálogo…
      </p>
      <div className="catalog-grid" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="skeleton-card motion-safe:animate-pulse">
            <div />
            <span />
            <span />
          </div>
        ))}
      </div>
    </div>
  );
}
