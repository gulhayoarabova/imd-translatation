import React, { useEffect, useState } from 'react';
import logo from '../assets/imd.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ru from '../assets/RU.png';
import uzb from '../assets/UZ.png';
import en from '../assets/GB.png';
import store from '../store/store.jsx';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import {instance} from "../api/api.instance.js"
const languages = [
    {
        value: 'en',
        label: 'English',
        flag: en,
    },
    {
        value: 'uz',
        label: 'Uzbek',
        flag: uzb,
    },
    {
        value: 'ru',
        label: 'Russian',
        flag: ru,
    },
];
const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { superuser, setSuperuser, setToken , user } = store();
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { selectedLanguage, setLanguage  } = store();
    const { i18n, t } = useTranslation();
const [loading, setLoading] = useState(false);

    useEffect(() => {
        i18next.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    // Sync language
    useEffect(() => {
        if (i18n.language !== selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        }
    }, [i18n, selectedLanguage]);


    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleLanguageChange = (value) => {
        setLanguage(value);
        setIsDropdownOpen(false);
    };

    const logout = () => {
        setToken(null);
        setSuperuser(false);
        window.location.reload();
    };

    const handleChange = (e) => {
        setData((prev) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        instance
            .post('auth/create_user', data)
            .then((res) => {
                setIsOpen(false);
                toast.success("Yangi foydalanuvchi qo'shildi");
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <div>
         <aside
                className={`md:fixed top-0 left-0 z-0 md:w-[20%] md:h-screen pt-5 transition-transform dark:border-gray-700 ${
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } sm:translate-x-0`}
            >
                    <div className="px-4 ">
                        <div className=" py-4 ">
                            <div className=" flex items-center justify-between  dark:bg-gray-800">
                                <Link to={'/'}>
                                    <img src={logo} className="w-[150px]" alt="Logo" />
                                </Link>
                                <button  onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white"  aria-label="Toggle Sidebar">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zM3 10h14a1 1 0 110 2H3a1 1 0 110-2zM3 15h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                           
                            <ul
                            className={`z-[200] space-y-4 font-medium  flex-col pt-8 dark:bg-gray-800 sm:bg-white sm:w-[60%]  sm:p-4 sm:absolute lg:left-0 lg:w-[100%] sm:right-0 sm:h-[90vh]  md:flex ${
                                sidebarOpen ? 'block' : 'hidden'
                            }`}
                        >
                                {user?.is_superuser && (
                                    <li
                                        className="flex  items-center gap-x-3.5 py-3 px-2 text-sm bg-[#e4f0fb] text-gray-700  hover:border-[#4b3088]  rounded-lg  hover:border-l-4 hover:ml-2 dark:bg-neutral-700 dark:text-white transition-all duration-600 ease-in-out"
                                        href="#"
                                    >
                                        <button className=" text-[17px] text-[#4b3088]  flex gap-4 items-center " onClick={toggleModal}>
                                            <i className="fa-solid fa-user-plus text-[#4b3088]"></i>
                                            {t('user1')} 
                                        </button>
                                    </li>
                                )}

                                {/* new code */}
                                <li
                                    className="flex  items-center gap-x-3.5 py-3 px-2 bg-[#e4f0fb] text-sm text-gray-700 rounded-lg hover:border-[#4b3088] hover:border-l-4 hover:ml-2 dark:bg-neutral-700 dark:text-white transition-all duration-600 ease-in-out"
                                    href="#"
                                >
                                    <Link to={'/downloads'}>
                                        <button className=" text-[17px] flex gap-4 items-center text-[#4b3088]">
                                            <i className="fa-solid fa-clock-rotate-left text-[#4b3088]"></i>
                                            {t('history')}
                                        </button>
                                    </Link>
                                </li>

                                <li className=" w-[100%]  group py-3 px-2 bg-[#e4f0fb] text-sm text-gray-700 rounded-lg hover:border-[#4b3088] hover:border-l-4 hover:ml-2 dark:bg-neutral-700 dark:text-white transition-all duration-600 ease-in-out">
                                    <div className="relative ">
                                        <div onClick={toggleDropdown} className="flex items-center group justify-between ">
                                            <button id="dropdownDefaultButton" className=" text-[17px] flex items-center justify-between  text-[#4b3088]" type="button">
                                                {languages.find(({ value }) => value === selectedLanguage)?.label || selectedLanguage}
                                            </button>
                                            <i className="fa-solid fa-chevron-down text-[#4b3088]"></i>
                                        </div>
                                        {isDropdownOpen && (
                                            <div id="dropdown" className="z-10 w-[100%] pl-3 absolute top-10 left-[-10px] bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">
                                                <ul className=" space-y-2 py-8 text-sm text-gray-700 dark:text-gray-200">
                                                    {languages.map(({ value, label, flag }) => (
                                                        <li className="cursor-pointer flex gap-4  " key={value} onClick={() => handleLanguageChange(value)}>
                                                            <img src={flag} className="w-7 h-4" alt="" />
                                                            {label}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </li>
                                <button
                                    onClick={logout}
                                    type="button"
                                    className="  text-[18px] text-[#ee4455] bg-[#ffe4e5] flex items-center justify-between gap-x-3 font-[450]  p-3.5 text-sm   rounded-lg hover:border-[#af333f] hover:border-l-4 hover:ml-2 hover:cursor-pointer  transition-all duration-600 ease-in-out  group-hover:cursor:pointer"
                                >
                                    {t('logout')}
                                    <i className="fa-solid fa-arrow-right-from-bracket text-[#ee4455] text-[18px]"></i>
                                    {/* <i className="fa-solid fa-right-from-bracket text-[#f36371] text-[18px]"></i> */}
                                </button>
                                <li className=" absolute bottom-7">
                                    <span className="text-sm  text-gray-500 sm:text-center dark:text-gray-400">
                                        © 2023{' '}
                                        <a href="#" className="hover:underline">
                                            IMD™
                                        </a>
                                        . {t('rights')}
                                    </span>
                                </li>
                            </ul>
                           
                        </div>
                    </div>
                </aside>
                {isOpen && (
                    <div
                        id="static-modal"
                        className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('newUser')}</h3>
                                    <button
                                        onClick={toggleModal}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="max-w-sm mx-auto py-10">
                                    <div className="mb-5">
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {t('user')}
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            type="username"
                                            id="username"
                                            name="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="John Smith"
                                            required
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {t('password')}
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="1234"
                                            required
                                        />
                                    </div>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {loading ? (
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline w-5 h-5 mr-3 text-white animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08163 50.5908C9.08163 73.6548 27.9352 92.5082 50 92.5082C72.0648 92.5082 90.9184 73.6548 90.9184 50.5908C90.9184 27.5268 72.0648 8.67339 50 8.67339C27.9352 8.67339 9.08163 27.5268 9.08163 50.5908Z"
                                                    fill="#E5E7EB"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 96.8975 33.5535C95.0489 28.8227 92.7375 24.3692 89.9926 20.348C86.0277 14.3515 80.8826 9.34867 74.833 5.73523C68.7835 2.12178 61.9316 0 55.0011 0C48.0707 0 41.2188 2.12178 35.1692 5.73523C29.1197 9.34867 23.9745 14.3515 20.0097 20.348C17.2648 24.3692 14.9534 28.8227 13.1049 33.5535C12.14 35.9116 13.6094 38.4038 16.0348 39.0409C18.4602 39.678 21.0043 38.2443 21.9692 35.8788C23.544 31.9876 25.5669 28.3206 28.0176 24.985C31.5416 20.3057 36.0501 16.3239 41.2188 13.2723C46.3876 10.2207 52.0966 8.20839 58.0011 8.20839C63.9056 8.20839 69.6146 10.2207 74.7833 13.2723C79.9521 16.3239 84.4606 20.3057 87.9846 24.985C90.4353 28.3206 92.4582 31.9876 94.033 35.8788C94.9979 38.2443 97.542 39.678 93.9676 39.0409Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        ) : (
                                            <p> {t('save')}</p>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                

    </div>
  )
}

export default Sidebar