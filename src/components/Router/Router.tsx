import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import NavMenu from '../NavMenu/NavMenu';
import Unauthorized from '../Unauthorized/Unauthorized';
import UsersList from '../../pages/Users/UsersList/UsersList';
import UserDetail from '../../pages/Users/UserDetail/UserDetail';
import RolesList from '../../pages/Roles/RolesList/RolesList';
import RoleDetail from '../../pages/Roles/RoleDetail/RoleDetail';
import RoleAssigment from '../../pages/RoleAssignment/RoleAssignment';

const Router : FC = () => {
    return (
        <div>            
            <BrowserRouter>
                <NavMenu/>
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/users' element={<UsersList/>}/>
                    <Route path='/users/:id' element={<UserDetail/>}/>
                    <Route path='/users/:id/roles' element={<RoleAssigment/>}/>
                    <Route path='/roles' element={<RolesList/>}/>
                    <Route path='/roles/:id' element={<RoleDetail/>}/>
                    <Route path='/forbidden' element={<Unauthorized/>}/>
                </Routes>
            </BrowserRouter>            
        </div>
    );
};

export default Router;