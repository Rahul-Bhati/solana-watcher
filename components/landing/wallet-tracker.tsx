import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"

export default function WalletTracker() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Wallets</CardTitle>
          <Tabs defaultValue="whales">
            <TabsList>
              <TabsTrigger value="whales">Whales</TabsTrigger>
              <TabsTrigger value="active">Most Active</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="size-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <div className="size-10 rounded-full bg-orange-500/40 flex items-center justify-center">
                      <div className="size-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                        DW
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">DefiWhale</h3>
                      <Badge variant="outline" className="text-xs">
                        VIP
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="font-mono">0x7fb1...e2d6</span>
                      <button className="ml-1 text-muted-foreground hover:text-foreground">
                        <Copy className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$77,652,075</div>
                  <div className="text-sm text-muted-foreground">TVF $1.5B</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22V2M2 12h20" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">SOL</div>
                  <div className="text-sm text-muted-foreground ml-auto">$24.5M</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">USDC</div>
                  <div className="text-sm text-muted-foreground ml-auto">$18.2M</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">RAY</div>
                  <div className="text-sm text-muted-foreground ml-auto">$12.8M</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22V2M2 12h20" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">mSOL</div>
                  <div className="text-sm text-muted-foreground ml-auto">$9.7M</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="size-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="size-10 rounded-full bg-blue-500/40 flex items-center justify-center">
                      <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        AN
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">an0n</h3>
                      <Badge variant="outline" className="text-xs">
                        VIP
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="font-mono">0x7bfe...c060</span>
                      <button className="ml-1 text-muted-foreground hover:text-foreground">
                        <Copy className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$33,389,759</div>
                  <div className="text-sm text-muted-foreground">TVF $2.2B</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22V2M2 12h20" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">SOL</div>
                  <div className="text-sm text-muted-foreground ml-auto">$15.3M</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">USDC</div>
                  <div className="text-sm text-muted-foreground ml-auto">$8.7M</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">JUP</div>
                  <div className="text-sm text-muted-foreground ml-auto">$5.2M</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22V2M2 12h20" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">BONK</div>
                  <div className="text-sm text-muted-foreground ml-auto">$2.1M</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="size-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="size-10 rounded-full bg-purple-500/40 flex items-center justify-center">
                      <div className="size-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                        NS
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">nmstarchild</h3>
                      <Badge variant="outline" className="text-xs">
                        VIP
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="font-mono">0xf7b1...e2d6</span>
                      <button className="ml-1 text-muted-foreground hover:text-foreground">
                        <Copy className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$210,873</div>
                  <div className="text-sm text-muted-foreground">TVF $936.1M</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22V2M2 12h20" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">SOL</div>
                  <div className="text-sm text-muted-foreground ml-auto">$74.3K</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">USDC</div>
                  <div className="text-sm text-muted-foreground ml-auto">$56.9K</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">zkSync</div>
                  <div className="text-sm text-muted-foreground ml-auto">$5.0K</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22V2M2 12h20" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">OP</div>
                  <div className="text-sm text-muted-foreground ml-auto">$4.8K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
