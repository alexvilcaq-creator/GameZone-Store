import { Gamepad2, ArrowUpRight } from "lucide-react";
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="premium-footer">
      <div className="site-container footer-grid">
        <div>
          <a href="#inicio" className="brand">
            <Gamepad2 aria-hidden="true" className="text-violet-300" />
            <span>
              GameZone <small>STORE · PLAY YOUR WAY</small>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Tu universo gaming, en un solo lugar.
            <br />
            El siguiente nivel empieza contigo.
          </p>
        </div>
        <div>
          <h2>Tienda</h2>
          <a href="#productos">Productos</a>
          <a href="#categorias">Categorías</a>
          <a href="#ofertas">Promociones</a>
        </div>
        <div>
          <h2>Sobre el proyecto</h2>
          <p>Catálogo académico</p>
          <p>Precios referenciales en soles</p>
          <p>Imágenes de productos ficticios</p>
        </div>
        <div>
          <h2>Contacto</h2>
          <p>Canales de atención próximamente.</p>
          <a href="#inicio" className="text-link">
            Volver al inicio{" "}
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {year} GameZone Store. Todos los derechos reservados.</p>
        <p>Diseñado para disfrutar cada partida.</p>
      </div>
    </footer>
  );
}
