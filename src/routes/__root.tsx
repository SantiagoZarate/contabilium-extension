import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/context/authContext";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  const { isLoggedIn, getAccessToken, accessToken } = useAuth()!

  return (
    <section className="relative">
      <header className="border-b border-border bg-background z-50 fixed top-0 w-full flex justify-between items-center">
        <section className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/marcas" className="[&.active]:font-bold">
            Marcas
          </Link>
        </section>
        <section className="p-2">
          {
            isLoggedIn ? 'Sesion iniciada' :
              <button>iniciar sesion</button>
          }
        </section>
      </header>
      <section className="mt-[34px]">
        <Outlet />
      </section>
      <TanStackRouterDevtools />
      <Toaster position="top-center" />
    </section>
  )
} 
