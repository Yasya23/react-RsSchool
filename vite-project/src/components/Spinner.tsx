import { Audio } from 'react-loader-spinner';

function Spinner() {
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

export default Spinner;
