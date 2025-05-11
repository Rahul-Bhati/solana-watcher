// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';
// import getAllToken from '@/lib/getAllTokens';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json(); // Parsing request body

//     // const response = await axios.post('https://solana.drpc.org/v2/docs-demo', {
//     //   jsonrpc: '2.0',
//     //   id: 1,
//     //   method: 'getAccountInfo',
//     //   params: [
//     //     body.publicKey || 'Ajkkona22hnTBepa4WwCY9LFTih3nFRJYT8nafHRTbP4',
//     //     {
//     //       encoding: 'jsonParsed',
//     //       commitment: 'finalized',
//     //     },
//     //   ],
//     // }, {
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Accept': 'application/json',
//     //   },
//     // });

//     const response = await fetch('https://mainnet.helius-rpc.com/?api-key=', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "jsonrpc": "2.0",
//         "id": "text",
//         "method": "getAssetsByOwner",
//         "params": {
//           "ownerAddress": "MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2",
//           // "page": 1,
//           // "limit": 50,
//           // "sortBy": {
//           //   "sortBy": "recent_action",
//           //   "sortDirection": "asc"
//           // },
//           "options": {
//             "showUnverifiedCollections": true,
//             "showCollectionMetadata": true,
//             "showGrandTotal": true,
//             "showFungible": true,
//             "showNativeBalance": true,
//             "showInscription": true,
//             "showZeroBalance": true
//           }
//         }
//       })
//   });

//   const data = await response.json();

//     // getAllToken("MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2");

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error fetching account info:', error);
//     return NextResponse.json({ error: 'Failed to fetch account info' }, { status: 500 });
//   }
// }

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { AddWalletSchema } from "@/types/schema";
import { formatSolanaBalance } from "@/utils/formateBalance";
import { isValidSolanaAddress } from "@/utils/isValidAddress";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Check authentication
  const session = await auth();
  if (!session?.user?.email)
    return new Response(JSON.stringify({ error: "You must be logged in." }), {
      status: 401,
    });

  console.log("emil in api ", session?.user?.email);

  try {
    const wallets = await prisma.wallet.findMany({
      where: {
        email: session.user.email,
      },
    });

    return NextResponse.json({ wallets });
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const rawWallet = await request.json(); // parse the JSON body
    console.log("try adding wallet in backend api => ", rawWallet);

    const validationResult = AddWalletSchema.safeParse(rawWallet);

    if (!validationResult.success) {
      console.log("Validation failed");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Validation failed",
          details: validationResult.error.errors,
        }),
        { status: 400 }
      );
    }

    const wallet = validationResult.data;

    // Check authentication
    const session = await auth();
    if (!session?.user?.email) {
      console.log("You must be logged in.");
      return new Response(JSON.stringify({ error: "You must be logged in." }), {
        status: 401,
      });
    }

    // delet wallet
    // const delDat = await prisma.wallet.deleteMany({
    //   where: {
    //     email: session.user?.email!
    //   }
    // })

    // Validate address based on network
    let isValidAddress = false;
    switch (wallet.network.toLowerCase()) {
      case "ethereum":
      case "bsc":
        // isValidAddress = isValidEthereumAddress(wallet.address);
        break;
      case "solana":
        isValidAddress = isValidSolanaAddress(wallet.address);
        break;
      default:
        console.log("Unsupported network");
        return new Response(JSON.stringify({ error: "Unsupported network" }), {
          status: 400,
        });
    }

    if (!isValidAddress) {
      console.log("Invalid address");
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid ${wallet.network} address`,
        }),
        { status: 400 }
      );
    }

    // Check if wallet already exists
    const existingWallet = await prisma.wallet.findUnique({
      where: {
        address: wallet.address,
        email: session?.user?.email,
      },
    });

    if (existingWallet) {
      console.log("Wallet address already exists");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Wallet address already exists",
        }),
        { status: 400 }
      );
    }

    console.log("session", session.user?.email);

    const getBalance = await axios.post("https://solana.drpc.org", {
      id: 1,
      jsonrpc: "2.0",
      method: "getBalance",
      params: [wallet.address],
    });

    // console.log("balance", getBalance.data);

    wallet.balance = formatSolanaBalance(getBalance.data.result.value);

    const data = { ...wallet, email: session?.user?.email };
    const wallets = await prisma.wallet.create({
      data,
    });

    console.log("wallets ", wallets);

    return new Response(JSON.stringify({ success: true, wallet: wallets }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error parsing wallet POST request:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Invalid Request" }),
      { status: 400 }
    );
  }
}
