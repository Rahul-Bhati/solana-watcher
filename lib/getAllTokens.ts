import { Connection, GetProgramAccountsFilter, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const rpcEndpoint = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;
const solanaConnection = new Connection(rpcEndpoint);

export default async function getAllToken(wallet: string) {
  console.log("ff");
    const filters:GetProgramAccountsFilter[] = [
        {
          dataSize: 165,    //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32,     //location of our query in the account (bytes)
            bytes: wallet,  //our search criteria, a base58 encoded string
          },            
        }];
    const accounts = await solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {filters: filters}
    );
    console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
    accounts.forEach(async (account, i) => {
        //Parse the account data
        const parsedAccountInfo:any = account.account.data;
        const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
        const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];

        await getTokenMetadata(mintAddress).then((metadata) => {
            console.log("Metadata:", metadata);
        }
        ).catch((error) => {
            console.error("Error fetching metadata:", error);
        });

        await getTokenSupply(mintAddress).then((supply) => {
            console.log("Total Supply:", supply);
        }
        ).catch((error) => {
            console.error("Error fetching supply:", error);
        });


      
        //Log results
        console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        console.log(`--Token Balance: ${tokenBalance}`);
    });
}

async function getTokenMetadata(mintAddress: string) {
  const METAPLEX_METADATA_PREFIX = "metadata";
  const METAPLEX_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

  const metadataAccount = PublicKey.findProgramAddressSync(
      [
          Buffer.from(METAPLEX_METADATA_PREFIX),
          METAPLEX_PROGRAM_ID.toBuffer(),
          new PublicKey(mintAddress).toBuffer(),
      ],
      METAPLEX_PROGRAM_ID
  )[0];

  const accountInfo = await solanaConnection.getAccountInfo(metadataAccount);
  if (accountInfo?.data) {
      // console.log("Metadata:", accountInfo.data.toString());
      return accountInfo.data.toString();
  } else {
      // console.log("No metadata found for:", mintAddress);
      return `"No metadata found for: ${mintAddress}`
  }
}

async function getTokenSupply(mintAddress: string) {
  const supplyInfo = await solanaConnection.getTokenSupply(new PublicKey(mintAddress));
  // console.log("Total Supply:", supplyInfo.value.amount);
  return supplyInfo.value.amount;
}




// getTokenAccounts(walletToQuery,solanaConnection);