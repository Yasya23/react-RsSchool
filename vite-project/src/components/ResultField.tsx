import { useState, useEffect } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
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
  const { elementNumber } = useParams();
  const { data, limitForPage, pageNumber } = props;
  const [element, setElement] = useState<Character | null>(null);
  const [isClose, setIsClose] = useState(false);
  const itemNumber = limitForPage * pageNumber - limitForPage + 1;

  useEffect(() => {
    const handleClick = async () => {
      if (elementNumber) {
        const data = await fetchData(
          `https://pokeapi.co/api/v2/pokemon/${elementNumber}`
        );
        setElement(data);
      }
    };
    handleClick();
  }, [elementNumber]);

  const elements = data.map((item, index) => {
    const elementNumber = index + itemNumber;
    return (
      <li key={index + itemNumber}>
        <Link to={`${elementNumber}`} className="item">
          <span>{elementNumber}. </span>
          <h2 className="pokemon-name">{item.name}</h2>
        </Link>
      </li>
    );
  });

  const closeDetailes = (e: React.MouseEvent) => {
    if ((e.target as Element).className !== 'pokemon-name') {
      setIsClose(true);
      setElement(null);
    }
  };

  return (
    <div className="elements-wrapper" onClick={(e) => closeDetailes(e)}>
      <section
        className={`result ${element ? 'result-no-scroll detailes-open' : ''}`}
      >
        <ul className="list">{elements}</ul>
      </section>
      <Outlet context={{ element, close: isClose }} />
    </div>
  );
}

export default ResultField;
