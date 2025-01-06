import { contabiliumApi } from '@/api/contabilium/api'
import { CategorySelector } from '@/components/category-selector/category-selector'
import { productsColumns } from '@/components/products-table/columns'
import { DataTable } from '@/components/products-table/products-table'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/marcas')({
  component: RouteComponent,
})

function RouteComponent() {
  const [value, setValue] = useState<string>('')
  const lastBrand = useRef<string>('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allProducts'],
    queryFn: contabiliumApi.getAllProducts
  })

  const handleSearchProducts = () => {
    lastBrand.current = value
  }

  const filteredProducts = value ? data?.filter(
    (product) => product.idRubro === value
  ) : data

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <section className="flex flex-col gap-4 items-center p-6 min-h-dvh">
      <h1 className='font-bold'>
        Buscar productos por marca
      </h1>
      <header className='flex gap-4 w-full'>
        <CategorySelector onUpdateValue={(value) => setValue(value)} value={value} />
        <Button disabled={!value} onClick={handleSearchProducts}>Buscar</Button>
      </header>
      {isError && <p>Error al obtener los prouctos de la marca {lastBrand.current}</p>}
      {filteredProducts?.length &&
        <DataTable columns={productsColumns} data={filteredProducts} />
      }
    </section>
  )
}
