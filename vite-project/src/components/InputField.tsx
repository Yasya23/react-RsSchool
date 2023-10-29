import { Component } from 'react';

type FieldtProps = {
  onUpdateName: (value: string) => void;
};

type FieldtState = {
  name: string;
};

class InputFieldt extends Component<FieldtProps, FieldtState> {
  constructor(props: FieldtProps) {
    super(props);
    this.state = {
      name: localStorage.getItem('siteName') || '',
    };
  }

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      name: value,
    });
    this.props.onUpdateName(value);
  };

  render() {
    return (
      <input
        className="search-input"
        type="text"
        value={this.state.name}
        onChange={this.handleNameChange}
      />
    );
  }
}

export default InputFieldt;
