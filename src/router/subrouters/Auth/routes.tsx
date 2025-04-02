import { Navigate } from "react-router-dom";
import { ComplexRoute } from "../../models";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default [
  {
    path: "login",
    authorized: false,
    onlyPublic: true,
    element: Login,
  },
  {
    path: "sign-up",
    element: SignUp,
  },
  { index: true, element: <Navigate to="auth/login" /> },
  {
    path: "*",
    element: () => `not found`,
  },
] as Array<ComplexRoute>;
