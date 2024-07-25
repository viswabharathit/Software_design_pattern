import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Notfound from './components/pages/Notfound';
import Weblayout from './layout/Weblayout';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <>
      <BrowserRouter>
        <Routes>
          <Route element={<Weblayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/*' element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    </div>
  )
}

export default App;