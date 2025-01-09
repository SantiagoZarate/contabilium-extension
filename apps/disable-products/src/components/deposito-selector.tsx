import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@contabilium-extensions/ui';
import { ChevronsUpDown } from '@contabilium-extensions/ui/icons';

const depositos = [
  {
    id: 1,
    name: 'MERCADO LIBRE',
  },
  {
    id: 2,
    name: 'SHOWROOM PRINGLES',
  },
];

export function DepositoSelector() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  // useEffect(() => {
  //   storage.getItem<string>('local:deposito').then(value => {
  //     setValue(value ?? '');
  //   });
  // }, []);

  // useEffect(() => {
  //   storage.setItem('local:deposito', value);
  // }, [value]);

  // storage.watch<number>(
  //   'local:installDate',
  //   (newInstallDate, oldInstallDate) => {
  //     console.log({ newInstallDate, oldInstallDate });
  //   },
  // );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-fit flex-1 justify-between"
        >
          {value
            ? depositos?.find(deposito => deposito.name === value)?.name
            : 'Seleccionar marca...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full" side="bottom">
        <Command>
          <CommandInput placeholder="Buscar marca..." className="h-9" />
          <CommandList>
            <CommandEmpty>Deposito no encontrado</CommandEmpty>
            <CommandGroup>
              {depositos?.map(deposito => (
                <CommandItem
                  key={deposito.id}
                  value={deposito.name}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                  className="text-black"
                >
                  {deposito.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
