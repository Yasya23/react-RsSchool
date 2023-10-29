import { Component } from 'react';
import './App.css';
import InputFieldt from './components/InputField';
import ResultField from './components/ResultField';

class App extends Component {
  state = {
    webUrl: 'https://swapi.dev/api/people/?page=1',
    updatedUrl: null,
    name: localStorage.getItem('siteName') || '',
    data: null,
  };

  getData = async () => {
    try {
      const response = await fetch(this.state.webUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch data');
        return null;
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
      return null;
    }
  };

  async componentDidMount() {
    const data = await this.getData();
    this.setState({
      data: data.results,
    });
  }

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
    const { webUrl, data } = this.state;
    return (
      <main>
        <h1>The Star Wars</h1>
        <section className="search">
          <div className="website">{webUrl}</div>
          <InputFieldt onUpdateName={this.onUpdateName} />
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        </section>
        <section className="result">
          {data && <ResultField data={data} />}
        </section>
      </main>
    );
  }
}

export default App;
