import React from 'react';
import { Coin } from '../types/crypto';

interface CryptoItemProps {
  coin: Coin;
}

const CryptoItem: React.FC<CryptoItemProps> = ({ coin }) => {
  const priceChangeColor = (coin.price_change_percentage_24h || 0) >= 0 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400';

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {coin.market_cap_rank || "N/A"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={coin.image} alt={coin.name} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {coin.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {coin.symbol.toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        ${coin.current_price.toLocaleString(undefined, { 
          minimumFractionDigits: 2,
          maximumFractionDigits: 6 
        })}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${priceChangeColor}`}>
        {coin.price_change_percentage_24h ? (
          `${coin.price_change_percentage_24h.toFixed(2)}%`
        ) : "N/A"}
      </td>
    </tr>
  );
};

export default CryptoItem;