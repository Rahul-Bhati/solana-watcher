"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, CopyIcon, PlusIcon, TrashIcon } from "lucide-react";
import useWalletStore from "@/stores";
import { useEffect, useState } from "react";
import { Wallet } from "@/types/type";
import axios from "axios";
import { toast } from "sonner"; // Add this import
import { isValidSolanaAddress } from "@/utils/isValidAddress"; // Add this import

export default function WalletManager({
  initialWallets,
}: {
  initialWallets: Wallet[];
}) {
  const { wallets, setWallets, activeWalletId, setActiveWallet, isLoading, error } = useWalletStore();
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    network: "solana",
  });

  const resetForm = () => {
    setFormData({ name: "", address: "", network: "solana" });
    setShowAddWallet(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Wallet name is required");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Wallet address is required");
      return false;
    }
    if (!isValidSolanaAddress(formData.address)) {
      toast.error("Invalid Solana Wallet address");
      return false;
    }
    return true;
  };

  const handleAddWallet = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/wallets`, {...formData, balance: "0"});

      if (response.data?.success) {
        setWallets([...wallets, response.data.wallet]);
        setActiveWallet(response.data.wallet.id);
        toast.success("Wallet added successfully");
        resetForm();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to add wallet";
      toast.error(errorMessage);
      console.error("Error adding wallet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWallet = async (id: string) => {
    try {
      await axios.delete(`/api/wallets/${id}`);
      setWallets(wallets.filter((wallet) => wallet.id !== id));
      if (activeWalletId === id && wallets.length > 1) {
        setActiveWallet(wallets[0].id);
      }
      toast.success("Wallet deleted successfully");
    } catch (error) {
      toast.error("Failed to delete wallet");
      console.error("Error deleting wallet:", error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy address");
      console.error("Error copying to clipboard:", error);
    }
  };

  const getActiveWallet = () =>
    wallets.find((wallet) => wallet.id === activeWalletId);

  useEffect(() => {
    if (initialWallets?.length > 0) {
      setWallets(initialWallets);
    }
  }, [initialWallets]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-40">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-40 text-red-500">
            Error: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-4">
            {wallets.length != 0 ? (
              <Tabs
                value={activeWalletId}
                onValueChange={setActiveWallet}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                  {wallets.slice(0, 3).map((wallet) => (
                    <TabsTrigger
                      key={wallet.id}
                      value={wallet.id}
                      className="text-xs sm:text-sm"
                    >
                      {wallet.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {wallets.map((wallet) => (
                  <TabsContent
                    key={wallet.id}
                    value={wallet.id}
                    className="mt-0"
                  >
                    <div className="flex items-center space-x-2 mt-4">
                      <Badge variant="outline">{wallet?.network}</Badge>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {wallet.address.substring(0, 6)}...
                          {wallet.address.substring(wallet.address.length - 4)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(wallet.address)}
                        >
                          {copied ? (
                            <CheckIcon className="h-3 w-3 text-green-500" />
                          ) : (
                            <CopyIcon className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <h2>No wallets added yet. Click 'Add Wallet' to get started.</h2>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddWallet(!showAddWallet)}
              className="text-xs"
            >
              <PlusIcon className="mr-1 h-3 w-3" />
              Add Wallet
            </Button>
            {wallets.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleDeleteWallet(activeWalletId)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {showAddWallet && (
          <div className="mt-4 rounded-md border p-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="wallet-name">Wallet Name</Label>
                <Input
                  id="wallet-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="My Wallet"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input
                  id="wallet-address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="0x..."
                />
              </div>
              <div className="mt-4 flex items-center justify-end space-x-2 space-y/2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddWallet(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddWallet}>
                  Add Wallet
                </Button>
              </div>
            </div>
          </div>
        )}

        {getActiveWallet() && (
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">Total Balance:</span>
              <span className="ml-2 text-lg font-bold">
                {getActiveWallet()?.balance}
              </span>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// "use client"
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { CheckIcon, CopyIcon, PlusIcon, TrashIcon } from "lucide-react";
// import useWalletStore from "@/stores";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { Wallet } from "@/types/type";
// import axios from "axios";

// export default function WalletManager({ initialWallets }: { initialWallets: Wallet[] }) {
//     const { wallets, setWallets, isLoading, error } = useWalletStore();

//     const [activeWallet, setActiveWallet] = useState(initialWallets[0]?.id || "");
//         const [showAddWallet, setShowAddWallet] = useState(false);
//         const [copied, setCopied] = useState(false);

//         const [formData, setFormData] = useState({
//             name: "",
//             address: "",
//             network: "solana",
//         });

//         const handleAddWallet = async () => {
//             const { name, address, network } = formData;
//             if (!address || !name) return;

//             try {
//                 const response = await axios.post(`http://localhost:3000/api/wallets`, { name, address, balance: "0", network });
//                 if (response.data?.wallets) {
//                     setWallets(response.data.wallets);
//                     setActiveWallet(response.data.wallets[0]?.id || "");
//                 }
//                 setFormData({ name: "", address: "", network: "solana" });
//                 setShowAddWallet(false);
//             } catch (error) {
//                 console.error("Error adding wallet:", error);
//             }
//         };

