import React, { FC, useEffect } from "react";
import axios from "axios";

const createResource = () => {
  let result: any;
  let status = 'initial';

   const request = {
    method: 'GET',
    url: `https://icanhazdadjoke.com/search?term=${''}&limit=10`,
    headers: {
      Accept: 'application/json',
    }
  };

 const promise = axios(request).then((response) => {
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
  return (
    <div className="jokes-container">
      {initialResource.read().map((j: any) => (
        <div className="joke" key={j.id}>
          {j.joke}
        </div>
      ))}
    </div>
  );
};

export default Jokes;
