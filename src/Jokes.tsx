import React, { FC, useEffect } from "react";
import axios from "axios";

const Jokes: FC<{ search: string }> = ({ search }) => {

  return (
    <div className="jokes-container">
      {[].map((j: any) => (
        <div className="joke" key={j.id}>
          {j.joke}
        </div>
      ))}
    </div>
  );
};

export default Jokes;
