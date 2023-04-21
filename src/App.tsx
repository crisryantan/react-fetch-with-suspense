import React, { FC,  Suspense,  useState } from "react";
import Jokes from "./Jokes";

const App: FC = () => {
  const [search, setSearch] = useState("");

  return (
    <main>
      <h1>Dad Jokes</h1>
      <Suspense>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <p>
          List of dad jokes curated by {"https://icanhazdadjoke.com"}
        </p>

        <Jokes search={search} />
      </Suspense>
    </main>
  );
};

export default App;
