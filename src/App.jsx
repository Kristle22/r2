import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Back from './Back';
import Front from './Front';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Front />} />
        <Route path='/admin' element={<Back />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
