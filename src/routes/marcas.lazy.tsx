import { CategorySelector } from '@/components/category-selector/category-selector'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/marcas')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex flex-col items-center p-6 min-h-dvh">
      <button>
        iniciar sesion
      </button>
      <CategorySelector />
    </section>
  )
}
