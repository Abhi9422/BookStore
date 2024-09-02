import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionItem = ({ image, name, price, id, ratings }) => {
    const navigate = useNavigate();

    // Function to generate star rating based on reviews
    const renderStars = (rating) => {
        const fullStars = rating;
        
        const emptyStars = 5 - fullStars ;

        return (
            <>
                {Array(fullStars).fill().map((_, i) => (
                    <svg
                        key={`full-${i}`}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.274 3.931a1 1 0 00.95.69h4.084c.969 0 1.372 1.24.588 1.81l-3.305 2.4a1 1 0 00-.363 1.118l1.274 3.931c.3.921-.755 1.688-1.54 1.118l-3.305-2.4a1 1 0 00-1.176 0l-3.305 2.4c-.784.57-1.839-.197-1.54-1.118l1.274-3.931a1 1 0 00-.363-1.118l-3.305-2.4c-.784-.57-.38-1.81.588-1.81h4.084a1 1 0 00.95-.69l1.274-3.931z" />
                    </svg>
                ))}
                
                {Array(emptyStars).fill().map((_, i) => (
                    <svg
                        key={`empty-${i}`}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.274 3.931a1 1 0 00.95.69h4.084c.969 0 1.372 1.24.588 1.81l-3.305 2.4a1 1 0 00-.363 1.118l1.274 3.931c.3.921-.755 1.688-1.54 1.118l-3.305-2.4a1 1 0 00-1.176 0l-3.305 2.4c-.784.57-1.839-.197-1.54-1.118l1.274-3.931a1 1 0 00-.363-1.118l-3.305-2.4c-.784-.57-.38-1.81.588-1.81h4.084a1 1 0 00.95-.69l1.274-3.931z" />
                    </svg>
                ))}
            </>
        );
    };

    return (
        <div
            onClick={() => navigate(`/collection/${id}`)}
            className="flex flex-col p-5 shadow-md hover:scale-105  rounded gap-2 cursor-pointer hover:bg-gray-50 transition ease-in-out duration-200"
        >
            <img
                className=" duration-200 rounded-lg"
                src={image}
                alt={name}
                loading="lazy"
            />
            <p className="font-semibold text-sm text-slate-600">{name}</p>
            <div className='flex items-center'>
                <p className="font-bold  text-slate-900">{price}$</p>
                {renderStars(ratings)}
            </div>
        </div>
    );
};

export default CollectionItem;
