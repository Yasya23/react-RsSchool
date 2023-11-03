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
  const [pageNumber, setPageNumber] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const getData = async () => {
    setLoading(true);
    const page = (pageNumber - 1) * limitForPage;
    const url = searchParam
      ? searchParam
      : `${webUrl}/?limit=${limitForPage}&offset=${page}`;
    const data = await fetchData(url);
    if (data && 'results' in data) {
      const { results, count } = data;
      setTotalElements(count);
      setData(results);
    } else {
      setTotalElements(1);
      if (data) setData([data]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [searchParam, limitForPage, pageNumber]);

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
    setPageNumber(1);
    setLimitForPage(+number);
  };

  const changePage = (number: number) => {
    setPageNumber((prev) => prev + number);
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
        <Pagination
          page={pageNumber}
          elementsOnThePage={limitForPage}
          totalElements={totalElements}
          changePage={changePage}
        />
        <ElementPerPage handlItemsPerPage={handlItemsPerPage} />
      </ErrorBoundary>
    </main>
  );
}

export default Main;
