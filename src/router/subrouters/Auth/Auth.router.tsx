import { Outlet } from 'react-router-dom';
import AuthLocalProvider from './providers/AuthLocal/AuthLocal';

const AuthRouter = () => {
  return (
    <AuthLocalProvider>
      <Outlet />
    </AuthLocalProvider>
  );
};

export default AuthRouter;
