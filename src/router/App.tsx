import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import routes from "./routes";
import AuthProvider from "./subrouters/Auth/providers/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes routes={routes} />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
