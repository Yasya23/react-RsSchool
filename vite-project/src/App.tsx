import { useState, useEffect } from 'react';
import ResultField from './components/ResultField';
import SearchForm from './components/SearchForm';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorCatching';
import ErrorThrowing from './components/ErrorThrowing';

import './App.css';

const webUrl = 'https://swapi.dev/api/people';

type Character = {
  [key: string]: string | string[];
};

type ApiResponse = {
  results: Character[];
};

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Character[] | null>(null);
  const [searchParam, setSearchParam] = useState(
    localStorage.getItem('url') || ''
  );

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ApiResponse = await response.json();
      if ('results' in data) {
        setData(data.results);
      } else {
        setData([data]);
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    const url = searchParam ? searchParam : webUrl;
    fetchData(url);
  };

  useEffect(() => {
    getData();
  }, [searchParam]);

  const handleSearch = (name: string) => {
    if (name) {
      if (data && data.length > 0) {
        const filteredData = data.filter((char) => char.name === name);
        if (filteredData.length > 0) {
          const filteredDataUrl = filteredData[0].url as string;
          localStorage.setItem('url', filteredDataUrl);
          setSearchParam(filteredDataUrl);
        }
      }
    } else {
      localStorage.setItem('url', '');
      setSearchParam('');
    }
  };

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
