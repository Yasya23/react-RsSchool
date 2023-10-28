import { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    webUrl: 'https://pokeapi.co/api/v2/',
    updatedUrl: null,
    name: '',
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSearch = (): void => {
    console.log(this.state.name);
  };

  render() {
    return (
      <main>
        <section className="search">
          <div className="website">{this.state.webUrl}</div>
          <input
            className="search-input"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        </section>
        <section className="result"></section>
      </main>
    );
  }
}

export default App;
