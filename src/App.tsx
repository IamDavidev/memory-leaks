import { useState } from 'react';
import { useAsync, useControllerCall } from './lib/hooks';

const loadAbortController = () => {
  const controller = new AbortController();
  const signal = controller.signal;
  const abortController = () => controller.abort();
  return {
    controller,
    signal,
    abortController,
  };
  //
};

const getRickAndMorty = () => {
  const { controller, signal } = loadAbortController();
  return {
    callApi: fetch('https://rickandmortyapi.com/api/character/2', {
      signal,
    }).then((res) => res.json()),
    controller,
  };
};

type resultsApi = {
  name: string;
  image: string;
  gender: string;
};

const App = () => {
  const { callEnpoint, isLoading } = useControllerCall();
  const getApiData = () => callEnpoint(getRickAndMorty());
  const [results, setResults] = useState<resultsApi | null>(null);

  useAsync(getApiData, setResults, () => {});
  return (
    <div className="App">
      {isLoading && <div>Loading...</div>}
      <div className="card">
        <img src={results?.image} alt={results?.name} className="card__image" />
        <p className="card__name">{results?.name}</p>
        <span className="card__gender">{results?.gender}</span>
      </div>
    </div>
  );
};
export default App;
