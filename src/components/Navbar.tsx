
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Home, Settings } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "bg-game-dark-light text-game-purple"
      : "text-gray-400 hover:text-white hover:bg-game-dark-light";
  };

  return (
    <header className="bg-game-dark border-b border-gray-800">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Gamepad2 className="h-8 w-8 text-game-purple" />
              <span className="ml-2 text-xl font-bold text-white">Dark Rift</span>
            </Link>
          </div>
          <nav className="flex space-x-1">
            <Link
              to="/"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                "/"
              )}`}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link
              to="/admin"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                "/admin"
              )}`}
            >
              <Settings className="mr-1 h-4 w-4" />
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
