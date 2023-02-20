import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { JobsRoute } from '../modules/Jobs/JobsLayout';
import Test from '../modules/Test';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/jobs/list' />} />
            <Route path='/jobs/*' element={<JobsRoute />} />
            <Route path='/test' element={<Test />} />
        </Routes>
    )
}

export default AppRoutes