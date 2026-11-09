import { Button } from '@/components/ui/button'

const categories = ['Todas', 'Videojuegos', 'Controles', 'Periféricos']

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div id="categorias" className="scroll-mt-6 space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Explora por categoría</h2>
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button key={category} variant={selectedCategory === category ? 'default' : 'outline'} aria-pressed={selectedCategory === category} onClick={() => onCategoryChange(category)}>
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}
