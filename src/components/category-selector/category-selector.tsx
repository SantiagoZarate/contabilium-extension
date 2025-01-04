"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { contabiliumApi } from "@/api/contabilium/api"

interface Props {
  value : string
  onUpdateValue : (newValue : string) => void
}

export function CategorySelector({value, onUpdateValue} : Props) {
  const [open, setOpen] = React.useState(false)

  const {data :marcas, isError, isLoading} = useQuery({
    queryKey: ['rubros'],
    queryFn: contabiliumApi.getAllRubros,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? marcas?.find((framework) => framework.name === value)?.name
            : "Seleccionar marca..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" side="top">
        <Command>
          <CommandInput placeholder="Buscar marca..." className="h-9" />
          <CommandList>
            <CommandEmpty>
              {
                isError ? 'Error al obtener todas las marcas' : 'Marca no encontrada.'
              }
              </CommandEmpty>
            <CommandGroup>
              {marcas?.map((marca) => (
                <CommandItem
                  key={marca.id}
                  value={marca.name}
                  onSelect={(currentValue) => {
                    onUpdateValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="text-black"
                >
                  {marca.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === marca.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
