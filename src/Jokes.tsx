import React, { FC, useEffect } from "react";
import axios from "axios";

const request = {
  method: 'GET',
  url: `https://icanhazdadjoke.com/search?term=${''}&limit=10`,
  headers: {
    Accept: 'application/json',
  }
};

const promise = axios(request)

const Jokes: FC<{ search: string }> = ({ search }) => {
  const [jokes, setJokes] = React.useState([]);

  useEffect(() => {
    promise.then((response) => {
      setJokes(response.data.results);
    });
  }, [search]);

  return (
    <div className="jokes-container">
      {jokes.map((j: any) => (
        <div className="joke" key={j.id}>
          {j.joke}
        </div>
      ))}
    </div>
  );
};

export default Jokes;
