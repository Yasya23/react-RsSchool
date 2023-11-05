import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import './App.css';
import ElementDetailes from './components/Elemenent';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="element" element={<ElementDetailes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
