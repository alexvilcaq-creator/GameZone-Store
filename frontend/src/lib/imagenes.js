// Fotografías generadas del catálogo ficticio, incluidas en el repositorio.
const ilustraciones = [
  "game-space",
  "game-race",
  "game-kingdom",
  "control-wireless",
  "control-pro",
  "control-compact",
  "keyboard",
  "mouse",
  "headset",
];

export function resolverImagen(url) {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(
      /^\/alexvilcaq-creator\/GameZone-Store\/[^/]+\/frontend\/public\/images\/([^/]+)\.svg$/,
    );
    const index =
      parsed.hostname === "raw.githubusercontent.com" &&
      parsed.protocol === "https:" &&
      match
        ? ilustraciones.indexOf(match[1])
        : -1;
    if (index >= 0)
      return {
        src: "/images/gaming-products.png",
        fila: Math.floor(index / 3),
        columna: index % 3,
      };
  } catch {
    /* Las rutas locales y URL desconocidas conservan su imagen. */
  }
  return { src: url || "/images/producto-no-disponible.svg" };
}
