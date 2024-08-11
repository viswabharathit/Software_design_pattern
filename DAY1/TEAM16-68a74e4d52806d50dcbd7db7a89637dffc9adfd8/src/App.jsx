import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Notfound from './components/pages/Notfound';
import Weblayout from './layout/Weblayout';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import AdminLayout from './layout/Adminlayout';
import Admin from './components/pages/admin/Admin';
import Members from './components/pages/admin/Members';
import TaskAssign from './components/pages/admin/TasksAssign';

import AllTasks from './components/pages/user/AllTasks';
import Complete from './components/pages/user/Complete';
import Notstarted from './components/pages/user/Notstarted';
import Progress from './components/pages/user/Progress';
import UserLayout from './layout/Userlayout';


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
          <Route element={<AdminLayout/>}>
            <Route path='/admin' element={<Admin/>} />
            <Route path='/members' element={<Members/>}/>
            <Route path='/tasks' element={<TaskAssign/>}/>
          </Route>
          <Route element={<UserLayout/>}>
            <Route path='/alltasks' element={<AllTasks/>} />
            <Route path='/completed' element={<Complete/>}/>
            <Route path='/progress' element={<Progress/>}/>
            <Route path='/notstarted' element={<Notstarted/>}/>
          </Route>
        </Routes> 
      </BrowserRouter>
    </>
    </div>
  )
}

export default App;