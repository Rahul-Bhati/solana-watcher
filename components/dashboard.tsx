  import { DashboardClient } from "@/components/dashboard-client";
  import { Toaster } from "sonner";
  import WalletManager from "./WalletManager";
  import { prisma } from "@/prisma/prisma";
  import { auth } from "@/auth";
  import { Wallet } from "@/types/type";
  import TokenOverviewTable from "./TokenOverviewTable";
  import TokensTab from "./profile/tabs/tokens-tab";
  import tokens from "@/app/_getAssetByOwner.json";
  import ProfileTabs from "./profile/profile-tabs";
  import axios from "axios";

  let x = 0;
  export default async function Dashboard() {
    console.log("Dashboard", x++);
    const session = await auth();

    if (!session?.user?.email) return null; // or show a message like "Please login"

    const wallets: Wallet[] = await prisma.wallet.findMany({
      where: { email: session.user.email },
    });

    
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            <h1 className="text-lg font-bold md:text-xl">Solana Watcher</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-6">
            <WalletManager initialWallets={wallets} />
          </div>
          <ProfileTabs />
            {/* <TokensTab tokens={tokens?.result?.items} /> */}
          {/* <DashboardClient /> */}
          {/* <TokenOverviewTable /> */}
        </main>
        <footer className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Solana Watcher. All rights reserved.
          </div>
        </footer>

        <Toaster />
      </div>
    );
  }

// "use client"

// import { useState } from "react"
// import { MoonIcon, SunIcon } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { WalletTracker } from "@/components/wallet-tracker"
// import { AirdropTracker } from "@/components/airdrop-tracker"
// import { TaxDashboard } from "@/components/tax-dashboard"
// import { PortfolioVisualization } from "@/components/portfolio-visualization"
// import { AlertsSettings } from "@/components/alerts-settings"
// import { MultiWalletSupport } from "@/components/multi-wallet-support"

// export default function Dashboard() {
//   const { theme, setTheme } = useTheme()
//   const [activeTab, setActiveTab] = useState("overview")

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="sticky top-0 z-10 border-b bg-background">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//           <div className="flex items-center gap-2">
//             <h1 className="text-xl font-bold">ChainCheckr</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
//               {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </div>
//         </div>
//       </header>
//       <main className="container px-4 py-6 md:px-6 md:py-8">
//         <div className="mb-6">
//           <MultiWalletSupport />
//         </div>
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//           <TabsList className="grid w-full grid-cols-5">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="wallets">Wallets</TabsTrigger>
//             <TabsTrigger value="airdrops">Airdrops</TabsTrigger>
//             <TabsTrigger value="taxes">Taxes</TabsTrigger>
//             <TabsTrigger value="alerts">Alerts</TabsTrigger>
//           </TabsList>
//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               <PortfolioVisualization />
//               <WalletTracker />
//             </div>
//             <div className="grid gap-6 md:grid-cols-2">
//               <AirdropTracker />
//               <TaxDashboard />
//             </div>
//           </TabsContent>
//           <TabsContent value="wallets" className="space-y-6">
//             <WalletTracker fullView />
//           </TabsContent>
//           <TabsContent value="airdrops" className="space-y-6">
//             <AirdropTracker fullView />
//           </TabsContent>
//           <TabsContent value="taxes" className="space-y-6">
//             <TaxDashboard fullView />
//           </TabsContent>
//           <TabsContent value="alerts" className="space-y-6">
//             <AlertsSettings />
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   )
// }
