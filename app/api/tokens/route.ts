import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { AddWalletSchema } from "@/types/schema";
import { formatSolanaBalance } from "@/utils/formateBalance";
import { isValidSolanaAddress } from "@/utils/isValidAddress";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// console.log(process.env.HELIUS_API_KEY);

// export async function POST(request: Request) {
//     try {
//         const {address} = await request.json(); // parse the JSON body
//         console.log("try adding wallet in backend api => ", address);

//         // Check authentication
//         const session = await auth();
//         if (!session?.user?.email) {
//             console.log("You must be logged in.");
//             return new Response(JSON.stringify({ error: "You must be logged in." }), {
//                 status: 401,
//             });
//         }

//         // Validate address based on network
//         let isValidAddress = isValidSolanaAddress(address);

//         if (!isValidAddress) {
//             console.log("Invalid address");
//             return new Response(
//                 JSON.stringify({
//                     success: false,
//                     error: `Invalid ${address} address`,
//                 }),
//                 { status: 400 }
//             );
//         }

//         // let allAssets = [];

//         // let page = 1;
//         // let limit = 999;

//         // while (true) {
//         //     const body = JSON.stringify({
//         //         "jsonrpc": "2.0",
//         //         "id": "text",
//         //         "method": "getAssetsByOwner",
//         //         "params": {
//         //             "ownerAddress": address,
//         //             "page": page,
//         //             "limit": limit,
//         //             "sortBy": {
//         //                 "sortBy": "created",
//         //                 "sortDirection": "asc"
//         //             },
//         //             "options": {
//         //                 "showUnverifiedCollections": true,
//         //                 "showCollectionMetadata": true,
//         //                 "showGrandTotal": true,
//         //                 "showFungible": true,
//         //                 "showNativeBalance": true,
//         //                 "showInscription": true,
//         //                 "showZeroBalance": true
//         //             }
//         //         }
//         //     });

//         //     const { data } = await axios.post(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, body);
//         //     const { result } = data;

//         //     allAssets.push(...result.items);

//         //     if (!result.cursor || result.items.total < limit) break;

//         //     page += 1;
//         // }


//         return new Response(JSON.stringify({ success: true, allAssets: allAssets }), {
//             status: 200,
//         });
//     } catch (error) {
//         console.error("Error parsing wallet POST request:", error);
//         return new Response(
//             JSON.stringify({ success: false, error: "Invalid Request" }),
//             { status: 400 }
//         );
//     }
// }

// app/api/tokens/route.ts

// const cache = new Map(); // Replace with Redis or Upstash for prod
// 
// export async function GET(req: NextRequest) {
//   const wallet = req.nextUrl.searchParams.get("wallet");
//   const key = `tokens-${wallet}`;

//   const cached = cache.get(key);
//   if (cached && Date.now() - cached.timestamp < 1000 * 60 * 60) {
//     return Response.json(cached.data);
//   }

//   const data = await fetchFromHelius(wallet); // your fetch logic
//   cache.set(key, { data, timestamp: Date.now() });

//   return Response.json(data);
// }


// 60 minutes cache for each wallet
const cache = new Map();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hr
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();


export async function GET(req: NextRequest) {
    const wallet = req.nextUrl.searchParams.get("wallet");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

    if (!wallet) {
        return new Response(JSON.stringify({ error: "Missing wallet address" }), { status: 400 });
    }

    const now = Date.now();
    const rateData = rateLimitMap.get(wallet);

    if (rateData) {
        if (now - rateData.timestamp < RATE_LIMIT_WINDOW) {
            if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
                return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again later." }), { status: 429 });
            }
            rateData.count++;
        } else {
            rateLimitMap.set(wallet, { count: 1, timestamp: now });
        }
    } else {
        rateLimitMap.set(wallet, { count: 1, timestamp: now });
    }

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        return new Response(JSON.stringify({ error: "Invalid pagination parameters" }), { status: 400 });
    }

    const key = `tokens-${wallet}`;
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < 1000 * 60 * 60) {
        return Response.json(paginate(cached.data, page, limit));
    }

    try {
        const res = await fetch(`https://solana-gateway.moralis.io/account/mainnet/${wallet}/tokens`, {
            headers: {
                'accept': 'application/json',
                'X-API-Key': process.env.MORALIS_API!,
            },
        });

        if (!res.ok) {
            const errorBody = await res.text();
            return new Response(JSON.stringify({ error: "Failed to fetch from Moralis", status: res.status, body: errorBody }), { status: res.status });
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
            return new Response(JSON.stringify({ error: "Unexpected data format from Moralis" }), { status: 502 });
        }

        cache.set(key, { data, timestamp: Date.now() });
        return Response.json(paginate(data, page, limit));
    } catch (error: any) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), { status: 500 });
    }
}


function paginate(data: any[], page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = page * limit;
    return {
        page,
        limit,
        total: data.length,
        tokens: data.slice(start, end),
    };
}
