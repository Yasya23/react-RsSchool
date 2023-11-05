import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import ElementDetailes from './components/Elemenent';

function App() {
  return (
    <>
      <Routes>
        <Route path="/page/:pageNumber" element={<Main />}>
          <Route path=":elementNumber" element={<ElementDetailes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
