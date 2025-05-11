// MultiWalletServer.tsx
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth"
import WalletManager from "./MultiWalletClient";

export default async function MultiWalletServer() {
    const session = await auth();

    if (!session?.user?.email) return null; // or show a message like "Please login"    
    
    const wallets = await prisma.wallet.findMany({
        where: { email: session.user.email },
    });

    return (
        // <MultiWalletClient initialWallets={wallets} />
        <WalletManager initialWallets={wallets} />
    );
}
