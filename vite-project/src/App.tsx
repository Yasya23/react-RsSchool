import { Component } from 'react';
import ResultField from './components/ResultField';
import SearchForm from './components/SearchForm';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorCatching';
import ErrorThrowing from './components/ErrorThrowing';

import './App.css';

type nameState = {
  name: string;
};

class App extends Component {
  state = {
    webUrl: 'https://swapi.dev/api/',
    name: localStorage.getItem('name') || '',
    data: null,
    loading: false,
  };

  getDataFromApi = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while fetching data:', error);
      return null;
    } finally {
      this.setState({ loading: false });
    }
  };

  getData = async (name: string): Promise<void> => {
    this.setState({ loading: true });
    const { webUrl } = this.state;
    const url = name ? `${webUrl}/${name}/?page=1` : webUrl;
    const data = await this.getDataFromApi(url);
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
    this.setState({
      data: results,
    });
  };

  componentDidMount() {
    this.getData(this.state.name);
  }

  componentDidUpdate(prevProps: nameState, prevState: nameState) {
    if (
      this.state.name !== prevState.name &&
      this.state.name !== prevProps.name
    ) {
      this.getData(this.state.name);
    }
  }

  handleSearch = (name: string) => {
    this.setState({ name });
  };

  render() {
    const { webUrl, data, loading } = this.state;
    return (
      <main>
        <h1>The Star Wars</h1>
        <section className="search">
          <div className="website">{webUrl}</div>
          <SearchForm handleSearch={this.handleSearch} />
        </section>
        <section className="result">
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ErrorThrowing />
            {!loading && data && <ResultField data={data} />}
            {loading && <Spinner />}
          </ErrorBoundary>
        </section>
      </main>
    );
  }
}

export default App;
