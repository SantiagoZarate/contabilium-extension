import { contabiliumApi } from '@/api/contabilium/api'
import { CategorySelector } from '@/components/category-selector/category-selector'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { LoaderCircleIcon } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/marcas')({
  component: RouteComponent,
})

function RouteComponent() {
  const [value, setValue] = useState<string>('')
  const lastBrand = useRef<string>('')
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['products'],
    queryFn: () => contabiliumApi.getProducts({ page : 1 }),
    enabled: false
  })

  const handleSearchProducts = () => {
    lastBrand.current = value
    refetch().catch(e => toast(e))
  }

  return (
    <section className="flex flex-col gap-4 items-center p-6 min-h-dvh">
      <header className='flex gap-4'>
        <CategorySelector onUpdateValue={(value) => setValue(value)} value={value} />
        <Button disabled={!value} onClick={handleSearchProducts}>Buscar</Button>
      </header>
      {isError && <p>Error al obtener los prouctos de la marca {lastBrand.current}</p>}
      {!isError && isLoading && <LoaderCircleIcon className='animate-spin'/>}
      {!isError && !isLoading && 
        <ul className='flex flex-col divide-y'>
          {
            data?.map(item => 
              <li className='p-2 uppercase' key={item.id}>
                {item.name}
              </li>
            )
          }
        </ul>
      }
    </section>
  )
}
