interface Props {
  data: {
    [key: string]: string | string[];
  }[];
}

function ResultField(props: Props) {
  const { data } = props;

  const elements = data.map((item, index) => (
    <li key={index} className="item">
      <h2 className="pokemon-name">{item.name}</h2>
    </li>
  ));

  return <ul className="list">{elements}</ul>;
}

export default ResultField;
