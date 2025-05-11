"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TokensTab from "@/components/profile/tabs/tokens-tab"
import NFTsTab from "@/components/profile/tabs/nfts-tab"
import TransactionsTab from "@/components/profile/tabs/transactions-tab"
import BadgesTab from "@/components/profile/tabs/badges-tab"
import StreamTab from "@/components/profile/tabs/stream-tab"
import useWalletStore from "@/stores";
import tokens from "@/app/_getAssetByOwner1.json";

interface ProfileTabsProps {
  address: string
}

// export default function ProfileTabs({ address }: ProfileTabsProps) {
export default function ProfileTabs() {
  const { activeWalletId:address,  isLoading, error } = useWalletStore();
  const [activeTab, setActiveTab] = useState("tokens")

  return (
    <Tabs defaultValue="tokens" className="w-full" onValueChange={setActiveTab}>
      <div className="border-b">
        <TabsList className="h-auto p-0 bg-transparent">
          <TabsTrigger
            value="tokens"
            className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "tokens" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="nfts"
            className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "nfts" ? "text-foreground" : "text-muted-foreground"}`}
          >
            NFTs
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "transactions" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="badges"
            className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "badges" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Badges
          </TabsTrigger>
          <TabsTrigger
            value="stream"
            className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "stream" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Stream
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="mt-6">
        <TabsContent value="tokens" className="m-0">
          <TokensTab />
        </TabsContent>
        <TabsContent value="nfts" className="m-0">
          <NFTsTab address={address} />
        </TabsContent>
        <TabsContent value="transactions" className="m-0">
          <TransactionsTab address={address} />
        </TabsContent>
        <TabsContent value="badges" className="m-0">
          <BadgesTab address={address} />
        </TabsContent>
        <TabsContent value="stream" className="m-0">
          <StreamTab address={address} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
