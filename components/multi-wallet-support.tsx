"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon, PlusIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data
const mockWallets = [
  {
    id: "1",
    name: "Main Wallet",
    address: "0x5d6e7f8910111213141516171819202122232425",
    balance: "$8,245.32",
    network: "Ethereum",
  },
  {
    id: "2",
    name: "Trading Wallet",
    address: "0x2a2b2c2d2e2f303132333435363738394041424344",
    balance: "$3,120.15",
    network: "Polygon",
  },
  {
    id: "3",
    name: "Savings",
    address: "0x9a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9b0b1b2b3b4",
    balance: "$980.20",
    network: "Ethereum",
  },
]

export function MultiWalletSupport() {
  const [wallets, setWallets] = useState(mockWallets)
  const [activeWallet, setActiveWallet] = useState(mockWallets[0].id)
  const [newWalletName, setNewWalletName] = useState("")
  const [newWalletAddress, setNewWalletAddress] = useState("")
  const [newWalletNetwork, setNewWalletNetwork] = useState("Ethereum")
  const [showAddWallet, setShowAddWallet] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAddWallet = () => {
    if (newWalletAddress && newWalletName) {
      const newWallet = {
        id: Date.now().toString(),
        name: newWalletName,
        address: newWalletAddress,
        balance: "$0.00",
        network: newWalletNetwork,
      }
      setWallets([...wallets, newWallet])
      setNewWalletName("")
      setNewWalletAddress("")
      setShowAddWallet(false)
    }
  }

  const handleDeleteWallet = (id: string) => {
    setWallets(wallets.filter((wallet) => wallet.id !== id))
    if (activeWallet === id && wallets.length > 1) {
      setActiveWallet(wallets[0].id === id ? wallets[1].id : wallets[0].id)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getActiveWallet = () => wallets.find((wallet) => wallet.id === activeWallet)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Tabs value={activeWallet} onValueChange={setActiveWallet} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                {wallets.slice(0, 3).map((wallet) => (
                  <TabsTrigger key={wallet.id} value={wallet.id} className="text-xs sm:text-sm">
                    {wallet.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {wallets.map((wallet) => (
                <TabsContent key={wallet.id} value={wallet.id} className="mt-0">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{wallet.network}</Badge>
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
                        {copied ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowAddWallet(!showAddWallet)} className="text-xs">
              <PlusIcon className="mr-1 h-3 w-3" />
              Add Wallet
            </Button>
            {wallets.length > 1 && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteWallet(activeWallet)}>
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
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  placeholder="My Wallet"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input
                  id="wallet-address"
                  value={newWalletAddress}
                  onChange={(e) => setNewWalletAddress(e.target.value)}
                  placeholder="0x..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-network">Network</Label>
                <select
                  id="wallet-network"
                  value={newWalletNetwork}
                  onChange={(e) => setNewWalletNetwork(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Ethereum">Ethereum</option>
                  <option value="Polygon">Polygon</option>
                  <option value="Arbitrum">Arbitrum</option>
                  <option value="Optimism">Optimism</option>
                  <option value="Base">Base</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddWallet(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddWallet}>
                Add Wallet
              </Button>
            </div>
          </div>
        )}

        {getActiveWallet() && (
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">Total Balance:</span>
              <span className="ml-2 text-lg font-bold">{getActiveWallet()?.balance}</span>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
