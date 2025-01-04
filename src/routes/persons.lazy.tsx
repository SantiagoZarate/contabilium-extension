import { Input } from "@/components/ui/input";
import { GetPersonResponse } from "@/interfaces/person.interface";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const BASE_URL = "https://randomuser.me/api/?results=10&seed=foo";

function getPersons() {
  return fetch(BASE_URL)
    .then((response) => response.json())
    .then((response: GetPersonResponse) => response.results);
}

export const Route = createLazyFileRoute("/persons")({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["persons"],
    queryFn: getPersons,
  });

  return (
    <section className="flex items-center justify-center p-8 flex-col bg-red-300 w-full mx-auto min-w-80">
      <h1>{count}</h1>
      <p>My first extension using wxt!</p>
      <form action="" className="flex flex-col gap-2">
        <label htmlFor="">Buscar producto</label>
        <Input />
      </form>
    </section>
  );
}
