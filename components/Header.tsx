import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-5l font-bold text-center text-yellow-400 dark:text-yellow-300">
        Crypto Price Tracker
      </h1>
      <p className="text-center mt-2 text-yellow-600 dark:text-yellow-400">
        Live crypto currency prices powered by CoinGecko API
      </p>
    </header>
  );
};

export default Header;