import { useState, useEffect } from 'react';

export const DangerAlert = ({ msg, n }) => {
    const [IsShow, setIsShow] = useState(true);

    useEffect(() => {
        if (!msg) return;

        setIsShow(true); // Show the alert whenever `msg` changes

        const timer = setTimeout(() => {
            setIsShow(false); // Hide alert after 20 seconds
        }, 20000);

        return () => clearTimeout(timer); // Clear previous timer on every update
    }, [msg, n]);

    return (
        msg && IsShow && (
            <div key={n} className="fixed bottom-4 right-1 z-10">
                <div className="fadeIn flex items-center p-4 mb-4 text-red-700 border-t-4 bg-gray-800 border-red-700" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 mr-2 text-sm font-medium text-white">
                        {msg}
                    </div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5  inline-flex items-center justify-center h-8 w-8 bg-gray-800  hover:bg-gray-700"
                        aria-label="Close"
                        onClick={() => setIsShow(false)}
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>

                </div>
            </div >
        )
    );
};

export const SuccessAlert = ({ msg }) => {
    const [IsShow, setIsShow] = useState(true);

    useEffect(() => {
        if (!msg) return;

        setIsShow(true);

        const timer = setTimeout(() => {
            setIsShow(false);
        }, 20000);

        return () => clearTimeout(timer);
    }, [msg]);

    return (
        IsShow && (
            <div className="fixed bottom-4 right-1 z-10">
                <div className="fadeIn flex items-center p-4 mb-4 text-green-600 border-t-4 bg-green-50 dark:bg-gray-800 border-indigo-800" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                        {msg}
                    </div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                        aria-label="Close"
                        onClick={() => setIsShow(false)}
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    );
};
