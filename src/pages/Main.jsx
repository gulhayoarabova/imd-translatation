/** @format */

import Dropzone from 'dropzone';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { instance } from '../api/api.instance.js';
import uploadjpg from '../assets/rb_2857.png';
import Image from '../components/Image.jsx';
import LoaderUpload from '../components/LoaderUpload.jsx';
import Sidebar from '../components/Sidebar.jsx';
import img2 from '../assets/img.svg';
import { fileToServer } from '../utils/index.js';
import  {useSocket}  from './SockerProvider.jsx'; // Adjust the path as needed

Dropzone.autoDiscover = false;

const Main = () => {
    const socket = useSocket();
    const [myDropzone, setMyDropzone] = useState(null);
    const [loading, setLoading] = useState(() => localStorage.getItem('loading') || 'noaction');
    const [file, setFile] = useState(null);
    const [page, setPage] = useState(() => Number(localStorage.getItem('page') || 0));
    const [totalPages, setTotalPages] = useState(() => Number(localStorage.getItem('totalPages') || 0));
    const [action, setAction] = useState(() => JSON.parse(localStorage.getItem('action') || '[]'));
    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem('state');
        return savedState ? JSON.parse(savedState) : null;
    });
    const [status, setStatus] = useState(() => localStorage.getItem('status') || 'default');
    const { t } = useTranslation();
