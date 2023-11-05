import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Spinner from './Spinner';

type Character = {
  element: { name: string };
  close: boolean;
};

function ElementDetailes() {
  const { element } = useOutletContext<Character>();
  const [closeElement, setCloseElement] = useState(false);

  useEffect(() => {
    setCloseElement(false);
  }, [element]);

  if (!element && !close) {
    return <Spinner />;
  }

  if (!closeElement && element) {
    return (
      <div className="description">
        <h3>{element.name}</h3>
        <div></div>
        <button onClick={() => setCloseElement(true)}>Close</button>
      </div>
    );
  }
}

export default ElementDetailes;
