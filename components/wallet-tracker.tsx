"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, ExternalLinkIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data
const mockTransactions = [
  {
    id: "1",
    type: "receive",
    amount: "0.25 ETH",
    value: "$450.75",
    from: "0x1a2...3b4c",
    to: "0x5d6...7e8f",
    date: "2023-04-12T10:30:00Z",
    status: "completed",
  },
  {
    id: "2",
    type: "send",
    amount: "10.5 USDC",
    value: "$10.50",
    from: "0x5d6...7e8f",
    to: "0x9g0...1h2i",
    date: "2023-04-11T14:20:00Z",
    status: "completed",
  },
  {
    id: "3",
    type: "receive",
    amount: "150 MATIC",
    value: "$120.30",
    from: "0x3j4...5k6l",
    to: "0x5d6...7e8f",
    date: "2023-04-10T09:15:00Z",
    status: "completed",
  },
]

export function WalletTracker({ fullView = false }: { fullView?: boolean }) {
  const [walletAddress, setWalletAddress] = useState("")
  const [isValidAddress, setIsValidAddress] = useState(true)

  const validateWalletAddress = (address: string) => {
    // Simple validation for Ethereum-like addresses
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(address)
    setIsValidAddress(isValid)
    return isValid
  }

  const handleAddWallet = () => {
    if (validateWalletAddress(walletAddress)) {
      // Add wallet logic would go here
      setWalletAddress("")
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Wallet Tracker</CardTitle>
        <CardDescription>Monitor your wallet balances and transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter wallet address (0x...)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={!isValidAddress ? "border-red-500" : ""}
            />
            <Button onClick={handleAddWallet} size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          {!isValidAddress && <p className="text-red-500 text-xs">Please enter a valid wallet address</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">$12,345.67</div>
              <p className="text-xs text-muted-foreground">+5.23% (24h)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Active Wallet</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center space-x-2">
                <div className="truncate text-xs">0x5d6...7e8f</div>
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <CopyIcon className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">3 wallets connected</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Recent Transactions</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  {fullView && <TableHead>Value</TableHead>}
                  {fullView && <TableHead>From/To</TableHead>}
                  <TableHead>Date</TableHead>
                  {fullView && <TableHead>Status</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {tx.type === "receive" ? (
                          <ArrowDownIcon className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUpIcon className="mr-2 h-4 w-4 text-red-500" />
                        )}
                        {tx.type}
                      </div>
                    </TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    {fullView && <TableCell>{tx.value}</TableCell>}
                    {fullView && (
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs">{tx.type === "receive" ? tx.from : tx.to}</span>
                          <Button variant="ghost" size="icon" className="h-4 w-4">
                            <ExternalLinkIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    {fullView && (
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {tx.status}
                        </Badge>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      {fullView && (
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Transactions
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
