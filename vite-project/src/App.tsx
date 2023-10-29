import { Component } from 'react';
import { Audio } from 'react-loader-spinner';
import './App.css';
import ResultField from './components/ResultField';
import SearchForm from './components/SearchForm';

class App extends Component {
  state = {
    webUrl: 'https://swapi.dev/api/',
    name: localStorage.getItem('siteName') || '',
    data: null,
    loading: false,
  };

  getData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while fetching data:', error);
      return null;
    }
  };

  componentDidMount = async (name = this.state.name): Promise<void> => {
    this.setState({ loading: true });
    const { webUrl } = this.state;
    console.log(name);
    const url = name ? `${webUrl}/${name}/?page=1` : webUrl;
    const data = await this.getData(url);
    const results =
      data.results ||
      (data &&
        Object.entries(data).map((el) => {
          const [name, link] = el;
          return {
            name,
            link,
          };
        }));
    this.setState({ loading: false });
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

  handleSearch = (name: string): void => {
    localStorage.setItem('siteName', name);

    this.setState({
      name,
    });
    this.componentDidMount(name);
  };

  render() {
    const { name, webUrl, data, loading } = this.state;
    return (
      <main>
        <h1>The Star Wars</h1>
        <section className="search">
          <div className="website">{webUrl}</div>
          <SearchForm handleSearch={this.handleSearch} />
        </section>
        <section className="result">
          {loading && (
            <Audio
              height="80"
              width="80"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperClass=""
            />
          )}
          {!loading && data && <ResultField data={data} />}
        </section>
      </main>
    );
  }
}

export default App;
