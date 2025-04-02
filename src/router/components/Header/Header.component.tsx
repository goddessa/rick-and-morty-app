import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../subrouters/Auth/providers/Auth/Auth.context";
import copy from "../../../copy";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  if (!isLoggedIn) return null;

  return (
    <header className="bg-gray-900 text-white px-8 py-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-white">
          {copy.rickAndMorty}
        </span>
      </div>

      <nav className="flex gap-6 items-center text-sm font-medium">
        <Link to="/characters" className="hover:text-green-400 transition">
          {copy.characters}
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition"
        >
          {copy.logout}
        </button>
      </nav>
    </header>
  );
};

export default Header;
