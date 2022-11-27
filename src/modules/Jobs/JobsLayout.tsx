import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Detail from './Detail/Detail';
import List from './List/List';

export const JobsLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export const JobsRoute = () => {
    return (
        <Routes>
            <Route element={<JobsLayout />}>
                <Route path='list' element={<List />} />
                <Route path='list/:id' element={<Detail />} />
            </Route>
        </Routes>
    )
}