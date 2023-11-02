import { useState, useEffect } from 'react';
import ResultField from './components/ResultField';
import SearchForm from './components/SearchForm';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorCatching';
import ErrorThrowing from './components/ErrorThrowing';

import './App.css';

const webUrl = 'https://swapi.dev/api/';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchParam, setSearchParam] = useState(
    localStorage.getItem('name') || ''
  );

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const results =
        data.results ||
        (data &&
          Object.entries(data).map((el) => {
            const [name, link] = el;
            return {
              name,
              link,
            };
          }));
      setData(results);
    } catch (error) {
      console.error('Error while fetching data:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    const url = searchParam ? `${webUrl}${searchParam}/?page=1` : webUrl;
    fetchData(url);
  };

  useEffect(() => {
    getData();
  }, [searchParam]);

  const handleSearch = (name: string) => setSearchParam(name);

  return (
    <main>
      <h1>The Star Wars</h1>
      <section className="search">
        <div className="website">{webUrl}</div>
        <SearchForm handleSearch={handleSearch} />
      </section>
      <section className="result">
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <ErrorThrowing />
          {!loading && data && <ResultField data={data} />}
          {loading && <Spinner />}
        </ErrorBoundary>
      </section>
    </main>
  );
}

export default App;
