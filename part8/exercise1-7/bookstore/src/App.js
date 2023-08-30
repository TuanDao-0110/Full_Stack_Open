import { useLazyQuery } from '@apollo/client';
import { GET_ALL_AUTHOR } from './query';
import './App.css';
import { useEffect } from 'react';
import MainLayout from './MainLayout';
import { Route, Routes } from 'react-router-dom';
import Welcome from './component/Welcome';
import Authors from './component/Authors';
import Books from './component/Books';
import AddBook from './component/AddBook';

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Welcome />} />
        <Route path='authors' element={<Authors />} />
        <Route path='books' element={<Books/>} />
        <Route path='addbook' element={<AddBook/>}/>
      </Route>
    </Routes>
  );
}

export default App;
