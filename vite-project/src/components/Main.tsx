import { useState, useEffect } from 'react';
import ResultField from './ResultField';
import SearchForm from './SearchForm';
import Spinner from './Spinner';
import ErrorBoundary from './ErrorCatching';
import ErrorThrowing from './ErrorThrowing';
import fetchData from '../fetchData/fetchData';

const webUrl = 'https://swapi.dev/api/people';

type Character = {
  [key: string]: string | string[];
};

function Main() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Character[] | null>(null);
  const [searchParam, setSearchParam] = useState(
    localStorage.getItem('url') || ''
  );

  const getData = async () => {
    setLoading(true);
    const url = searchParam ? searchParam : webUrl;
    const result = await fetchData(url);
    setData(result);
    setLoading(false);
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

export default Main;
