import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Search, BarChart3, Wallet, Users, Shield, Zap, ExternalLink, RefreshCw } from "lucide-react"
import Link from "next/link"
import NetworkStats from "@/components/landing/network-stats"
import FeatureCard from "@/components/landing/feature-card"
import WalletTracker from "@/components/landing/wallet-tracker"
import { auth, signIn, signOut } from "@/auth"

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center">
                <Zap className="size-4 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold">SolanaWatch</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#stats" className="text-sm font-medium hover:text-primary">
              Network Stats
            </Link>
            <Link href="#explore" className="text-sm font-medium hover:text-primary">
              Explore
            </Link>
            <Link href="#community" className="text-sm font-medium hover:text-primary">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-4 pr-4">
            {session ? (
              <div className="text-sm flex flex-row gap-2 justify-center items-center">
                <Link href="/home" className="flex flex-row items-center bg-black text-white p-3 rounded-lg">
                  Launch App
                  <ArrowUpRight className="ml-2 size-4" />
                </Link>
                <form action={async () => {
                  "use server";
                  await signOut();
                }}>
                  <button type="submit">Signout</button>
                </form>
              </div>
            ) : (
              <form
                action={async () => {
                  "use server"
                  await signIn("google")
                }}
              >
                <button type="submit">Signin </button>
              </form>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-orange-500 text-white hover:bg-orange-600">New Version</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track Solana Blockchain Activity in Real-Time
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Monitor transactions, wallets, and network statistics on the Solana blockchain with our powerful and
                    intuitive watcher application.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
                    <Link href="/profile/0x7fb1e2d6">
                      View Profile Example
                      <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    View Documentation
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-xl border bg-background p-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-lg" />
                  <div className="relative z-10 h-full rounded-lg bg-background/80 backdrop-blur p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center">
                          <Zap className="size-3 text-white" />
                        </div>
                        <span className="font-semibold">Solana Network Overview</span>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-green-500"></span>
                        Live
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Card>
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">TPS</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">3,421</div>
                          <p className="text-xs text-green-500">+12.4%</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Price</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">$172.84</div>
                          <p className="text-xs text-red-500">-0.27%</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex-1 rounded-lg bg-muted/50 p-3">
                      <div className="h-full flex items-center justify-center">
                        <div className="w-full h-[120px] bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-orange-500/20 rounded-md relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-[2px] bg-muted-foreground/20"></div>
                          </div>
                          <div className="absolute inset-0">
                            <svg viewBox="0 0 100 20" className="w-full h-full">
                              <path
                                d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="0.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="w-full py-12 md:py-16 bg-background border-y">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px]">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Track Any Solana Wallet or Transaction
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                  Enter a wallet address, transaction hash, or token to get detailed insights and analytics.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search address, transaction, or token..."
                    className="flex-1 h-12 px-4 rounded-l-md rounded-r-none border-r-0"
                  />
                  <Button type="submit" className="h-12 px-6 rounded-l-none bg-orange-500 hover:bg-orange-600">
                    <Search className="mr-2 size-4" />
                    Search
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span>Popular:</span>
                  <Link href="#" className="hover:text-primary hover:underline">
                    Solana
                  </Link>
                  <Link href="#" className="hover:text-primary hover:underline">
                    Raydium
                  </Link>
                  <Link href="#" className="hover:text-primary hover:underline">
                    Marinade
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-orange-500 text-white hover:bg-orange-600">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to track Solana
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools to monitor and analyze Solana blockchain activity in
                  real-time.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <FeatureCard
                icon={<BarChart3 className="size-10 text-orange-500" />}
                title="Real-time Analytics"
                description="Monitor transactions, token transfers, and network activity as they happen on the Solana blockchain."
              />
              <FeatureCard
                icon={<Wallet className="size-10 text-orange-500" />}
                title="Wallet Tracking"
                description="Track any wallet's holdings, transaction history, and portfolio performance over time."
              />
              <FeatureCard
                icon={<Shield className="size-10 text-orange-500" />}
                title="Security Alerts"
                description="Receive notifications about suspicious activities or large movements related to your watched addresses."
              />
              <FeatureCard
                icon={<Users className="size-10 text-orange-500" />}
                title="Whale Watching"
                description="Monitor large holders and their activities to understand market movements and trends."
              />
              <FeatureCard
                icon={<Zap className="size-10 text-orange-500" />}
                title="Performance Metrics"
                description="Analyze network performance, including TPS, validator status, and overall health."
              />
              <FeatureCard
                icon={<ExternalLink className="size-10 text-orange-500" />}
                title="API Access"
                description="Integrate our data into your applications with our comprehensive API endpoints."
              />
            </div>
          </div>
        </section>

        {/* Network Stats Section */}
        <section id="stats" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Solana Network Statistics</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real-time metrics and performance indicators for the Solana blockchain.
                </p>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Network Overview</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="size-4" />
                <span>Updated 2 minutes ago</span>
              </div>
            </div>
            <div className="mt-6">
              <NetworkStats />
            </div>
          </div>
        </section>

        {/* Wallet Tracker Preview */}
        <section id="explore" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Track Top Solana Wallets</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Monitor the activity of whales and influential wallets on the Solana blockchain.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <WalletTracker />
            </div>
            <div className="mt-8 flex justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                View All Wallets
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to explore Solana?
                  </h2>
                  <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed opacity-90">
                    Join thousands of users tracking transactions, monitoring wallets, and analyzing the Solana
                    blockchain in real-time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-white text-orange-500 hover:bg-white/90">
                    Launch App
                    <ArrowUpRight className="ml-2 size-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border border-white/20 bg-white/10 p-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-lg" />
                  <div className="relative z-10 h-full rounded-lg bg-white/10 backdrop-blur p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-white flex items-center justify-center">
                          <Zap className="size-3 text-orange-500" />
                        </div>
                        <span className="font-semibold text-white">Dashboard Preview</span>
                      </div>
                    </div>
                    <div className="flex-1 rounded-lg bg-white/5 p-3">
                      <div className="h-full flex items-center justify-center">
                        <div className="w-full h-[120px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-md relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-[2px] bg-white/20"></div>
                          </div>
                          <div className="absolute inset-0">
                            <svg viewBox="0 0 100 20" className="w-full h-full">
                              <path
                                d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 md:py-12 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <Zap className="size-4 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold">SolanaWatch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The most comprehensive Solana blockchain explorer and analytics platform.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SolanaWatch. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
