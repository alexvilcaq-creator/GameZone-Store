import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="premium-hero">
      <img
        src="/images/gaming-setup.png"
        alt="Setup gaming ficticio iluminado en azul y violeta"
        fetchPriority="high"
        className="hero-photo"
      />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow">
          <span />
          EL JUEGO CAMBIA. TU SETUP TAMBIÉN.
        </p>
        <h1 id="hero-title">
          Tu próxima partida.
          <br />
          <span>Otro nivel.</span>
        </h1>
        <p className="hero-description">
          Videojuegos, controles y periféricos para jugar a tu manera. Encuentra
          tu próximo upgrade.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            className="min-h-11 rounded-lg bg-violet-600 px-6 text-white hover:bg-violet-500"
          >
            <a href="#productos">
              Explorar productos <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <a href="#ofertas" className="hero-secondary">
            Ver ofertas <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
      <span className="hero-caption">GAMEZONE / PLAY YOUR WAY</span>
    </section>
  );
}
