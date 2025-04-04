import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import RickAndMortyProvider from "./providers/RickAndMorty/RickAndMorty.provider";

const PrivateRouter = () => {
  const location = useLocation();
  const isNotFound = location.state?.isNotFound;

  return (
    <RickAndMortyProvider>
      <div className="flex flex-col min-h-screen">
        {!isNotFound && <Header />}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </RickAndMortyProvider>
  );
};

export default PrivateRouter;
