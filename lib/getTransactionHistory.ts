import axios from "axios";

async function getTransactionHistory(walletAddress) {
    
  const url = `https://api.helius.xyz/v0/addresses/${walletAddress}/transactions?api-key=${process.env.HELIUS_API_KEY}&limit=10`;

  const res = await axios.get(url);
  const transactions = res.data;

  console.log("📜 Recent Transactions:");
  transactions.forEach((tx) => {
    const sig = tx.signature;
    const time = new Date(tx.timestamp * 1000).toLocaleString();
    const amount = tx.nativeTransfers?.[0]?.amount || 0;
    console.log(`- ${sig} | ${amount / 1e9} SOL | ${time}`);
  });
}

export default getTransactionHistory;
