import { GetPersonResponse } from "@/interfaces/person.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BASE_URL = "https://randomuser.me/api/?results=10&seed=foo";

function getPersons() {
  return fetch(BASE_URL)
    .then((response) => response.json())
    .then((response: GetPersonResponse) => response.results);
}

function App() {
  const [count, setCount] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["persons"],
    queryFn: getPersons,
  });

  return (
    <section className="flex items-center justify-center p-8 flex-col bg-red-300 w-full mx-auto min-w-80">
      <h1>{count}</h1>
      <p>My first extension using wxt!</p>
      <ul className="flex flex-col divide-y">
        {data?.map((user) => (
          <li className="p-2" key={user.id.value}>
            {user.name.first}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
