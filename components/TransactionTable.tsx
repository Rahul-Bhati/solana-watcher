// components/TransactionTable.tsx
"use client"

import React, { useState } from 'react';
import { Clipboard } from 'lucide-react';

interface TokenTransfer {
  fromTokenAccount: string;
  toTokenAccount: string;
  fromUserAccount: string;
  toUserAccount: string;
  tokenAmount: number;
  mint: string;
  tokenStandard: string;
}

interface NativeTransfer {
  fromUserAccount: string;
  toUserAccount: string;
  amount: number;
}

interface Transaction {
  description: string;
  type: string;
  source: string;
  fee: number;
  feePayer: string;
  signature: string;
  slot: number;
  timestamp: number;
  tokenTransfers: TokenTransfer[];
  nativeTransfers: NativeTransfer[];
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString();
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.write(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Solana Wallet Transactions</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Tx Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-600">{formatTimestamp(tx.timestamp)}</td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'TOKEN_MINT'
                        ? 'bg-green-100 text-green-800'
                        : tx.type === 'TRANSFER'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {tx.description || 'No description available'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {tx.tokenTransfers.length > 0 ? (
                    tx.tokenTransfers.map((transfer, i) => (
                      <div key={i}>
                        {transfer.tokenAmount.toLocaleString()} {shortenAddress(transfer.mint)}
                      </div>
                    ))
                  ) : tx.nativeTransfers.length > 0 ? (
                    tx.nativeTransfers.map((transfer, i) => (
                      <div key={i}>
                        {(transfer.amount / 1_000_000_000).toFixed(4)} SOL
                      </div>
                    ))
                  ) : (
                    'N/A'
                  )}
                  <div className="text-xs text-gray-400 mt-1">Fee: {tx.fee} lamports</div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 flex items-center space-x-2">
                  <a
                    href={`https://solscan.io/tx/${tx.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {shortenAddress(tx.signature)}
                  </a>
                  <button
                    onClick={() => copyToClipboard(tx.signature)}
                    className="text-gray-500 hover:text-gray-700"
                    title="Copy transaction hash"
                  >
                    <Clipboard className="h-5 w-5" />
                    
                  </button>
                  {copied === tx.signature && (
                    <span className="text-green-500 text-xs">Copied!</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;