//         const handleDeleteWallet = async (id: string) => {
//             setWallets((prev : any) => {
//                 const updated = prev.filter((wallet: any) => wallet.id !== id);
//                 if (activeWallet === id && updated.length) {
//                     setActiveWallet(updated[0].id);
//                 }
//                 return updated;
//             });
//         };

//         const copyToClipboard = (text: string) => {
//             navigator.clipboard.writeText(text)
//             setCopied(true)
//             setTimeout(() => setCopied(false), 2000)
//         }

//         const getActiveWallet = () => wallets.find((wallet) => wallet.id === activeWallet)

//     // Set initial wallets when component mounts
//     useEffect(() => {
//         if (initialWallets?.length > 0) {
//             setWallets(initialWallets);
//         }
//     }, [initialWallets]);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <Card>
//             <CardContent className="p-4">
//                 <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
//                     <div className="flex items-center space-x-4">
//                         {wallets.length != 0 ? (
//                         <Tabs value={activeWallet} onValueChange={setActiveWallet} className="w-full sm:w-auto">
//                             <TabsList className="grid w-full grid-cols-3 sm:w-auto">
//                                 {wallets.slice(0, 3).map((wallet) => (
//                                     <TabsTrigger key={wallet.id} value={wallet.id} className="text-xs sm:text-sm">
//                                         {wallet.name}
//                                     </TabsTrigger>
//                                 ))}
//                             </TabsList>

//                             {wallets.map((wallet) => (
//                                 <TabsContent key={wallet.id} value={wallet.id} className="mt-0">
//                                     <div className="flex items-center space-x-2 mt-4">
//                                         <Badge variant="outline">{wallet?.network}</Badge>
//                                         <div className="flex items-center space-x-2">
//                                             <span className="text-xs text-muted-foreground">
//                                                 {wallet.address.substring(0, 6)}...
//                                                 {wallet.address.substring(wallet.address.length - 4)}
//                                             </span>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 className="h-6 w-6"
//                                                 onClick={() => copyToClipboard(wallet.address)}
//                                             >
//                                                 {copied ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </TabsContent>
//                             ))}
//                         </Tabs>
//                         ) : (
//                                 <h2>No wallets added yet. Click 'Add Wallet' to get started.</h2>
//                         )}
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <Button variant="outline" size="sm" onClick={() => setShowAddWallet(!showAddWallet)} className="text-xs">
//                             <PlusIcon className="mr-1 h-3 w-3" />
//                             Add Wallet
//                         </Button>
//                         {wallets.length > 1 && (
//                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteWallet(activeWallet)}>
//                                 <TrashIcon className="h-4 w-4" />
//                             </Button>
//                         )}
//                     </div>
//                 </div>

//                 {showAddWallet && (
//                     <div className="mt-4 rounded-md border p-4">
//                         <div className="grid gap-4 sm:grid-cols-3">
//                             <div className="space-y-2">
//                                 <Label htmlFor="wallet-name">Wallet Name</Label>
//                                 <Input
//                                     id="wallet-name"
//                                     value={formData.name}
//                                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                     placeholder="My Wallet"
//                                 />
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="wallet-address">Wallet Address</Label>
//                                 <Input
//                                     id="wallet-address"
//                                     value={formData.address}
//                                     onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                                     placeholder="0x..."
//                                 />
//                             </div>
//                         <div className="mt-4 flex items-center justify-end space-x-2 space-y/2">
//                             <Button variant="outline" size="sm" onClick={() => setShowAddWallet(false)}>
//                                 Cancel
//                             </Button>
//                             <Button size="sm" onClick={handleAddWallet}>
//                                 Add Wallet
//                             </Button>
//                         </div>
//                         </div>
//                     </div>
//                 )}

//                 {getActiveWallet() && (
//                     <div className="mt-4 flex items-center justify-between">
//                         <div>
//                             <span className="text-sm font-medium">Total Balance:</span>
//                             <span className="ml-2 text-lg font-bold">{getActiveWallet()?.balance}</span>
//                         </div>
//                         <Button variant="outline" size="sm">
//                             View Details
//                         </Button>
//                     </div>
//                 )}
//             </CardContent>
//         </Card>
//     )
// }

// "use client";

// import {  useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { CheckIcon, CopyIcon, PlusIcon, TrashIcon } from "lucide-react";
// import axios from "axios";
// import { Wallet } from "@/types/type";

