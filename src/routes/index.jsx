/** @format */
import { lazy } from 'react';

import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlankLayout from '../layouts/Blank.jsx';
import DefaultLayout from '../layouts/Default.jsx';
import Main from '../pages/Main.jsx';


// const UploadPdf = lazy(() => import('../pages/Main.jsx'));
const Login = lazy(() => import('../auth/Login.jsx'));
const Downloads = lazy(() => import('../pages/Downloads.jsx'));
const Home = lazy(() => import('../pages/Main.jsx'));


const routes = [
    {
        element: < Main />,
        path: '/',
        layout: 'default',
        for: 'all',
    },
    // {
    //     element: <Main />,
    //     path: '/main',
    //     layout: 'blank',
    //     for: 'all',
    // },
    {
        element: <Downloads />,
        path: '/downloads',
        layout: 'default',
        for: 'all',
    }
];

const DefaultRouterProvider = () => {
    const [finalRoutes, setFinalRoutes] = useState(routes.filter(route => route.for === 'all'));
    useEffect(() => {
        // const filteredRoutes = routes.filter(route => route.for === user?.role || route.for === 'all');
        const updatedRoutes = routes.map(route => {
            return {
                ...route,
                element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>
            };
        });
        setFinalRoutes(updatedRoutes);
    }, []);

    const router = createBrowserRouter(finalRoutes);
    return <RouterProvider router={router} />;
};

export default DefaultRouterProvider;
