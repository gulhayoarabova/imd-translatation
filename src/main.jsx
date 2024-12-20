/** @format */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader.jsx';
import "./i18n/i18n.jsx"
createRoot(document.getElementById('root')).render(
        <Suspense fallback={<Loader/>}>

            <App />
            <ToastContainer />

        </Suspense>

);
