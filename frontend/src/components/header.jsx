import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Media Dashboard</h1>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {user.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {user.email}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Logout"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-600"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transform rotate-180"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;