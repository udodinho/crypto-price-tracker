'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CryptoList from '../components/CryptoList';
import SearchBar from '../components/Search';
import Header from '../components/Header';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000,
      staleTime: 20000,
      retry: 2,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-green-100 dark:bg-green-800">
        <div className="container mx-auto px-4 py-8">
          <CryptoTracker />
        </div>
      </div>
    </QueryClientProvider>
  );
}

function CryptoTracker() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const coinsRequired: string[] = ["bitcoin", "ethereum", "solana", "matic-network", "dogecoin"];
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-8">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CryptoList 
        coinsRequired={coinsRequired} 
        searchTerm={searchTerm} 
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
}