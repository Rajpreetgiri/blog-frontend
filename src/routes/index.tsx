// Third-party
import { Routes, Route } from 'react-router-dom';

// Layout
import AppLayout from '../layout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Errorpage from "../pages/Errorpage"
import BlogCreate from '../pages/Blog/create';
import BlogEdit from '../pages/Blog/edit';

function AllRoutes() {
    return (
        <AppLayout>
            <Routes>
                {/* Guest Routes */}
                <Route path="/" element={<Home />} />
                <Route path='*' element={<Errorpage />} />

                {/* Protected Routes */}
                <Route path={`/blog-create/`} element={<BlogCreate />} />
                <Route path={`/blog-edit/:slug`} element={<BlogEdit />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />

            </Routes>
        </AppLayout>
    );
}

export default AllRoutes;
