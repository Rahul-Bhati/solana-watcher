import { prisma } from "@/prisma/prisma";

type TokenData = {
    address: string;
    name?: string;
    symbol?: string;
    decimals?: number;
    logo?: string;
    price?: number;
    balance: number;
};

type NFTData = {
    address: string;
    name?: string;
    image?: string;
};

export async function syncWalletAssets(walletId: string, tokens: TokenData[], nfts: NFTData[]) {
    const now = new Date();

    // Upsert AllToken and WalletToken
    for (const token of tokens) {
        await prisma.allToken.upsert({
            where: { address: token.address },
            update: {
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                logo: token.logo,
                price: token.price,
                lastUpdated: now,
            },
            create: {
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                logo: token.logo,
                price: token.price,
                lastUpdated: now,
            },
        });

        await prisma.walletToken.upsert({
            where: {
                walletId_tokenAddress: {
                    walletId,
                    tokenAddress: token.address,
                },
            },
            update: {
                balance: token.balance,
                price: token.price?.toString(),
                lastChecked: now,
            },
            create: {
                walletId,
                tokenAddress: token.address,
                balance: token.balance,
                price: token.price?.toString(),
                lastChecked: now,
            },
        });
    }

    // Upsert NFTs
    for (const nft of nfts) {
        await prisma.nFT.upsert({
            where: {
                // You must update schema to use composite unique constraint
                walletId_address: {
                    walletId,
                    address: nft.address,
                },
            },
            update: {
                name: nft.name,
                image: nft.image,
            },
            create: {
                walletId,
                address: nft.address,
                name: nft.name,
                image: nft.image,
            },
        });
    }
}
