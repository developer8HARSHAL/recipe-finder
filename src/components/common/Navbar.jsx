import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Recipe Finder
          </Link>
          <div className="text-sm text-gray-600">
            Find delicious recipes by ingredient
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;