import { useEffect, useState } from 'react';
import { useOutletContext, Link, useLocation } from 'react-router-dom';
import Spinner from './Spinner';

type Character = {
  element: {
    name: string;
    abilities: {
      ability: {
        name: string;
      };
    }[];
    height: number;
  };
  isClose: boolean;
};

function ElementDetailes() {
  const location = useLocation();
  const { element, isClose } = useOutletContext<Character>();
  const [closeElement, setCloseElement] = useState(false);

  useEffect(() => {
    setCloseElement(false);
  }, [element]);

  useEffect(() => {
    if (isClose) {
      if (location.state?.search) {
        window.history.back();
      }
    }
  }, [isClose]);

  if (!element && !isClose) {
    return <Spinner />;
  }

  const abilities = element?.abilities.map((el) => el.ability.name);

  if (!closeElement && element) {
    return (
      <div className="description">
        <div>
          <h3>{element.name}</h3>
          <div>Abilities: {abilities}</div>
          <div>Height: {element.height}</div>
        </div>

        <Link
          onClick={() => setCloseElement(true)}
          to={location?.state?.search ? `..${location.state.search}` : ''}
          relative="path"
          className="close-detailes"
        >
          Close
        </Link>
      </div>
    );
  }
}

export default ElementDetailes;
