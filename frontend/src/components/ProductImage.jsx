import { resolverImagen } from "@/lib/imagenes";

export default function ProductImage({ url, nombre }) {
  const image = resolverImagen(url);
  const sprite = image.fila !== undefined;
  function respaldo(event) {
    const img = event.currentTarget;
    if (img.dataset.fallback) return;
    img.dataset.fallback = "true";
    img.removeAttribute("style");
    img.className = "size-full object-contain";
    img.src = "/images/producto-no-disponible.svg";
  }
  return (
    <div className="relative size-full overflow-hidden">
      <img
        key={url}
        src={image.src}
        alt={nombre}
        loading="lazy"
        decoding="async"
        width="500"
        height="500"
        onError={respaldo}
        className={sprite ? "absolute max-w-none" : "size-full object-contain"}
        style={
          sprite
            ? {
                width: "300%",
                height: "300%",
                left: `-${image.columna * 100}%`,
                top: `-${image.fila * 100}%`,
              }
            : undefined
        }
      />
    </div>
  );
}