console.log(file);
    // Persist states to localStorage whenever they change
    useEffect(() => localStorage.setItem('loading', loading), [loading]);
    useEffect(() => localStorage.setItem('file', JSON.stringify(file)), [file]);
    useEffect(() => localStorage.setItem('page', page.toString()), [page]);
    useEffect(() => localStorage.setItem('totalPages', totalPages.toString()), [totalPages]);
    useEffect(() => localStorage.setItem('action', JSON.stringify(action)), [action]);
    useEffect(() => localStorage.setItem('state', JSON.stringify(state)), [state]);
    useEffect(() => localStorage.setItem('status', status), [status]);

    // Initialize Dropzone
    useEffect(() => {
        if (!myDropzone) {
            const dropzoneElement = document.querySelector('#my-form');
            if (dropzoneElement) {
                const dropzoneInstance = new Dropzone(dropzoneElement, {
                    url: '/api/upload',
                    autoProcessQueue: false,
                    
                });

                dropzoneInstance.on('addedfile', (selectedFile) => {
                    setFile(selectedFile);
                    fileToServer(selectedFile, setLoading, setState);
                });

                setMyDropzone(dropzoneInstance);
            }
        }

        return () => {
            if (myDropzone) {
                myDropzone.destroy();
                setMyDropzone(null);
            }
        };
    }, [myDropzone]);
    useEffect(() => {
        if (myDropzone) {
            if (file) {
                myDropzone.disable();
            } else {
                myDropzone.enable();
            }
        }
    }, [file, myDropzone]);
    // Initialize Socket.io
    useEffect(() => {
        if (socket && state?.job_id) {
            socket.on(`${state.job_id}`, (message) => {
                console.log(message);
                if (message?.status === 'pdf_started') {
                    setState((prevState) => ({ ...prevState, ...message }));
                    setTotalPages(message.page_num);
                } else if (message?.status === 'pdf_completed') {
                    setState((prevState) => ({ ...prevState, ...message }));
                } else if (message?.status === 'page_completed' && !action.some((a) => a.page_num === message.page_num)) {
                    setAction((prevState) => [...prevState, message]);
                    setPage(message.page_num);
                }
            });
        }

        return () => {
            if (socket && state?.job_id) {
                socket.off(`${state.job_id}`);
            }
        };
    }, [socket, state?.job_id, action]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            fileToServer(selectedFile, setLoading, setState);
        }
    };

    const startEngine = (e) => {
        e.preventDefault();
        if (state?.job_id) {
            setLoading('translating');
            instance
                .post(`/api/start_engine/${state?.job_id}`)
                .then((res) => setState(res.data))
                .catch(() => setLoading('error'));
        }
    };

    const doit = (action, job_id) => {
        instance
            .post(`/api/control/${job_id}`, { action })
            .then(() => setStatus(action))
            .catch(console.log);
    };

    const clear = () => {
        setState({});
        setAction([]);
        setFile(null);
        setPage(0);
        setTotalPages(0);
        setLoading('noaction');
        setStatus('default');
    };
    return (
        <>
            <div className="md:flex justify-between">
                <Sidebar />
                {/* Main Content Placeholder */}
                <div className="md:w-[80%] md:fixed z-10 right-0 md:border-l  py-5 scroll-y">
                    <div onDragOver={(event) => event.preventDefault()}>
                        <div className=" py-2">
                            <div className="w-[95%]  m-auto  flex flex-col  md:rounded-[30px] md:ring-4 ring-gray-100/50 md:bg-[#f5f9fd]    md:border-gray-300">
                                <form className=" w-full p-4 space-y-6">
                                    {action.length === 0 ? (
                                        <>
                                            <label aria-disabled={file}
                                                id="my-form"
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full h-[50vh] md:h-[65vh] border-2 border-[#97c8e7] border-dashed rounded-lg cursor-pointer bg-[#f5f9fd]  dark:bg-gray-700 upload-shadow dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                                {loading === 'uploading' || loading === 'translating' ? (
                                                    <div className="flex flex-col items-center justify-center space-y-5">
                                                        <LoaderUpload />
                                                        <span className="text-gray-400 text-[13px]">{loading === 'uploading' ? 'Yuklanmoqda...' : 'Tarjima qilinmoqda...'}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center p-2">
                                                        <img src={uploadjpg} className="w-[200px]" alt="" />
                                                        <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                                            <span>{file?.name ? file.name : <span className="sm:text-[15px] md:text-[20px]">{t('uploadFile')}</span>}</span>
                                                        </p>
                                                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">{t('onlyPdf')}</p>
                                                    </div>
                                                )}
                                                <input disabled={file} onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </>
                                    ) : (
                                        <div className="h-[60vh] overflow-y-scroll bg-white">
                                            {action
                                                .sort((a, b) => a?.page_num - b?.page_num)
                                                .map((page, index) => (
                                                    <div key={index} className="">
                                                        <div className="flex justify-center   ">
                                                            <Image className="border-2 border-blue-800 h-[60vh] img-shadow" url={`api/preview/${state?.job_id}/${page?.page_num}`} />
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}

                                    {/* progress bar */}
                                    {!(page === 0 && totalPages === 0) && (
                                        <div>
                                            <div className="mb-2 flex justify-between items-center">
                                                <div className="flex items-center gap-x-3">
                                                    <span className="size-8 flex justify-center items-center   text-gray-500   dark:text-neutral-500">
                                                        <img src={img2} alt="" />
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{state?.job_id}</p>
                                                        <p className="text-xs text-gray-500 dark:text-neutral-500">{file?.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : ''}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-x-3 whitespace-nowrap">
                                                <div
                                                    className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                                                    role="progressbar"
                                                    aria-valuenow="1"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    <div
                                                        className="flex flex-col justify-center rounded-full bg-blue-600 text-xs text-white text-center whitespace-nowrap overflow-hidden transition-all duration-500 ease-linear dark:bg-blue-500"
                                                        style={{
                                                            width: `${totalPages > 0 ? (page * 100) / totalPages : 0}%`,
                                                        }}
                                                    ></div>

                                                </div>
                                                <div className="w-6 text-end">
                                                    <span className="text-sm text-gray-800 dark:text-white">{totalPages > 0 ? Math.floor((page * 100) / totalPages) : 0}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* buttons */}
                                    <div className="w-[100%]  md:px-4 mt-4  border-t border-gray-200 ">
                                        <div className="flex sm:flex-col md:flex-row sm:items-start md:items-center gap-y-3   md:justify-between py-3  ">
                                            <div className="rounded-[7px] transition-all duration-800 ease-out flex items-center space-x-2">
                                                <button
                                                    onClick={startEngine}
                                                    className="py-2 px-5 text-sm font-medium active:bg-red-400 text-white bg-[#00B289] border border-[#00B289] rounded-[7px] flex items-center"
                                                >
                                                    {t('translate')}
                                                </button>
                                               
                                                {/* download button */}
                                                <a
                                                    className={`py-2 px-5 text-sm font-medium text-center rounded-[7px] border flex items-center justify-center ${loading !== 'noaction'
                                                            ? 'cursor-not-allowed text-gray-400 border-gray-400'
                                                            : 'border-[#00B289] text-[#00B289]'
                                                        }`}
                                                    href={loading === 'noaction' && state?.url ? state.url : undefined}
                                                    target={loading === 'noaction' ? '_blank' : undefined}
                                                    rel="noopener noreferrer"
                                                >
                                                    Download
                                                    <i className="fa-solid fa-download text-[13px] ml-1.5"></i>
                                                </a>

                                                 {/* clear */}
                                                 <button
                                                    onClick={clear}
                                                    className="py-3 px-5 text-sm font-medium active:bg-red-400 text-[#ee4455] bg-[#ffe4e5]  rounded-[7px] flex items-center"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>


                                            <div className="flex gap-x-4  items-center">
                                                {/* pause button */}
                                                <div className="relative inline-block  rounded-lg">
                                                    <button
                                                        title="Pause"
                                                        onClick={() => {
                                                            doit('paused', state?.job_id);
                                                        }}
                                                        type="button"
                                                        className={`text-white ${state?.job_id && loading === 'translating' ? 'opacity-100' : 'opacity-30'
                                                            }  bg-white border   focus:ring-1 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                                                        disabled={!state?.job_id && loading !== 'translating'}
                                                    >
                                                        <img className="w-[15px]" src="https://img.icons8.com/?size=100&id=q0nxNdfpbYVl&format=png&color=ffd32c" alt="Pause" />
                                                    </button>
                                                </div>
                                                {/* resume button */}
                                                <div className="relative inline-block">
                                                    <button
                                                        title="Resume"
                                                        onClick={() => {
                                                            doit('resumed', state?.job_id);
                                                        }}
                                                        disabled={!state?.job_id && loading !== 'translating'}
                                                        type="button"
                                                        className={`text-white ${state?.job_id && loading === 'translating' ? 'opacity-100' : 'opacity-30'
                                                            }  bg-white border border-gray-300 hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                                                    >
                                                        <img className="w-[15px]" src="https://img.icons8.com/?size=100&id=Uf14653P88Fy&format=png&color=008000" alt="Resume" />
                                                    </button>
                                                </div>
                                                {/* stop button */}
                                                <div className="relative inline-block">
                                                    <button
                                                        title="Terminate"
                                                        onClick={() => {
                                                            doit('terminated', state?.job_id);
                                                        }}
                                                        disabled={!state?.job_id && loading !== 'translating'}
                                                        type="button"
                                                        className={`text-white ${state?.job_id && loading === 'translating' ? 'opacity-100' : 'opacity-30'
                                                            }  bg-white border border-gray-300 hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                                                    >
                                                        <img className="w-[15px]" src="https://img.icons8.com/?size=100&id=80316&format=png&color=000000" alt="Cancel" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
