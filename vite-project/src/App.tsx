import { Component } from 'react';
import './App.css';
import InputFieldt from './components/InputField';
import ResultField from './components/ResultField';

class App extends Component {
  state = {
    webUrl: 'https://swapi.dev/api/',
    name: localStorage.getItem('siteName') || '',
    data: null,
  };

  getData = async (url: string) => {
    try {
      const response = await fetch(url);
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

  componentDidMount = async (): Promise<void> => {
    const { webUrl, name } = this.state;
    const url = name ? `${webUrl}/${name}/?page=1` : webUrl;
    const data = await this.getData(url);
    console.log(data);
    const results =
      data?.results ||
      Object.entries(data).map((el) => {
        const [name, link] = el;
        return {
          name,
          link,
        };
      });
    this.setState({
      data: results,
    });
  };

  onUpdateName = (name: string): void => {
    localStorage.setItem('siteName', name);
    this.setState({
      name,
    });
  };

  handleSearch = (): void => {
    this.componentDidMount();
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
