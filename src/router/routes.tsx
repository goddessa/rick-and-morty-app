import { ComplexRoute } from "./models";
import NotFound from "./pages/NotFound";
import authRoutes from "../router/subrouters/Auth/routes"
import Auth from "../../src/router/subrouters/Auth"
import Private from "../../src/router/subrouters/Private"
import privateRoutes from "../router/subrouters/Private/routes"


export default [
  {
    path: "auth",
    authorized: false,
    onlyPublic: true,
    element: Auth,
    routes: authRoutes,
  },
  {
    path: "/",
    authorized: true,
    element: Private,
    routes: privateRoutes,
  },
  {
    path: "*",
    element: NotFound,
  },
] as Array<ComplexRoute>;
