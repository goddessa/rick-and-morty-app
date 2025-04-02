import React from 'react';
import { Link } from 'react-router-dom';
import copy from '../../../copy';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">{copy.pageNotFound}</h1>

      <div className="w-40 h-40 mb-4">
        <img
          src="/ninja-404.png"
          alt="Not Found"
          className="w-full h-full object-contain"
        />
      </div>

      <p className="text-lg text-gray-700 mb-4">
        {copy.goTo}{' '}
        <Link
          to="/auth/login"
          className="text-blue-600 hover:underline font-medium"
        >
          {copy.loginPage}
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
