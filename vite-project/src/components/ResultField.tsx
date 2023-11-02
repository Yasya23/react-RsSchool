interface Props {
  data: {
    [key: string]: string | string[];
  }[];
}

function ResultField(props: Props) {
  const { data } = props;
  const elements = data.map((item, index) => {
    const { name, height, gender, link, title } = item;
    return (
      <li key={index}>
        <h2>{name}</h2>
        {title && <h2>{title}</h2>}
        <ul>
          {link && <li>{link}</li>}
          {height && <li>Height: {height}</li>}
          {gender && <li>Gender: {gender}</li>}
        </ul>
      </li>
    );
  });

  return <ol className="list">{elements}</ol>;
}

export default ResultField;
