import { resolverImagen } from "../src/lib/imagenes.js";
import test from "node:test";
import assert from "node:assert/strict";
import { filtrarProductos, recomendarProductos } from "../src/lib/catalogo.js";
const products = [
  {
    id: 1,
    nombre: "Teclado RGB",
    descripcion: "Mecánico USB",
    categoria_nombre: "Periféricos",
    categoria: 3,
    cantidad_disponible: 8,
    descuento_porcentaje: 0,
  },
  {
    id: 2,
    nombre: "Control Pro",
    descripcion: "Inalámbrico",
    categoria_nombre: "Controles",
    categoria: 2,
    cantidad_disponible: 3,
    descuento_porcentaje: 10,
  },
  {
    id: 3,
    nombre: "Control Mini",
    descripcion: "USB",
    categoria_nombre: "Controles",
    categoria: 2,
    cantidad_disponible: 0,
    descuento_porcentaje: 20,
  },
];
test("búsqueda ignora tildes, mayúsculas y espacios externos", () => {
  assert.deepEqual(filtrarProductos(products, null, " MECANICO "), [
    products[0],
  ]);
  assert.equal(filtrarProductos(products, null, "perifericos").length, 1);
});
test("combina búsqueda y categoría por id", () => {
  assert.deepEqual(filtrarProductos(products, 2, "control"), products.slice(1));
  assert.deepEqual(filtrarProductos(products, 3, "control"), []);
  assert.deepEqual(filtrarProductos(products, null, ""), products);
});
test("recomienda solo productos con stock y de la categoría elegida", () => {
  assert.deepEqual(recomendarProductos(products, 2), [products[1]]);
  assert.deepEqual(recomendarProductos(products, 99), []);
});
test("prioriza descuentos, limita a tres y no modifica el arreglo original", () => {
  const original = JSON.stringify(products);
  assert.deepEqual(recomendarProductos(products, null), [
    products[1],
    products[0],
  ]);
  assert.equal(JSON.stringify(products), original);
  const more = Array.from({ length: 5 }, (_, i) => ({ ...products[0], id: i }));
  assert.equal(recomendarProductos(more, null).length, 3);
});

test("imágenes conocidas usan nueve tomas locales diferentes", () => {
  const files = [
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
  const images = files.map((f) =>
    resolverImagen(
      `https://raw.githubusercontent.com/alexvilcaq-creator/GameZone-Store/main/frontend/public/images/${f}.svg`,
    ),
  );
  assert.equal(new Set(images.map((i) => `${i.fila},${i.columna}`)).size, 9);
  assert.ok(images.every((i) => i.src === "/images/gaming-products.png"));
});
test("imágenes personalizadas no se sustituyen por recursos del catálogo", () => {
  for (const url of [
    "https://example.com/control.png",
    "/images/control-pro.svg",
    "https://raw.githubusercontent.com/otra/tienda/main/frontend/public/images/control-pro.svg",
  ])
    assert.deepEqual(resolverImagen(url), { src: url });
});
test("imagen vacía tiene respaldo local", () => {
  assert.deepEqual(resolverImagen(""), {
    src: "/images/producto-no-disponible.svg",
  });
});
