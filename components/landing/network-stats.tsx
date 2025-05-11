import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, ArrowDown, Activity, Server, Database } from "lucide-react"

export default function NetworkStats() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="validators">Validators</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Price</CardTitle>
              <Activity className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$172.84</div>
              <div className="flex items-center text-sm text-red-500">
                <ArrowDown className="mr-1 size-3" />
                0.27% (24h)
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Transactions Per Second</CardTitle>
              <Activity className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,421</div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 size-3" />
                12.4% (24h)
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Validators</CardTitle>
              <Server className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,876</div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 size-3" />
                3.2% (24h)
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <Database className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">214.5M</div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 size-3" />
                5.7% (24h)
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Performance</CardTitle>
              <CardDescription>Real-time metrics for the Solana blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md bg-muted/50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-md px-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Slot Height</span>
                          <span className="font-medium">238,471,922</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[85%] rounded-full bg-orange-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Block Time</span>
                          <span className="font-medium">400ms</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[92%] rounded-full bg-orange-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Network Stake</span>
                          <span className="font-medium">372.8M SOL</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[78%] rounded-full bg-orange-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="validators">
        <Card>
          <CardHeader>
            <CardTitle>Validator Statistics</CardTitle>
            <CardDescription>Active validators and stake distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-muted-foreground">Validator data visualization would appear here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="transactions">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Activity</CardTitle>
            <CardDescription>Recent transactions and volume metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-muted-foreground">Transaction data visualization would appear here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