// export default function MultiWalletClient({ initialWallets }: { initialWallets: Wallet[] }) {
//     const [wallets, setWallets] = useState(initialWallets);
//     const [activeWallet, setActiveWallet] = useState(initialWallets[0]?.id || "");
//     const [showAddWallet, setShowAddWallet] = useState(false);
//     const [copied, setCopied] = useState(false);

//     const [formData, setFormData] = useState({
//         name: "",
//         address: "",
//         network: "Solana",
//     });

//     const handleAddWallet = async () => {
//         const { name, address, network } = formData;
//         if (!address || !name) return;

//         try {
//             const response = await axios.post(`http://localhost:3000/api/wallets`, { name, address, balance: "$0.00", network });
//             if (response.data?.wallets) {
//                 setWallets(response.data.wallets);
//                 setActiveWallet(response.data.wallets[0]?.id || "");
//             }
//             setFormData({ name: "", address: "", network: "Solana" });
//             setShowAddWallet(false);
//         } catch (error) {
//             console.error("Error adding wallet:", error);
//         }
//     };

//     const handleDeleteWallet = async (id: string) => {
//         setWallets(prev => {
//             const updated = prev.filter(wallet => wallet.id !== id);
//             if (activeWallet === id && updated.length) {
//                 setActiveWallet(updated[0].id);
//             }
//             return updated;
//         });
//     };

//     const copyToClipboard = (text: string) => {
//         navigator.clipboard.writeText(text)
//         setCopied(true)
//         setTimeout(() => setCopied(false), 2000)
//     }

//     const getActiveWallet = () => wallets.find((wallet) => wallet.id === activeWallet)

//     return (
//         <Card>
//             <CardContent className="p-4">
//                 <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
//                     <div className="flex items-center space-x-4">
//                         {wallets.length != 0 ? (
//                         <Tabs value={activeWallet} onValueChange={setActiveWallet} className="w-full sm:w-auto">
//                             <TabsList className="grid w-full grid-cols-3 sm:w-auto">
//                                 {wallets.slice(0, 3).map((wallet) => (
//                                     <TabsTrigger key={wallet.id} value={wallet.id} className="text-xs sm:text-sm">
//                                         {wallet.name}
//                                     </TabsTrigger>
//                                 ))}
//                             </TabsList>

//                             {wallets.map((wallet) => (
//                                 <TabsContent key={wallet.id} value={wallet.id} className="mt-0">
//                                     <div className="flex items-center space-x-2 mt-4">
//                                         <Badge variant="outline">{wallet?.network}</Badge>
//                                         <div className="flex items-center space-x-2">
//                                             <span className="text-xs text-muted-foreground">
//                                                 {wallet.address.substring(0, 6)}...
//                                                 {wallet.address.substring(wallet.address.length - 4)}
//                                             </span>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 className="h-6 w-6"
//                                                 onClick={() => copyToClipboard(wallet.address)}
//                                             >
//                                                 {copied ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </TabsContent>
//                             ))}
//                         </Tabs>
//                         ) : (
//                                 <h2>No wallets added yet. Click 'Add Wallet' to get started.</h2>
//                         )}
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <Button variant="outline" size="sm" onClick={() => setShowAddWallet(!showAddWallet)} className="text-xs">
//                             <PlusIcon className="mr-1 h-3 w-3" />
//                             Add Wallet
//                         </Button>
//                         {wallets.length > 1 && (
//                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteWallet(activeWallet)}>
//                                 <TrashIcon className="h-4 w-4" />
//                             </Button>
//                         )}
//                     </div>
//                 </div>

//                 {showAddWallet && (
//                     <div className="mt-4 rounded-md border p-4">
//                         <div className="grid gap-4 sm:grid-cols-3">
//                             <div className="space-y-2">
//                                 <Label htmlFor="wallet-name">Wallet Name</Label>
//                                 <Input
//                                     id="wallet-name"
//                                     value={formData.name}
//                                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                     placeholder="My Wallet"
//                                 />
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="wallet-address">Wallet Address</Label>
//                                 <Input
//                                     id="wallet-address"
//                                     value={formData.address}
//                                     onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                                     placeholder="0x..."
//                                 />
//                             </div>
//                         <div className="mt-4 flex items-center justify-end space-x-2 space-y/2">
//                             <Button variant="outline" size="sm" onClick={() => setShowAddWallet(false)}>
//                                 Cancel
//                             </Button>
//                             <Button size="sm" onClick={handleAddWallet}>
//                                 Add Wallet
//                             </Button>
//                         </div>
//                         </div>
//                     </div>
//                 )}

//                 {getActiveWallet() && (
//                     <div className="mt-4 flex items-center justify-between">
//                         <div>
//                             <span className="text-sm font-medium">Total Balance:</span>
//                             <span className="ml-2 text-lg font-bold">{getActiveWallet()?.balance}</span>
//                         </div>
//                         <Button variant="outline" size="sm">
//                             View Details
//                         </Button>
//                     </div>
//                 )}
//             </CardContent>
//         </Card>
//     )
// }
