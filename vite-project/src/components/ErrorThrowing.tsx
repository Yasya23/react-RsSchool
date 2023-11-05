import { useState } from 'react';

function ErrorThrowing() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error!');
  }

  return (
    <div>
      <button onClick={() => setError(true)}>Throw Error</button>
    </div>
  );
}

export default ErrorThrowing;
