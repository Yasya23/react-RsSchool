import { Component } from 'react';

class ErrorThrowing extends Component {
  handleThrowError = () => {
    throw new Error('This is an error.');
  };

  render() {
    return (
      <div>
        <button onClick={this.handleThrowError}>Throw Error</button>
      </div>
    );
  }
}

export default ErrorThrowing;
