import { Link } from 'react-router-dom';

interface Props {
  data: {
    [key: string]: string | string[];
  }[];
}

function ResultField(props: Props) {
  const { data } = props;
  const elements = data.map((item, index) => {
    return (
      <li key={index} className="item">
        <h2 className="pokemon-name">{item.name}</h2>
      </li>
    );
  });

  return (
    <Link to="/page/1">
      <ul className="list">{elements}</ul>
    </Link>
  );
}

export default ResultField;
