"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { formatNumber } from "@/lib/utils"
import { Calendar, Download, ExternalLink, Filter } from "lucide-react"
import Image from "next/image"

interface TransactionsTabProps {
  address: string
}

export default function TransactionsTab({ address }: TransactionsTabProps) {
  const [dateRange, setDateRange] = useState("all-time")
  const [hideScam, setHideScam] = useState(true)

  // Mock data - in a real app, this would be fetched from an API
  const topProtocols = [
    { name: "Aave V3", value: "$33M", icon: "/placeholder.svg?height=24&width=24" },
    { name: "Fluid", value: "$27M", icon: "/placeholder.svg?height=24&width=24" },
    { name: "Morpho", value: "$27M", icon: "/placeholder.svg?height=24&width=24" },
    { name: "Binance", value: "$20M", icon: "/placeholder.svg?height=24&width=24" },
    { name: "Pendle V2", value: "$14M", icon: "/placeholder.svg?height=24&width=24" },
    { name: "ODOS", value: "$12M", icon: "/placeholder.svg?height=24&width=24" },
    { name: "Solv", value: "$12M", icon: "/placeholder.svg?height=24&width=24" },
    { name: "Liquity V2", value: "$11M", icon: "/placeholder.svg?height=24&width=24" },
  ]

  const topTokens = [
    { symbol: "USDC", value: "$66M", icon: "/placeholder.svg?height=24&width=24" },
    { symbol: "WBTC", value: "$53M", icon: "/placeholder.svg?height=24&width=24" },
    { symbol: "ETH", value: "$42M", icon: "/placeholder.svg?height=24&width=24" },
    { symbol: "USDT", value: "$24M", icon: "/placeholder.svg?height=24&width=24" },
    { symbol: "LBTC", value: "$18M", icon: "/placeholder.svg?height=24&width=24" },
    { symbol: "SolvBTC", value: "$14M", icon: "/placeholder.svg?height=24&width=24" },
    { symbol: "WETH", value: "$10M", icon: "/placeholder.svg?height=24&width=24" },
    { symbol: "USDC", value: "$10M", icon: "/placeholder.svg?height=24&width=24" },
  ]

  const transactions = [
    {
      id: "tx1",
      type: "deposit",
      protocol: "Turtle Club",
      time: "14hrs 5mins ago",
      tokens: [{ symbol: "ETH", amount: -100, value: -157913.0 }],
      fee: "0.0001 ETH ($0.18)",
    },
    {
      id: "tx2",
      type: "swap",
      protocol: "Jupiter",
      time: "1d 2hrs ago",
      tokens: [
        { symbol: "SOL", amount: -10, value: -1728.4 },
        { symbol: "USDC", amount: 1725, value: 1725.0 },
      ],
      fee: "0.00005 SOL ($0.009)",
    },
    {
      id: "tx3",
      type: "withdraw",
      protocol: "Marinade",
      time: "2d 8hrs ago",
      tokens: [
        { symbol: "mSOL", amount: -5, value: -960.55 },
        { symbol: "SOL", amount: 5.1, value: 881.48 },
      ],
      fee: "0.0001 SOL ($0.02)",
    },
    {
      id: "tx4",
      type: "mint",
      protocol: "Tensor",
      time: "3d 12hrs ago",
      tokens: [
        { symbol: "SOL", amount: -2.5, value: -432.1 },
        { symbol: "NFT", name: "Solana Monkey #1234", value: null },
      ],
      fee: "0.0001 SOL ($0.02)",
    },
    {
      id: "tx5",
      type: "transfer",
      protocol: "Wallet",
      time: "5d 3hrs ago",
      tokens: [{ symbol: "USDC", amount: -1000, value: -1000.0 }],
      fee: "0.00001 SOL ($0.002)",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Analysis Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Calendar className="size-4 text-muted-foreground" />
              <Select defaultValue={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 border rounded-md p-2">
              <Select defaultValue="all">
                <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 w-[150px]">
                  <SelectValue placeholder="All Chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chain</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 border rounded-md p-2">
              <Select defaultValue="all">
                <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 w-[180px]">
                  <SelectValue placeholder="Token & NFT txs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Token & NFT txs</SelectItem>
                  <SelectItem value="token">Token txs only</SelectItem>
                  <SelectItem value="nft">NFT txs only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 border rounded-md p-2">
              <Select defaultValue="all">
                <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 w-[180px]">
                  <SelectValue placeholder="Transaction amount: all" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Transaction amount: all</SelectItem>
                  <SelectItem value="above-100">Above $100</SelectItem>
                  <SelectItem value="above-1000">Above $1,000</SelectItem>
                  <SelectItem value="above-10000">Above $10,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hide-scam"
                  checked={hideScam}
                  onCheckedChange={(checked) => setHideScam(checked as boolean)}
                />
                <label
                  htmlFor="hide-scam"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hide scam
                </label>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Top protocol/addresses interact with</h3>
              <div className="grid grid-cols-2 gap-2">
                {topProtocols.map((protocol, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-md border">
                    <div className="size-6 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      <Image
                        src={protocol.icon || "/placeholder.svg"}
                        alt={protocol.name}
                        width={24}
                        height={24}
                        className="size-6"
                      />
                    </div>
                    <span className="font-medium">{protocol.name}</span>
                    <span className="ml-auto text-sm text-muted-foreground">{protocol.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Top tokens in transactions</h3>
              <div className="grid grid-cols-2 gap-2">
                {topTokens.map((token, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-md border">
                    <div className="size-6 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      <Image
                        src={token.icon || "/placeholder.svg"}
                        alt={token.symbol}
                        width={24}
                        height={24}
                        className="size-6"
                      />
                    </div>
                    <span className="font-medium">{token.symbol}</span>
                    <span className="ml-auto text-sm text-muted-foreground">{token.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`
                          ${tx.type === "deposit" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                          ${tx.type === "withdraw" ? "bg-red-500/10 text-red-500 border-red-500/20" : ""}
                          ${tx.type === "swap" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : ""}
                          ${tx.type === "mint" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" : ""}
                          ${tx.type === "transfer" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : ""}
                        `}
                      >
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                      <span className="font-medium">{tx.protocol}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{tx.time}</span>
                      <Button variant="ghost" size="icon" className="size-6">
                        <ExternalLink className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {tx.tokens.map((token, index) => (
                      <div key={index} className="flex items-center">
                        {token.amount ? (
                          <span className={`font-mono ${token.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                            {token.amount > 0 ? "+" : ""}
                            {token.amount} {token.symbol}
                          </span>
                        ) : (
                          <span className="font-mono">{token.name}</span>
                        )}
                        {token.value && (
                          <span className="ml-2 text-sm text-muted-foreground">
                            (${formatNumber(Math.abs(token.value))})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Gas Fee: {tx.fee}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 4,738 transactions</div>
              <Button variant="outline" size="sm">
                Load More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
