import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-l-md text-gray-600 bg-white hover:bg-gray-100"
            >
                &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button 
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 border text-base ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'} hover:bg-gray-100`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-r-md text-gray-600 bg-white hover:bg-gray-100"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
