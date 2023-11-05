import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/page/:pageNumber" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
