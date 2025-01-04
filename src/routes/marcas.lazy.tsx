import { CategorySelector } from '@/components/category-selector/category-selector'
import { Button } from '@/components/ui/button'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/marcas')({
  component: RouteComponent,
})

function RouteComponent() {
  const [value, setValue] = useState<string>('')

  return (
    <section className="flex flex-col items-center p-6 min-h-dvh">
      <header className='flex gap-4'>
        <CategorySelector onUpdateValue={(value) => setValue(value)} value={value} />
        <Button>Buscar</Button>
      </header>
    </section>
  )
}
