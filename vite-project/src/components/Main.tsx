import { useState, useEffect } from 'react';
import ResultField from './ResultField';
import SearchForm from './SearchForm';
import Spinner from './Spinner';
import ErrorBoundary from './ErrorCatching';
import ErrorThrowing from './ErrorThrowing';
import fetchData from '../fetchData/fetchData';
import Pagination from './Pagination';
import ElementPerPage from './ElementPerPage';

const webUrl = 'https://pokeapi.co/api/v2/pokemon';

type Character = {
  [key: string]: string | string[];
};

function Main() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Character[] | null>(null);
  const [searchParam, setSearchParam] = useState(
    localStorage.getItem('url') || ''
  );
  const [limitForPage, setLimitForPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const getData = async () => {
    setLoading(true);
    const url = searchParam
      ? searchParam
      : `${webUrl}/?limit=${limitForPage}&offset=${pageNumber * limitForPage}`;
    const result = await fetchData(url);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [searchParam, limitForPage]);

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

  const handlItemsPerPage = (number: string) => {
    setLimitForPage(+number);
  };

  return (
    <main>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <h1>Pokémon</h1>
        <ErrorThrowing />
        <section className="search">
          <div className="website">Pokemon</div>
          <SearchForm handleSearch={handleSearch} />
        </section>
        <section className="result">
          {!loading && data && <ResultField data={data} />}
          {loading && <Spinner />}
        </section>
        <Pagination page={1} />
        <ElementPerPage handlItemsPerPage={handlItemsPerPage} />
      </ErrorBoundary>
    </main>
  );
}

export default Main;
