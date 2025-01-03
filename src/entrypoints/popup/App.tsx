import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="flex items-center justify-center p-8 flex-col bg-red-300 w-full mx-auto min-w-80">
      <h1>{count}</h1>
      <p>My first extension using wxt!</p>
    </section>
  );
}

export default App;
