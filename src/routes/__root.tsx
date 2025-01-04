import { useAuth } from "@/context/authContext";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent(){
  const { isLoggedIn, getAccessToken, accessToken } = useAuth()!

  return(
    <>
      <header className="min-w-80 flex justify-between items-center">
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
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
} 
