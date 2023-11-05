import { useEffect, useState } from 'react';
import { useOutletContext, Link, useLocation } from 'react-router-dom';
import Spinner from './Spinner';

type Character = {
  element: { name: string };
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

  if (!closeElement && element) {
    return (
      <div className="description">
        <h3>{element.name}</h3>
        <div></div>
        <Link
          onClick={() => setCloseElement(true)}
          to={location?.state?.search ? `..${location.state.search}` : ''}
          relative="path"
        >
          Close
        </Link>
      </div>
    );
  }
}

export default ElementDetailes;
