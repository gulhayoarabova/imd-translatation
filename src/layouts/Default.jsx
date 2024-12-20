/** @format */
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import Login from '../auth/Login.jsx';
import store from '../store/store.jsx';
import i18next from 'i18next';
import {setAuthToken} from "../api/api.instance.js"
const Default = ({ children }) => {
    const { selectedLanguage, setLanguage , error , token } = store();
    const { i18n, t } = useTranslation();
    const { fetchUser, user, userStatus, userError,  } = store();

    useEffect(() => {
        setAuthToken(token);
        fetchUser();
    }, []);

    useEffect(() => {
        i18next.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    // Sync language
    useEffect(() => {
        if (i18n.language !== selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        }
    }, [i18n, selectedLanguage]);
   

    
    if (!token && !error) {
        return <Login />
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default Default;
