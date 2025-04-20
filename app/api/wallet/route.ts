import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import getAllToken from '@/lib/getAllTokens';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parsing request body

    // const response = await axios.post('https://solana.drpc.org/v2/docs-demo', {
    //   jsonrpc: '2.0',
    //   id: 1,
    //   method: 'getAccountInfo',
    //   params: [
    //     body.publicKey || 'Ajkkona22hnTBepa4WwCY9LFTih3nFRJYT8nafHRTbP4',
    //     {
    //       encoding: 'jsonParsed',
    //       commitment: 'finalized',
    //     },
    //   ],
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    // });

    const response = await fetch('https://mainnet.helius-rpc.com/?api-key=', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": "text",
        "method": "getAssetsByOwner",
        "params": {
          "ownerAddress": "MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2",
          // "page": 1,
          // "limit": 50,
          // "sortBy": {
          //   "sortBy": "recent_action",
          //   "sortDirection": "asc"
          // },
          "options": {
            "showUnverifiedCollections": true,
            "showCollectionMetadata": true,
            "showGrandTotal": true,
            "showFungible": true,
            "showNativeBalance": true,
            "showInscription": true,
            "showZeroBalance": true
          }
        }
      })
  });
  
  const data = await response.json();

    // getAllToken("MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2");

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching account info:', error);
    return NextResponse.json({ error: 'Failed to fetch account info' }, { status: 500 });
  }
}
