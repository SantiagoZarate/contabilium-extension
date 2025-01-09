import { DepositoSelector } from '@/components/deposito-selector';

export default function App() {
  return (
    <section className="flex flex-col gap-6 p-6">
      <h1>Selecciona deposito</h1>
      <DepositoSelector />
    </section>
  );
}
