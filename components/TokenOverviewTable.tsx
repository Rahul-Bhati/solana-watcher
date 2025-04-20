"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Shorten address for display
const shortenAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;

// Format large numbers for readability
const formatNumber = (num: number, decimals: number = 2) =>
  num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// TypeScript interface for token data
interface Token {
  id: string;
  content: {
    links: {
      image: string;
    };
    metadata: {
      name: string;
      symbol: string;
    };
  };
  token_info?: {
    balance?: number;
    supply?: number;
    decimals?: number;
    price_info?: {
      price_per_token?: number;
      total_price?: number;
      currency?: string;
    };
  };
}

interface TokenOverviewTableProps {
  tokens: Token[];
}

const TokenOverviewTable: React.FC<TokenOverviewTableProps> = ({ tokens }) => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [minAmountHeld, setMinAmountHeld] = useState('');
  const [maxAmountHeld, setMaxAmountHeld] = useState('');
  const [minTotalSupply, setMinTotalSupply] = useState('');
  const [maxTotalSupply, setMaxTotalSupply] = useState('');

  // Filter tokens based on search and range inputs
  const filteredTokens = tokens.filter((token) => {
    const name = token.content?.metadata?.name?.toLowerCase() || '';
    const symbol = token.content?.metadata?.symbol?.toLowerCase() || '';
    const search = searchQuery.toLowerCase();
    const amountHeld =
      token.token_info?.balance && token.token_info?.decimals
        ? token.token_info.balance / Math.pow(10, token.token_info.decimals)
        : 0;
    const totalSupply =
      token.token_info?.supply && token.token_info?.decimals
        ? token.token_info.supply / Math.pow(10, token.token_info.decimals)
        : 0;

    // Search filter (name or symbol)
    const matchesSearch = !searchQuery || name.includes(search) || symbol.includes(search);

    // Amount Held filter
    const minAmount = minAmountHeld ? parseFloat(minAmountHeld) : -Infinity;
    const maxAmount = maxAmountHeld ? parseFloat(maxAmountHeld) : Infinity;
    const matchesAmount = amountHeld >= minAmount && amountHeld <= maxAmount;

    // Total Supply filter
    const minSupply = minTotalSupply ? parseFloat(minTotalSupply) : -Infinity;
    const maxSupply = maxTotalSupply ? parseFloat(maxTotalSupply) : Infinity;
    const matchesSupply = totalSupply >= minSupply && totalSupply <= maxSupply;

    // return matchesSearch && matchesAmount && matchesSupply;

    const hasPrice = token.token_info?.price_info?.price_per_token !== undefined;
    return matchesSearch && matchesAmount && matchesSupply && hasPrice;
  });

  const totalValue = filteredTokens.reduce((acc, token) => {
    const totalPrice = token.token_info?.price_info?.total_price || 0;
    return acc + totalPrice;
  }, 0);


  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setMinAmountHeld('');
    setMaxAmountHeld('');
    setMinTotalSupply('');
    setMaxTotalSupply('');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Token Holdings Overview</h2>

      <p className="text-lg font-semibold text-gray-800 mb-2">
        Total Portfolio Value: ${formatNumber(totalValue)}
      </p>


      {/* Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name or Symbol"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        />

        {/* Amount Held Filters */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Amount Held"
            value={minAmountHeld}
            onChange={(e) => setMinAmountHeld(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
          <input
            type="number"
            placeholder="Max Amount Held"
            value={maxAmountHeld}
            onChange={(e) => setMaxAmountHeld(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
        </div>

        {/* Total Supply Filters */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Total Supply"
            value={minTotalSupply}
            onChange={(e) => setMinTotalSupply(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
          <input
            type="number"
            placeholder="Max Total Supply"
            value={maxTotalSupply}
            onChange={(e) => setMaxTotalSupply(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Token</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Amount Held</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Symbol</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Total Supply</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Token Price</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Total Price</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.content?.links?.image ? (
                    <Image
                      src={token.content.links.image}
                      alt={token.content?.metadata?.symbol || 'Token'}
                      width={32}
                      height={32}
                      className="rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.png'; // Fallback image
                      }}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  )}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.content?.metadata?.name || 'Unknown'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.token_info?.balance && token.token_info?.decimals
                    ? formatNumber(token.token_info.balance / Math.pow(10, token.token_info.decimals))
                    : 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.content?.metadata?.symbol || 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.token_info?.supply && token.token_info?.decimals
                    ? formatNumber(token.token_info.supply / Math.pow(10, token.token_info.decimals))
                    : 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.token_info?.price_info?.price_per_token
                    ? `$${formatNumber(token.token_info.price_info.price_per_token)}`
                    : 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.token_info?.price_info?.total_price
                    ? `$${formatNumber(token.token_info.price_info.total_price)}`
                    : 'N/A'}
                </td>

                <td className="py-4 px-6 text-sm text-blue-600">
                  <a
                    href={`https://solscan.io/token/${token.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {shortenAddress(token.id)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenOverviewTable;