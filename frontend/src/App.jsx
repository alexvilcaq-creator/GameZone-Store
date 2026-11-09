import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function App() {
  const [verified, setVerified] = useState(false)

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <section className="w-full max-w-lg space-y-5 rounded-2xl border border-violet-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-violet-700">Laboratorio 13 · Ejercicio 02</p>
        <h1 className="text-4xl font-bold tracking-tight">GameZone Store</h1>
        <p className="text-neutral-600">Videojuegos y accesorios gaming. Preparación inicial del proyecto.</p>
        <Button onClick={() => setVerified(true)}>Comprobar interfaz</Button>
        <p role="status" className="text-sm text-neutral-600">
          {verified ? 'React y el botón de shadcn/ui funcionan correctamente.' : 'Entorno listo para continuar con los próximos ejercicios.'}
        </p>
      </section>
    </main>
  )
}
