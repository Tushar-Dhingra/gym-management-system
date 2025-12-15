import React from 'react';
import Modal from './Modal';

const ColdStartModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Notice: Initial Loading Delay"
            size="md"
        >
            <div className="p-2">
                <div className="flex items-center justify-center mb-6 text-yellow-500">
                    <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <p className="text-gray-700 text-base mb-4 leading-relaxed">
                    This project relies on a free-tier hosting service (Render), which may cause a
                    <span className="font-semibold text-red-500"> delay of 60-90 seconds </span>
                    on the first API request due to a "cold start."
                </p>
                <p className="text-gray-600 text-sm mb-6">
                    Please be patient while the server wakes up. Subsequent requests will be much faster!
                </p>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md"
                    >
                        I Understand
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ColdStartModal;
