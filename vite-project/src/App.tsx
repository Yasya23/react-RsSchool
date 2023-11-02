import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Main />} path="/page/:num" />
      </Routes>
    </>
  );
}

export default App;
