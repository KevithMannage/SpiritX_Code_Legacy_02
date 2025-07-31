import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const userId = localStorage.getItem("userId");

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // for programmatic navigation

  const handleLogout = () => {
    localStorage.clear(); // or localStorage.removeItem("userId") if you only want that
    navigate("/");        // redirect to home
  };

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Player", path: "/playerdetails" },
    { name: "Select Your Team", path: `/team/${userId}` },
    { name: "Leaderboard", path: `/leaderboard/${userId}` },
    { name: "Budget", path: "/budget" },
    { name: "Chatbot", path: "/chatbot" },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white tracking-tight hover:text-indigo-400 transition-colors duration-200"
        >
          Fantasy League
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-indigo-700 rounded-md transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-600 rounded-md transition-all duration-200"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-800 px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block py-3 px-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-indigo-600 rounded-md transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="block w-full text-left py-3 px-4 text-sm font-medium text-red-400 hover:text-white hover:bg-red-600 rounded-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
