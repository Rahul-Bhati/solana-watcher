import Dashboard from "@/components/dashboard"
import TransactionTable from "@/components/TransactionTable"
import transactions from "@/app/_transaction.json";
import tokens from "@/app/_getAssetByOwner.json";
import getAllToken from "@/lib/getAllTokens";
// import TokenOverviewTable from "@/components/TokenOverviewTable";
import { getTotalWalletBalance } from "@/lib/getTotalWalletBalance";
let x=0;
export default function Home() {
  const walletToQuery = 'MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2'; //example: vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg

  // real whale = 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
  // getAllToken(walletToQuery);

  // getTotalWalletBalance();

  console.log("home", x++);

  return (
    <> 
      <Dashboard />
      {/* <TransactionTable transactions={transactions} /> */}
      {/* <TokenOverviewTable tokens={tokens?.result?.items} /> */}
    </>
  )
}
