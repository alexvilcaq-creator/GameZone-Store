import ProductImage from "@/components/ProductImage";
const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export default function ProductCard({
  nombre,
  descripcion,
  precio,
  imagen_url,
  categoria_nombre,
  cantidad_disponible,
  descuento_porcentaje = 0,
  precio_final,
  compact = false,
}) {
  const stock =
    cantidad_disponible === 0
      ? "Agotado"
      : cantidad_disponible <= 5
        ? `Últimas ${cantidad_disponible} unidades`
        : `Disponible · ${cantidad_disponible} unidades`;
  return (
    <article className={`premium-card ${compact ? "compact-card" : ""}`}>
      <div className="card-image">
        <ProductImage url={imagen_url} nombre={nombre} />
        {descuento_porcentaje > 0 && (
          <span className="discount-label">-{descuento_porcentaje}%</span>
        )}
      </div>
      <div className="card-copy">
        <p className="card-category">{categoria_nombre}</p>
        <h3>{nombre}</h3>
        {!compact && <p className="card-description">{descripcion}</p>}
        <div className="card-price">
          {descuento_porcentaje > 0 && (
            <s>
              <span className="sr-only">Precio anterior: </span>
              {currency.format(precio)}
            </s>
          )}
          <strong>
            <span className="sr-only">Precio actual: </span>
            {currency.format(precio_final ?? precio)}
          </strong>
        </div>
        <p
          className={`stock-label ${cantidad_disponible === 0 ? "stock-out" : cantidad_disponible <= 5 ? "stock-low" : ""}`}
        >
          <span aria-hidden="true" />
          {stock}
        </p>
      </div>
    </article>
  );
}
