// Helper function to format balance
export const formatSolanaBalance = (lamports: number): string => {
  const solBalance = lamports / Math.pow(10, 9);
  return `${solBalance.toFixed(4)} SOL`; // Format to 4 decimal places
};