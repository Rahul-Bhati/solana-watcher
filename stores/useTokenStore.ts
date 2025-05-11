import { create } from 'zustand';
import axios from 'axios';

type Token = {
    mint: string;
    symbol: string;
    amount: string;
    logo: string | null;
};

interface TokenStore {
    tokens: Token[];
    page: number;
    total: number;
    isLoading: boolean;
    fetchTokens: (wallet: string, page: number) => Promise<void>;
}

export const useTokenStore = create<TokenStore>((set) => ({
    tokens: [],
    page: 1,
    total: 0,
    isLoading: false,

    fetchTokens: async (wallet, page) => {
        set({ isLoading: true });
        const res = await axios.get(`/api/tokens?wallet=${wallet}&page=${page}&limit=10`);
        set({
            tokens: res.data.tokens,
            page: res.data.page,
            total: res.data.total,
            isLoading: false,
        });
    },
}));
