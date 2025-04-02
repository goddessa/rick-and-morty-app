import React, { useContext } from "react";
import { Link } from "react-router-dom";
import copy from "../../../copy";
import AuthContext from "../../subrouters/Auth/providers/Auth/Auth.context";

const NotFound: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const linkTo = isLoggedIn ? "/characters" : "/auth/login";
  const linkText = isLoggedIn ? copy.charactersPage : copy.loginPage;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        {copy.pageNotFound}
      </h1>

      <p className="text-lg text-gray-700 mb-4">
        {copy.goTo}{" "}
        <Link to={linkTo} className="text-blue-600 hover:underline font-medium">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
