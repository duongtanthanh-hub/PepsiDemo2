
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 text-shadow-lg"
          style={{ textShadow: '0 0 15px rgba(255, 215, 0, 0.7), 0 0 5px rgba(255, 215, 0, 0.5)' }}>
        Pepsi Tet Golden Moment Generator
      </h1>
      <p className="mt-2 text-base sm:text-lg text-gray-200">
        Create your family's unique Tet memory with a touch of magic.
      </p>
    </header>
  );
};

export default Header;
