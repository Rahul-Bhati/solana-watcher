"use client"

import { useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletTracker } from "@/components/wallet-tracker"
import { AirdropTracker } from "@/components/airdrop-tracker"
import { TaxDashboard } from "@/components/tax-dashboard"
import { PortfolioVisualization } from "@/components/portfolio-visualization"
import { AlertsSettings } from "@/components/alerts-settings"
import { MultiWalletSupport } from "@/components/multi-wallet-support"

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">ChainCheckr</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6">
          <MultiWalletSupport />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
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
          <TabsContent value="wallets" className="space-y-6">
            <WalletTracker fullView />
          </TabsContent>
          <TabsContent value="airdrops" className="space-y-6">
            <AirdropTracker fullView />
          </TabsContent>
          <TabsContent value="taxes" className="space-y-6">
            <TaxDashboard fullView />
          </TabsContent>
          <TabsContent value="alerts" className="space-y-6">
            <AlertsSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
