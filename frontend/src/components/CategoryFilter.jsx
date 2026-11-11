import { Grid2X2, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  const opciones = [{ id: null, nombre: 'Todas' }, ...categories]

  return (
    <div id="categorias" className="scroll-mt-6 border-y border-white/10 py-4">
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {opciones.map((category) => {
          const selected = selectedCategory === category.id
          const Icon = category.id === null ? Grid2X2 : Gamepad2
          return (
            <Button key={category.id ?? 'todas'} variant={selected ? 'default' : 'ghost'} aria-pressed={selected} aria-controls="catalogo-resultados" onClick={() => onCategoryChange(category.id)} className={`min-h-11 rounded-full px-4 text-xs sm:text-sm ${selected ? 'shadow-[0_0_20px_-8px_#a78bfa]' : 'text-slate-400 hover:text-white'}`}>
              <Icon aria-hidden="true" />{category.nombre}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
