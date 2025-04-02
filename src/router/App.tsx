import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes'; // kompleksni router
import routes from './routes'; // ComplexRoute[]
import AuthProvider from './subrouters/Auth/providers/Auth';


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes routes={routes} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
