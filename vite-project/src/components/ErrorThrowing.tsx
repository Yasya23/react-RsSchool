import { Component } from 'react';

class ErrorThrowing extends Component {
  state = {
    error: false,
  };

  render() {
    if (this.state.error) {
      throw new Error('Error!');
    }
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ error: true });
          }}
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default ErrorThrowing;
