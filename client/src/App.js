import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Reporter from './component_landing_page/Reporter';
import Life from './component_landing_page/Life';
import Pgx from './component_landing_page/Pgx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Reporter/>}/>
        <Route path='/life' element={<Life/>}/>
        <Route path='/pgx' element={<Pgx/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
