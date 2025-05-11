// stores/useWalletStore.ts
import { create } from 'zustand';
import axios from 'axios';

type DataType = 'tokens' | 'nfts' | 'txs';

interface WalletDataCache {
    [walletId: string]: {
        [type in DataType]?: {
            data: any;
            timestamp: number;
        };
    };
}

interface WalletDataState {
    cache: WalletDataCache;
    getData: (walletId: string, type: DataType) => any | null;
    isCacheValid: (walletId: string, type: DataType) => boolean;
    setData: (walletId: string, type: DataType, data: any) => void;
}

interface Wallet {
    id: string;
    name: string;
    address: string;
    network: string;
    balance: string;
}

interface WalletState {
    wallets: Wallet[];
    activeWalletId: string;
    showAddWallet: boolean;
    copied: boolean;
    isLoading: boolean;
    isAddingWallet: boolean; // separate loading state for adding wallet
    error: string | null;
    formData: {
        name: string;
        address: string;
        network: string;
    };

    // Actions
    setWallets: (wallets: Wallet[]) => void;
    setActiveWallet: (id: string) => void;
    setShowAddWallet: (show: boolean) => void;
    setCopied: (copied: boolean) => void;
    updateFormData: (data: Partial<WalletState['formData']>) => void;
    resetFormData: () => void;
    addWallet: () => Promise<void>;
    deleteWallet: (id: string) => void;
    copyToClipboard: (text: string) => void;
    getActiveWallet: () => Wallet | undefined;
}

const initialFormData = {
    name: '',
    address: '',
    network: 'solana',
};

const useWalletStore = create<WalletState>()((set, get) => ({
    wallets: [],
    activeWalletId: '',
    showAddWallet: false,
    copied: false,
    isAddingWallet: false,
    isLoading: false,
    error : null,
    formData: initialFormData,

    setWallets: (wallets) => set((state) => ({
        wallets,
        activeWalletId: wallets[0]?.id || state.activeWalletId
    })),

    setActiveWallet: (id) => set({ activeWalletId: id }),
    setShowAddWallet: (show) => set({ showAddWallet: show }),
    setCopied: (copied) => set({ copied }),

    updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
    })),

    resetFormData: () => set({ formData: initialFormData }),

    addWallet: async () => {
        const { formData } = get();
        const { name, address, network } = formData;

        if (!address || !name) return;
        set({ isAddingWallet: true, error: null });

        try {
            const response = await axios.post(`/api/wallets`, {
                name,
                address,
                balance: "0",
                network
            });

            if (response.data?.wallets) {
                set((state) => ({
                    wallets: [...state.wallets, response.data.wallet],
                    activeWalletId: response.data.wallets[0]?.id || "",
                    formData: initialFormData,
                    showAddWallet: false,
                    isAddingWallet: false,
                    error: null,
                }));
            }
        } catch (error) {
            console.error("Error adding wallet:", error);
            set({
                error: "Failed to add wallet",
                isAddingWallet: false
            });
        }
    },

    deleteWallet: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`/api/wallets/${id}`);

            set((state) => {
                const updatedWallets = state.wallets.filter(wallet => wallet.id !== id);
                return {
                    wallets: updatedWallets,
                    activeWalletId: state.activeWalletId === id && updatedWallets.length
                        ? updatedWallets[0].id
                        : state.activeWalletId,
                    isLoading: false
                };
            });
        } catch (error) {
            console.error("Error deleting wallet:", error);
            set({
                error: "Failed to delete wallet",
                isLoading: false
            });
        }
    },


    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text);
        set({ copied: true });
        setTimeout(() => set({ copied: false }), 2000);
    },

    getActiveWallet: () => {
        const { wallets, activeWalletId } = get();
        return wallets.find(wallet => wallet.id === activeWalletId);
    },
}));

export const useWalletDataStore = create<WalletDataState>((set, get) => ({
    cache: {},

    getData: (walletId, type) => {
        return get().cache[walletId]?.[type]?.data ?? [];
    },

    isCacheValid: (walletId, type) => {
        const ts = get().cache[walletId]?.[type]?.timestamp ?? 0;
        return Date.now() - ts < 1000 * 60 * 60; // 1 hour validity
    },

    setData: (walletId, type, data) => {
        set((state) => ({
            cache: {
                ...state.cache,
                [walletId]: {
                    ...state.cache[walletId],
                    [type]: {
                        data,
                        timestamp: Date.now()
                    }
                }
            }
        }));
    }
}));


export default useWalletStore;
