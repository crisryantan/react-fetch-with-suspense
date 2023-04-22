import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {throttle} from "./throttle";

const createResource = (search: string = '') => {
  let result: any;
  let status = 'initial';

   const request = {
    method: 'GET',
    url: `https://icanhazdadjoke.com/search?term=${search}&limit=10`,
    headers: {
      Accept: 'application/json',
    }
  };

 const promise = throttle(axios(request),3000).then((response) => {
  result = response.data.results;
  status = 'done'
 }).catch(error => {
  result = error;
  status = 'error';
 });

  return {
    read: () => {
      if(status === 'initial') {
        throw promise;
      }
      if(status === 'error') {
        throw result;
      }
      if(status === 'done') {
        return result;
      }
    }
  }
}

const initialResource = createResource();

const Jokes: FC<{ search: string }> = ({ search }) => {
  const [r, setR] = useState(initialResource);

  useEffect(() => {
    setR(createResource(search));
  }, [search]);

  return (
    <div className="jokes-container">
      {r.read().map((j: any) => (
        <div className="joke" key={j.id}>
          {j.joke}
        </div>
      ))}
    </div>
  );
};

export default Jokes;
