import { Grid2X2, Gamepad2, Joystick, Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
const categories = [ ['Todas', Grid2X2], ['Videojuegos', Gamepad2], ['Controles', Joystick], ['Periféricos', Keyboard] ]

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div id="categorias" className="scroll-mt-6 border-y border-white/10 py-4">
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {categories.map(([category, Icon]) => (
          <Button key={category} variant={selectedCategory === category ? 'default' : 'ghost'} aria-pressed={selectedCategory === category} onClick={() => onCategoryChange(category)} className={`rounded-full px-4 text-xs sm:text-sm ${selectedCategory === category ? 'shadow-[0_0_20px_-8px_#a78bfa]' : 'text-slate-400 hover:text-white'}`}>
            <Icon aria-hidden="true" />{category}
          </Button>
        ))}
      </div>
    </div>
  )
}
