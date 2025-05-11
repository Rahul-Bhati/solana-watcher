// lib/fetchWalletData.ts

import { auth } from "@/auth";
import { useWalletDataStore } from "@/stores/index";
import { isValidSolanaAddress } from "@/utils/isValidAddress";
import axios from "axios";

export const fetchAllAssets = async(address: string) => {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user?.email) {
            console.log("You must be logged in.");
            return new Response(JSON.stringify({ error: "You must be logged in." }), {
                status: 401,
            });
        }

        // Validate address based on network
        let isValidAddress = isValidSolanaAddress(address);

        if (!isValidAddress) {
            console.log("Invalid address");
            return new Response(
                JSON.stringify({
                    success: false,
                    error: `Invalid ${address} address`,
                }),
                { status: 400 }
            );
        }

        let allAssets = [];

        let page = 1;
        let limit = 999;

        while (true) {
            const body = JSON.stringify({
                "jsonrpc": "2.0",
                "id": "text",
                "method": "getAssetsByOwner",
                "params": {
                    "ownerAddress": address,
                    "page": page,
                    "limit": limit,
                    "sortBy": {
                        "sortBy": "created",
                        "sortDirection": "asc"
                    },
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
            });

            const { data } = await axios.post(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, body);
            const { result } = data;

            allAssets.push(...result.items);

            if (!result.cursor || result.items.total < limit) break;

            page += 1;
        }


        return new Response(JSON.stringify({ success: true, allAssets: allAssets }), {
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

export const fetchWalletData = async (walletId: string, type: "tokens" | "nfts" | "txs") => {
    const store = useWalletDataStore.getState();

    if (store.isCacheValid(walletId, type)) {
        return store.getData(walletId, type);
    }

    const res = await fetch(`/api/${type}?wallet=${walletId}`);
    const data = await res.json();

    store.setData(walletId, type, data);
    return data;
};
