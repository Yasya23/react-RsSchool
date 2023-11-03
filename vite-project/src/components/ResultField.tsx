interface Props {
  data: {
    [key: string]: string | string[];
  }[];
  limitForPage: number;
  pageNumber: number;
}

function ResultField(props: Props) {
  const { data, limitForPage, pageNumber } = props;
  const itemNumber = limitForPage * pageNumber - limitForPage + 1;

  const elements = data.map((item, index) => (
    <li key={index} className="item">
      <span>{index + itemNumber}. </span>
      <h2 className="pokemon-name">{item.name}</h2>
    </li>
  ));

  return <ul className="list">{elements}</ul>;
}

export default ResultField;
