import React from 'react';
import AuthLocalContext from './AuthLocal.context';

const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthLocalContext.Provider value={{}}>{children}</AuthLocalContext.Provider>
  );
};

export default Auth;
