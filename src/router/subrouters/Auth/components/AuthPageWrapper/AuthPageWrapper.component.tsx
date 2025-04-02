import React from 'react';
import { NavLink } from 'react-router-dom';
import copy from '../../../../../copy';
import { AUTH_PAGES, NAVIGATION_COPY } from '../../../../../utils/constants';


export type AuthPageWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const links = Object.values(AUTH_PAGES);

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
  className = '',
  title,
  children,
}) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${className}`}>
      <h1 className="text-3xl font-bold mb-4">{copy.rickAndMorty}</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        {children}
      </div>

      <nav className="mt-6">
        <ul className="flex gap-4">
          {links.map((link) => (
            <li key={link}>
              <NavLink
                to={`../${link}`}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-black ${isActive ? 'pointer-events-none cursor-default font-semibold' : ''}`
                }
              >
                {copy[NAVIGATION_COPY[link]]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 text-sm text-gray-400 italic text-center">
        <p>{copy.poweredBy}</p>
        <p>Milica</p>
      </div>
    </div>
  );
};

export default AuthPageWrapper;
