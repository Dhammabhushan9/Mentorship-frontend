import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mentorship Platform</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/matches" className="hover:underline">
              Matches
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
