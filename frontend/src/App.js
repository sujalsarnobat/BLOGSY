import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import Login from './Components/account/Login';
import Home from './Components/home/Home';
import DataProvider from './context/DataProvider';
import Header from './Components/header/Header';
import CreatePost from './Components/create/CreatePost';
import DetailView from './Components/details/DetailView';
import Update from './Components/create/Update';
import About from './Components/about/About';
import Contact from './Components/contact/Contact';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};


function App() {

    const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    
      <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
      <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
      <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
       <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>
        <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
         </Route>

        <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
          </Route>
         <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>
         <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>

      </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
    
  );
}

export default App;
