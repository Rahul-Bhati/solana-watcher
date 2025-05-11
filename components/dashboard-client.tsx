"use client";

import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletTracker } from "@/components/wallet-tracker";
import { AirdropTracker } from "@/components/airdrop-tracker";
import { TaxDashboard } from "@/components/tax-dashboard";
import { PortfolioVisualization } from "@/components/portfolio-visualization";
import { AlertsSettings } from "@/components/alerts-settings";
import TokensTab from "./profile/tabs/tokens-tab";

export function DashboardClient() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");

  

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 hover:bg-muted transition"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 sm:grid-cols-3 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
          <TabsTrigger value="airdrops">Airdrops</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PortfolioVisualization />
            <WalletTracker />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <AirdropTracker />
            <TaxDashboard />
          </div>
        </TabsContent>

        <TabsContent value="tokens">
          <TokensTab address={"423223"}/>
        </TabsContent>

        <TabsContent value="wallets">
          <WalletTracker fullView />
        </TabsContent>
        <TabsContent value="airdrops">
          <AirdropTracker fullView />
        </TabsContent>
        <TabsContent value="taxes">
          <TaxDashboard fullView />
        </TabsContent>
        <TabsContent value="alerts">
          <AlertsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
