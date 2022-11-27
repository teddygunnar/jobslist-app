import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { JobsRoute } from '../modules/Jobs/JobsLayout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/jobs/list' />} />
            <Route path='/jobs/*' element={<JobsRoute />} />
        </Routes>
    )
}

export default AppRoutes