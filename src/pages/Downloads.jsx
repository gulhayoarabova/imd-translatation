/** @format */

import React, { useEffect, useState } from 'react';
import { instance } from '../api/api.instance.js';
import useStore from '../store/store.jsx';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import Loader from '../components/Loader.jsx';
// const [state, setState] = useState(null);

const Downloads = () => {
    const [downloads, setDownloads] = useState({ jobs: [] });
    const { i18n, t } = useTranslation();
    const { selectedLanguage } = useStore();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    if (i18n.language !== selectedLanguage) {
        i18n.changeLanguage(selectedLanguage);
    }

    const getDownloads = () => {
        setLoading(true);
        instance
            .get(`api/jobs?page=${page}`)
            .then((res) => {
                setDownloads(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getDownloads();
    }, [page]);

    return (
        <div className="flex flex-col items-center py-10 min-h-[80vh]">
            <div className="w-[90%]" id="downloads-section">
                <Breadcrumb />
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {downloads.jobs.length === 0 ? (
                            <div className="flex flex-col items-center h-[70vh] justify-center">
                                <iframe
                                    className="w-[50%] mb-4"
                                    src="https://lottie.host/embed/e6786cc3-d97b-4284-92ca-789aa5cb7758/4na458TOHi.lottie"
                                ></iframe>
                                <p className="text-gray-400">{t('noFile')}</p>
                            </div>
                        ) : (
                            <div className="sm:overflow-x-scroll md:overflow-x-auto">
                                <div className="rounded-lg shadow-lg">
                                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
                                        <thead className="bg-[#44acd9] text-white">
                                            <tr>
                                                <th className="px-4 py-3">{t('fileName')}</th>
                                                <th className="px-4 py-3">{t('translationDate')}</th>
                                                <th className="px-4 py-3">{t('translationTime')}</th>
                                                <th className="px-4 py-3">{t('originalFile')}</th>
                                                <th className="px-4 py-3">{t('translatedFile')}</th>
                                                <th className="px-4 py-3">Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {downloads.jobs.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className={`${index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'} hover:bg-indigo-100`}
                                                >
                                                    <td className="px-4 py-4">{item.job_id || 'N/A'}</td>
                                                    <td className="px-4 py-4">
                                                        {new Date(item.created_at).toLocaleDateString() || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {new Date(item.created_at).toLocaleTimeString() || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 text-gray-700">
                                                        <a
                                                            href={item.original_file_url}
                                                            className="hover:text-blue-600 flex items-center gap-2"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {t('originalFile')}
                                                        </a>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <a
                                                            href={item.translated_file_url}
                                                            className="hover:text-blue-600 flex items-center gap-2"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {t('translatedFile')}
                                                        </a>
                                                    </td>
                                                    <td>{item.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Pagination */}
                                <nav aria-label="Page navigation example" className="flex justify-center pt-5">
                                    <ul className="inline-flex -space-x-px text-sm">
                                        {/* Previous Button */}
                                        <li>
                                            <button
                                                disabled={page === 1}
                                                onClick={() => setPage(page - 1)}
                                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                {t('prev')}
                                            </button>
                                        </li>

                                        {/* Page Numbers */}
                                        {(() => {
                                            const totalPages = downloads.total_pages;
                                            const maxButtons = 9;
                                            const halfRange = Math.floor((maxButtons - 2) / 2);
                                            const buttons = [];
                                            let startPage = Math.max(1, page - halfRange);
                                            let endPage = Math.min(totalPages, page + halfRange);

                                            if (page - halfRange < 1) {
                                                endPage = Math.min(
                                                    totalPages,
                                                    endPage + (halfRange - (page - 1))
                                                );
                                            }
                                            if (page + halfRange > totalPages) {
                                                startPage = Math.max(
                                                    1,
                                                    startPage - ((page + halfRange) - totalPages)
                                                );
                                            }

                                            if (startPage > 1) {
                                                buttons.push(
                                                    <li key="start-ellipsis" className="flex items-center px-3 h-8">
                                                        ...
                                                    </li>
                                                );
                                            }

                                            for (let i = startPage; i <= endPage; i++) {
                                                buttons.push(
                                                    <li key={i}>
                                                        <button
                                                            onClick={() => setPage(i)}
                                                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${i === page
                                                                    ? 'bg-blue-400 text-white font-semibold text-primary'
                                                                    : ''
                                                                }`}
                                                        >
                                                            {i}
                                                        </button>
                                                    </li>
                                                );
                                            }

                                            if (endPage < totalPages) {
                                                buttons.push(
                                                    <li key="end-ellipsis" className="flex items-center px-3 h-8">
                                                        ...
                                                    </li>
                                                );
                                            }

                                            return buttons;
                                        })()}

                                        {/* Next Button */}
                                        <li>
                                            <button
                                                onClick={() => setPage(page + 1)}
                                                disabled={page === downloads.total_pages}
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                {t('next')}
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Downloads;
