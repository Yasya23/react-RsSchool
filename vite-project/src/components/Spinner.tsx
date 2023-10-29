import { Component } from 'react';
import { Audio } from 'react-loader-spinner';

class Spinner extends Component {
  render() {
    return (
      <Audio
        height="80"
        width="80"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperClass=""
      />
    );
  }
}

export default Spinner;
