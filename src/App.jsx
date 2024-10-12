import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
     <Toaster />
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
