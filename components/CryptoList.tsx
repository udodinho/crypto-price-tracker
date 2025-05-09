import { useQuery } from '@tanstack/react-query';
import CryptoItem from './CryptoItem';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { Coin, SearchResult, SortDirection, SortKey } from '../types/crypto';

interface CryptoListProps {
  coinsRequired: string[];
  searchTerm: string;
  sortBy: string;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ 
  coinsRequired, 
  searchTerm, 
  sortBy, 
  sortDirection, 
  onSort 
}) => {
  const { data, isLoading, error, dataUpdatedAt } = useQuery<Coin[]>({
    queryKey: ["cryptoData"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsRequired.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );
      
      if (!response.ok) {
        throw new Error("Error fetching coins data");
      }
      
      return response.json();
    }
  });

  const { data: searchData, isLoading: isSearchLoading } = useQuery<Coin[]>({
    queryKey: ["cryptoSearch", searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) return [];
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
      );
      
      if (!response.ok) {
        throw new Error("Error occured while retrieving coins");
      }
      
      const results = await response.json() as SearchResult;
      
      const topCoins = results.coins.slice(0, 5).map(coin => coin.id);
      
      if (topCoins.length === 0) return [];
      
      const detailsResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${topCoins.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );
      
      if (!detailsResponse.ok) {
        throw new Error("Error occured while retrieving coins");
      }
      
      return detailsResponse.json();
    },
    enabled: searchTerm.length >= 2
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={(error as Error).message} />;
  }

  // Combine default coins and search results, eliminating duplicates
  let displayCoins: Coin[] = [...(data || [])];
  
  if (searchData && searchData.length > 0) {
    const existingIds = new Set(displayCoins.map(coin => coin.id));
    searchData.forEach(coin => {
      if (!existingIds.has(coin.id)) {
        displayCoins.push(coin);
      }
    });
  }

  displayCoins.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy as SortKey) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.current_price - b.current_price;
        break;
      case "change":
        comparison = (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0);
        break;
      default:
        comparison = (a.market_cap_rank || 0) - (b.market_cap_rank || 0);
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const lastUpdatedTime = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm p-6 mb-5 text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdatedTime}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {isSearchLoading ? "Searching..." : ""}
        </div>
      </div>
      
      <div className="overflow-x-auto pl-6 bg-white dark:bg-green-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-indigo-200 dark:divide-indigo-700">
          <thead className="bg-white dark:bg-indigo-900">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort("rank")}
              >
                Rank {sortBy === "rank" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort("name")}
              >
                Name {sortBy === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('price')}
              >
                Price (USD) {sortBy === "price" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('change')}
              >
                24h Change {sortBy === "change" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-indigo-500 divide-y divide-indigo-200 dark:divide-indigo-700">
            {displayCoins.map((coin) => (
              <CryptoItem key={coin.id} coin={coin} />
            ))}
            {displayCoins.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-indigo-900 dark:text-indigo-900">
                  No coins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;