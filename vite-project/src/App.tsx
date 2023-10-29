import { Component } from 'react';
import './App.css';
import InputFieldt from './components/InputField';

class App extends Component {
  state = {
    webUrl: 'https://pokeapi.co/api/v2/',
    updatedUrl: null,
    name: localStorage.getItem('siteName') || '',
    data: null,
  };

  onUpdateName = (name: string): void => {
    this.setState({
      name,
    });
  };

  handleSearch = (): void => {
    // localStorage.setItem('siteName', 'pokemon');
    console.log(this.state.name);
  };

  render() {
    return (
      <main>
        <section className="search">
          <div className="website">{this.state.webUrl}</div>
          <InputFieldt onUpdateName={this.onUpdateName} />
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        </section>
        <section className="result">{this.state.data}</section>
      </main>
    );
  }
}

export default App;
