import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../layout';

// Lazy-loaded components
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Errorpage = lazy(() => import('../pages/Errorpage'));
const BlogCreate = lazy(() => import('../pages/Blog/create'));
const BlogEdit = lazy(() => import('../pages/Blog/edit'));

function AllRoutes() {
    return (
        <AppLayout>
            <Routes>
                {/* Guest Routes */}
                <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
                <Route path='*' element={<Suspense fallback={<div>Loading...</div>}><Errorpage /></Suspense>} />

                {/* Protected Routes */}
                <Route path="/blog-create/" element={<Suspense fallback={<div>Loading...</div>}><BlogCreate /></Suspense>} />
                <Route path="/blog-edit/:slug" element={<Suspense fallback={<div>Loading...</div>}><BlogEdit /></Suspense>} />

                {/* Auth Routes */}
                <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
            </Routes>
        </AppLayout>
    );
}

export default AllRoutes;
