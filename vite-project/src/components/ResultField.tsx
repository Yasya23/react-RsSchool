import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useSearchParams } from 'react-router-dom';
import fetchData from '../fetchData/fetchData';

interface Props {
  data: {
    [key: string]: string | string[];
  }[];
  limitForPage: number;
  pageNumber: number;
}

type Character = {
  name: string;
};

function ResultField(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, limitForPage, pageNumber } = props;
  const [element, setElement] = useState<Character | null>(null);
  const [isClose, setIsClose] = useState(true);
  const itemNumber = limitForPage * pageNumber - limitForPage + 1;

  useEffect(() => {
    const details = searchParams.get('details');

    const handleClick = async () => {
      if (details) {
        const data = await fetchData(
          `https://pokeapi.co/api/v2/pokemon/${details}`
        );
        setElement(data);
      }
    };
    handleClick();
  }, [searchParams]);

  const elements = data.map((item, index) => {
    const elementNumber = index + itemNumber;
    return (
      <li key={index + itemNumber}>
        <Link
          state={{ search: `?${searchParams.toString()}` }}
          to={`element?page=${pageNumber}&details=${elementNumber}`}
          className="item"
          onClick={() => setIsClose(false)}
        >
          <span>{elementNumber}. </span>
          <h2 className="pokemon-name">{item.name}</h2>
        </Link>
      </li>
    );
  });

  const closeDetailes = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((e.target as HTMLElement).className !== 'pokemon-name') {
      setIsClose(true);
      setElement(null);
    }
  };

  return (
    <div className="elements-wrapper" onClick={(e) => closeDetailes(e)}>
      <section
        className={`result ${element ? 'result-no-scroll detailes-open' : ''}`}
      >
        <ul className={`list ${element ? 'no-events' : ''}`}>{elements}</ul>
      </section>
      <Outlet context={{ element, isClose }} />
    </div>
  );
}

export default ResultField;
