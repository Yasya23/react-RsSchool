import { Component } from 'react';

interface Props {
  data: {
    name: string;
    height: string;
    gender: string;
  }[];
}

class ResultField extends Component<Props> {
  render() {
    const { data } = this.props;
    console.log(data);
    const elements = data.map((item) => {
      const { name, height, gender } = item;
      return (
        <li key={name}>
          <h2>{name}</h2>
          <ul>
            <li>Height: {height}</li>
            <li>Gender: {gender}</li>
          </ul>
        </li>
      );
    });

    return <ol className="list">{elements}</ol>;
  }
}

export default ResultField;
