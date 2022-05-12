import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //React State

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  //We are using useEffect Hook To Fetch the data

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is HTTP Error ${res.status}`);
        }
        return res.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Api Posts</h1>
      {loading && <div>Please Wait .... </div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
      <ul>
        {data &&
  
          data.map((data) => {
            return <li key={data.id}>
              <h3>{data.title}</h3>
            </li>
          })}
      </ul>
    </div>
  );
}

export default App;
