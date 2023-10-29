import { Component } from 'react';

type FieldtProps = {
  handleSearch: (value: string) => void;
  // name: string;
};

type FieldtState = {
  name: string;
};

class SearchForm extends Component<FieldtProps, FieldtState> {
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
  };

  handleSearch = () => {
    localStorage.setItem('name', this.state.name);
    this.props.handleSearch(this.state.name);
  };

  render() {
    return (
      <>
        <input
          className="search-input"
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
      </>
    );
  }
}

export default SearchForm;
