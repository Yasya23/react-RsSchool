import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/page/:page" element={<Main />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
