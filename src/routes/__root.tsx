import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/context/authContext';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isLoggedIn, getAccessToken, accessToken } = useAuth()!;

  return (
    <section className="relative">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background">
        <section className="flex gap-2 p-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/marcas" className="[&.active]:font-bold">
            Marcas
          </Link>
        </section>
        <section className="p-2">
          {isLoggedIn ? 'Sesion iniciada' : <button>iniciar sesion</button>}
        </section>
      </header>
      <section className="mt-[34px]">
        <Outlet />
      </section>
      <TanStackRouterDevtools />
      <Toaster position="top-center" />
    </section>
  );
}
