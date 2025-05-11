
export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    sessions: Session[];
    accounts: Account[];
    wallets: Wallet[];
    createdAt: Date;
    updatedAt: Date;
};

export type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    user: User;
};

export type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
    createdAt: Date;
    updatedAt: Date;
};

export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Date;
};

export type Wallet = {
    id: string;
    name: string;
    address: string;
    email: string;
    balance: string;
    network: string;
    user: User;
    wallettokens: WalletToken[];
    createdAt: Date;
    updatedAt: Date;
};

export type ActiveToken = {
    id: string;
    address: string;
    name: string | null;
    symbol: string | null;
    decimals: number | null;
    logo: string | null;
    price: number | null;
    lastUpdated: Date | null;
    volume24h: number | null;
    holders: number | null;
    walletTokens: WalletToken[];
    createdAt: Date;
    updatedAt: Date;
};

export type DeadToken = {
    id: string;
    address: string;
    reason: string | null;
    name: string | null;
    symbol: string | null;
    decimals: number | null;
    logo: string | null;
    price: number | null;
    lastUpdated: Date | null;
    volume24h: number | null;
    holders: number | null;
    archivedAt: Date;
};

export type WalletToken = {
    id: string;
    walletId: string;
    tokenId: string;
    balance: number;
    lastChecked: Date | null;
    wallet: Wallet;
    token: ActiveToken;
};