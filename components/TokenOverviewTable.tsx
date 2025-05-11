
// components/TokenOverviewTable.tsx
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

// Utility to shorten address for display
const shortenAddress = (address: string) => {
  if (!address) return 'N/A';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// Utility to format numbers for readability
const formatNumber = (num: number | undefined, decimals: number = 2) => {
  if (num === undefined || isNaN(num)) return 'N/A';
  return num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

// TypeScript interface for token data
interface Token {
  id: string;
  content: {
    links?: {
      image?: string;
    };
    metadata: {
      name?: string;
      symbol?: string;
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
  const [filterType, setFilterType] = useState<'all' | 'priced'>('priced'); // Dropdown state
  const [sortField, setSortField] = useState<'amount' | 'price' | 'total' | 'name'>('amount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter tokens based on search, range inputs, and filter type
  const filteredTokens = useMemo(() => {
    const filtered = tokens.filter((token) => {
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

      // Price filter
      const hasPrice = token.token_info?.price_info?.price_per_token !== undefined;
      const matchesPrice = filterType === 'all' || (filterType === 'priced' && hasPrice);

      return matchesSearch && matchesAmount && matchesSupply && matchesPrice;
    });

    return filtered.sort((a, b) => {
      const getAmount = (token: Token) =>
        token.token_info?.balance && token.token_info?.decimals
          ? token.token_info.balance / Math.pow(10, token.token_info.decimals)
          : 0;

      const getPrice = (token: Token) => token.token_info?.price_info?.price_per_token || 0;
      const getTotal = (token: Token) => token.token_info?.price_info?.total_price || 0;
      const getName = (token: Token) => token.content?.metadata?.name?.toLowerCase() || '';

      let aVal = 0, bVal = 0;

      switch (sortField) {
        case 'amount':
          aVal = getAmount(a); bVal = getAmount(b); break;
        case 'price':
          aVal = getPrice(a); bVal = getPrice(b); break;
        case 'total':
          aVal = getTotal(a); bVal = getTotal(b); break;
        case 'name':
          return sortDirection === 'asc'
            ? getName(a).localeCompare(getName(b))
            : getName(b).localeCompare(getName(a));
      }

      console.log(sortField)
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;

    });
  }, [tokens, searchQuery, minAmountHeld, maxAmountHeld, minTotalSupply, maxTotalSupply, filterType]);

  // Calculate total portfolio value
  const totalValue = useMemo(() => {
    return filteredTokens.reduce((acc, token) => {
      const totalPrice = token.token_info?.price_info?.total_price || 0;
      return acc + totalPrice;
    }, 0);
  }, [filteredTokens]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setMinAmountHeld('');
    setMaxAmountHeld('');
    setMinTotalSupply('');
    setMaxTotalSupply('');
    setFilterType('priced');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Token Holdings Overview</h2>
        <p className="text-lg font-medium text-gray-700 mt-2">
          Total Portfolio Value: ${formatNumber(totalValue, 2)}
        </p>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name or Symbol"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        />

        {/* Amount Held Filters */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Amount Held"
            value={minAmountHeld}
            onChange={(e) => setMinAmountHeld(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
          <input
            type="number"
            placeholder="Max Amount Held"
            value={maxAmountHeld}
            onChange={(e) => setMaxAmountHeld(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
        </div>

        {/* Total Supply Filters */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Total Supply"
            value={minTotalSupply}
            onChange={(e) => setMinTotalSupply(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
          <input
            type="number"
            placeholder="Max Total Supply"
            value={maxTotalSupply}
            onChange={(e) => setMaxTotalSupply(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
        </div>

        {/* Filter Type Dropdown */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'priced')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
        >
          <option value="priced">Tokens with Price/Liquidity</option>
          <option value="all">All Tokens</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Token</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700"
                onClick={() => {
                  if (sortField === 'name') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('name');
                    setSortDirection('desc');
                  }
                }}
              >Name Amount Held {sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700"
                onClick={() => {
                  if (sortField === 'amount') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('amount');
                    setSortDirection('desc');
                  }
                }}
              >Amount {sortField === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Symbol</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Total Supply</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700"
                onClick={() => {
                  if (sortField === 'price') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('price');
                    setSortDirection('desc');
                  }
                }}
              >Token Price {sortField === 'price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700"
                onClick={() => {
                  if (sortField === 'total') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('total');
                    setSortDirection('desc');
                  }
                }}
              >Total Price {sortField === 'total' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTokens.map((token, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.content?.links?.image ? (
                    <Image
                      src={token.content.links.image ? token.content.links.image : "/placeholder.png"}
                      alt={token.content?.metadata?.symbol || 'Token'}
                      width={32}
                      height={32}
                      className="rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.png'; // Fallback image
                      }}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
                      N/A
                    </div>
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
                    ? `$${formatNumber(token.token_info.price_info.price_per_token, 6)}`
                    : 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {token.token_info?.price_info?.total_price
                    ? `$${formatNumber(token.token_info.price_info.total_price, 2)}`
                    : 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-blue-600">
                  <a
                    href={`https://solscan.io/token/${token.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    title={token.id}
                  >
                    {shortenAddress(token.id)}
                  </a>
                </td>
              </tr>
            ))}
            {filteredTokens.length === 0 && (
              <tr>
                <td colSpan={8} className="py-4 px-6 text-center text-sm text-gray-500">
                  No tokens match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenOverviewTable;


// "use client";

// import React, { useState } from 'react';
// import Image from 'next/image';

// // Shorten address for display
// const shortenAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;

// // Format large numbers for readability
// const formatNumber = (num: number, decimals: number = 2) =>
//   num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// // TypeScript interface for token data
// interface Token {
//   id: string;
//   content: {
//     links: {
//       image: string;
//     };
//     metadata: {
//       name: string;
//       symbol: string;
//     };
//   };
//   token_info?: {
//     balance?: number;
//     supply?: number;
//     decimals?: number;
//     price_info?: {
//       price_per_token?: number;
//       total_price?: number;
//       currency?: string;
//     };
//   };
// }

// interface TokenOverviewTableProps {
//   tokens: Token[];
// }

// const TokenOverviewTable: React.FC<TokenOverviewTableProps> = ({ tokens }) => {
//   // State for filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [minAmountHeld, setMinAmountHeld] = useState('');
//   const [maxAmountHeld, setMaxAmountHeld] = useState('');
//   const [minTotalSupply, setMinTotalSupply] = useState('');
//   const [maxTotalSupply, setMaxTotalSupply] = useState('');

//   // Filter tokens based on search and range inputs
//   const filteredTokens = tokens.filter((token) => {
//     const name = token.content?.metadata?.name?.toLowerCase() || '';
//     const symbol = token.content?.metadata?.symbol?.toLowerCase() || '';
//     const search = searchQuery.toLowerCase();
//     const amountHeld =
//       token.token_info?.balance && token.token_info?.decimals
//         ? token.token_info.balance / Math.pow(10, token.token_info.decimals)
//         : 0;
//     const totalSupply =
//       token.token_info?.supply && token.token_info?.decimals
//         ? token.token_info.supply / Math.pow(10, token.token_info.decimals)
//         : 0;

//     // Search filter (name or symbol)
//     const matchesSearch = !searchQuery || name.includes(search) || symbol.includes(search);

//     // Amount Held filter
//     const minAmount = minAmountHeld ? parseFloat(minAmountHeld) : -Infinity;
//     const maxAmount = maxAmountHeld ? parseFloat(maxAmountHeld) : Infinity;
//     const matchesAmount = amountHeld >= minAmount && amountHeld <= maxAmount;

//     // Total Supply filter
//     const minSupply = minTotalSupply ? parseFloat(minTotalSupply) : -Infinity;
//     const maxSupply = maxTotalSupply ? parseFloat(maxTotalSupply) : Infinity;
//     const matchesSupply = totalSupply >= minSupply && totalSupply <= maxSupply;

//     // return matchesSearch && matchesAmount && matchesSupply;

//     const hasPrice = token.token_info?.price_info?.price_per_token !== undefined;
//     return matchesSearch && matchesAmount && matchesSupply && hasPrice;
//   });

//   const totalValue = filteredTokens.reduce((acc, token) => {
//     const totalPrice = token.token_info?.price_info?.total_price || 0;
//     return acc + totalPrice;
//   }, 0);


//   // Reset all filters
//   const resetFilters = () => {
//     setSearchQuery('');
//     setMinAmountHeld('');
//     setMaxAmountHeld('');
//     setMinTotalSupply('');
//     setMaxTotalSupply('');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Token Holdings Overview</h2>

//       <p className="text-lg font-semibold text-gray-800 mb-2">
//         Total Portfolio Value: ${formatNumber(totalValue)}
//       </p>


//       {/* Filter Controls */}
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search by Name or Symbol"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
//         />

//         {/* Amount Held Filters */}
//         <div className="flex space-x-2">
//           <input
//             type="number"
//             placeholder="Min Amount Held"
//             value={minAmountHeld}
//             onChange={(e) => setMinAmountHeld(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
//           />
//           <input
//             type="number"
//             placeholder="Max Amount Held"
//             value={maxAmountHeld}
//             onChange={(e) => setMaxAmountHeld(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
//           />
//         </div>

//         {/* Total Supply Filters */}
//         <div className="flex space-x-2">
//           <input
//             type="number"
//             placeholder="Min Total Supply"
//             value={minTotalSupply}
//             onChange={(e) => setMinTotalSupply(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
//           />
//           <input
//             type="number"
//             placeholder="Max Total Supply"
//             value={maxTotalSupply}
//             onChange={(e) => setMaxTotalSupply(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
//           />
//         </div>

//         {/* Reset Button */}
//         <button
//           onClick={resetFilters}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Token</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Amount Held</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Symbol</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Total Supply</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Token Price</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Total Price</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Address</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTokens.map((token, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {token.content?.links?.image ? (
//                     <Image
//                       src={token.content.links.image}
//                       alt={token.content?.metadata?.symbol || 'Token'}
//                       width={32}
//                       height={32}
//                       className="rounded-full"
//                       onError={(e) => {
//                         e.currentTarget.src = '/placeholder.png'; // Fallback image
//                       }}
//                     />
//                   ) : (
//                     <div className="w-8 h-8 bg-gray-200 rounded-full" />
//                   )}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {token.content?.metadata?.name || 'Unknown'}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {token.token_info?.balance && token.token_info?.decimals
//                     ? formatNumber(token.token_info.balance / Math.pow(10, token.token_info.decimals))
//                     : 'N/A'}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {token.content?.metadata?.symbol || 'N/A'}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {token.token_info?.supply && token.token_info?.decimals
//                     ? formatNumber(token.token_info.supply / Math.pow(10, token.token_info.decimals))
//                     : 'N/A'}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {token.token_info?.price_info?.price_per_token
//                     ? `$${formatNumber(token.token_info.price_info.price_per_token)}`
//                     : 'N/A'}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {token.token_info?.price_info?.total_price
//                     ? `$${formatNumber(token.token_info.price_info.total_price)}`
//                     : 'N/A'}
//                 </td>

//                 <td className="py-4 px-6 text-sm text-blue-600">
//                   <a
//                     href={`https://solscan.io/token/${token.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:underline"
//                   >
//                     {shortenAddress(token.id)}
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TokenOverviewTable;