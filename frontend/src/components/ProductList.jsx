import ProductCard from "@/components/ProductCard";

export default function ProductList({
  products,
  emptyCatalog,
  emptyMessage,
  compact = false,
}) {
  if (!products.length)
    return (
      <p role="status" className="empty-state">
        {emptyMessage ||
          (emptyCatalog
            ? "El catálogo está vacío. Agrega productos desde Django Admin."
            : "No hay productos para esta categoría.")}
      </p>
    );
  return (
    <div className={compact ? "shelf-grid" : "catalog-grid"}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} compact={compact} />
      ))}
    </div>
  );
}
