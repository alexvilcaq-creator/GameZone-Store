import { useRef } from "react";
import { Gamepad2, Search, X } from "lucide-react";

export default function Header({ searchTerm, onSearchChange }) {
  const searchRef = useRef(null);
  return (
    <header className="premium-header">
      <a href="#productos" className="skip-link">
        Saltar al catálogo
      </a>
      <div className="site-container header-main">
        <a href="#inicio" aria-label="GameZone Store, inicio" className="brand">
          <span className="brand-icon">
            <Gamepad2 aria-hidden="true" />
          </span>
          <span>
            Game<span className="text-violet-300">Zone</span>
            <small>STORE · EQUIPA TU JUEGO</small>
          </span>
        </a>
        <nav aria-label="Navegación principal" className="header-nav">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#categorias">Categorías</a>
          <a href="#ofertas">
            Ofertas
            <span className="nav-dot" />
          </a>
        </nav>
        <div role="search" className="search-field">
          <Search
            aria-hidden="true"
            className="size-4 shrink-0 text-violet-300"
          />
          <input
            ref={searchRef}
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar productos"
            aria-controls="catalogo-resultados"
            placeholder="¿Qué buscas para tu próxima partida?"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                searchRef.current?.focus();
              }}
              aria-label="Limpiar búsqueda"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
