const walletAddress = 'MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2';

export const getTotalWalletBalance = async () => {
  const url = `https://api.helius.xyz/v0/addresses/${walletAddress}/balances?api-key=${process.env.HELIUS_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const solBalance = data.nativeBalance.sol;
  const tokens = data.tokens;

  let totalTokenValue = 0;

  for (const token of tokens) {
    const amount = token.amount;
    const decimals = token.decimals || 0;
    const uiAmount = amount / Math.pow(10, decimals);
    const price = token.price || 0;
    totalTokenValue += uiAmount * price;
  }

  const total = solBalance + totalTokenValue;

  console.log(`Total SOL balance: ${solBalance}`);
  console.log(`Total SPL token value: ${totalTokenValue}`);
  console.log(`✅ Total Wallet Value: ${total} SOL (approx)`);
};

// getTotalWalletBalance();
